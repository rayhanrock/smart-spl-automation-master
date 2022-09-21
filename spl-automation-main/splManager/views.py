from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework.response import Response
from . import utils
import users.serializers
from . import models
from . import serializers
from rest_framework import viewsets, filters, generics, mixins, status, views
import random


# Create your views here.

class SplViewSet(viewsets.ModelViewSet):
    lookup_field = 'join_code'
    queryset = models.Spl.objects.all()
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,)
    serializer_class = serializers.SplSerializer


class TeamViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Team.objects.all()
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,)
    serializer_class = serializers.TeamSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = models.Project.objects.all()
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,)
    serializer_class = serializers.ProjectSerializer


class ProjectListViewBySPL(views.APIView):
    serializer_class = serializers.ProjectSerializer

    def get(self, request, spl_code, format=None):
        spl_code = spl_code.upper()
        queryset = models.Project.objects.filter(spl_code__iexact=spl_code)
        # if queryset.count() == 0:
        #     raise Http404

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class JoinSpl(views.APIView):
    def post(self, request, format=None):
        username = request.data['username']
        join_code = request.data['join_code']
        spl = models.Spl.objects.filter(join_code__iexact=join_code)
        if spl.count() == 0:
            return Response({'message': "Spl not found"}, status=status.HTTP_400_BAD_REQUEST)
        spl = models.Spl.objects.get(join_code__iexact=join_code)
        user = models.Student.objects.filter(user_profile__username=username)
        if user.count() == 0:
            user = models.Teacher.objects.filter(user_profile__username=username)
            if user.count() == 0:
                return Response({'message': "username is not valid"}, status=status.HTTP_400_BAD_REQUEST)
            user = models.Teacher.objects.get(user_profile__username=username)
            spl.mentors.add(user)
            return Response({'message': "Join successful m"}, status=status.HTTP_200_OK)
        user = models.Student.objects.get(user_profile__username=username)
        spl.students.add(user)
        return Response({'message': "Join successful s"}, status=status.HTTP_200_OK)


class FormTeam(views.APIView):

    def get(self, request, spl_code, format=None):
        global team
        spl = models.Spl.objects.filter(join_code__iexact=spl_code)
        if spl.count() == 0:
            return Response({'message': "Spl not found"}, status=status.HTTP_400_BAD_REQUEST)
        spl = models.Spl.objects.get(join_code__iexact=spl_code)
        sorted_list = sorted(spl.students.all(), key=lambda student: student.cgpa, reverse=True)
        student_list = []
        teacher_list = []
        for i in sorted_list:
            student_list.append(users.serializers.StudentSerializers(i).data)
        for i in spl.mentors.all():
            teacher_list.append(users.serializers.TeacherSerializers(i).data)

        print(len(student_list))
        print(len(teacher_list))

        category_array = []

        divide_by = len(student_list) / len(teacher_list)

        split_number = divide_by - int(divide_by)
        digitAfterPoint = int(split_number * 10)
        if digitAfterPoint > 8:
            split_number = int(divide_by) + 1
        else:
            split_number = int(divide_by)
        print(split_number)
        if split_number == 1:
            split_number = split_number + 1

        categorized_student = utils.split(student_list, split_number)

        for category in categorized_student:
            category_array.append(category)

        teams = []
        for teacher in teacher_list:
            team = {}
            team.update({'mentor': teacher})
            students = []
            for student_category in category_array:
                if len(student_category) == 0:
                    continue

                student = student_category.pop(random.randint(0, len(student_category) - 1))
                students.append(student)
            team.update({'students': students})
            teams.append(team)

        count = 0
        for student_category in category_array:
            if len(student_category) > 0:
                student = student_category.pop(random.randint(0, len(student_category) - 1))
                teams[count].get('students').append(student)
                count = count + 1

        template = get_template('create-team.html')
        return HttpResponse(template.render(context={"teams": teams}))


class StudentMentorListCreateTeam(views.APIView):

    def get(self, request, spl_code, format=None):
        spl = models.Spl.objects.filter(join_code__iexact=spl_code)
        if spl.count() == 0:
            return Response({'message': "Spl not found"}, status=status.HTTP_400_BAD_REQUEST)
        spl = models.Spl.objects.get(join_code__iexact=spl_code)
        student_list = []
        teacher_list = []
        for i in spl.students.all():
            student_list.append(users.serializers.StudentSerializers(i).data)
        for i in spl.mentors.all():
            teacher_list.append(users.serializers.TeacherSerializers(i).data)
        print(teacher_list)
        teachers = {}

        return Response({'mentors': teacher_list, 'students': student_list}, status=status.HTTP_200_OK)


class StudentMentorList(views.APIView):

    def get(self, request, spl_code, format=None):
        spl = models.Spl.objects.filter(join_code__iexact=spl_code)
        if spl.count() == 0:
            return Response({'message': "Spl not found"}, status=status.HTTP_400_BAD_REQUEST)
        spl = models.Spl.objects.get(join_code__iexact=spl_code)
        student_list = []
        teacher_list = []
        for i in spl.students.all():
            student_list.append(
                {'value': i.user_profile.username, 'label': i.user_profile.first_name + " " + i.user_profile.last_name})
        for i in spl.mentors.all():
            teacher_list.append(
                {'value': i.user_profile.username, 'label': i.user_profile.first_name + " " + i.user_profile.last_name})

        return Response({'mentors': teacher_list, 'students': student_list}, status=status.HTTP_200_OK)


class CreateProject(views.APIView):
    def post(self, request, spl_code, format=None):

        name = request.data['name']
        description = request.data['description']
        mentor = request.data['mentor']
        students = request.data['students']
        team_name = request.data['team_name']

        spl = models.Spl.objects.filter(join_code__iexact=spl_code)
        if spl.count() == 0:
            return Response({'message': "Spl not found"}, status=status.HTTP_400_BAD_REQUEST)

        mentor = models.Teacher.objects.get(user_profile__username=mentor)

        team = models.Team.objects.create(name=team_name, spl_code=spl_code, mentor=mentor)
        team.save()

        for student_username in students:
            student = models.Student.objects.get(user_profile__username=student_username)
            team.students.add(student)

        project = models.Project.objects.create(spl_code=spl_code, title=name, description=description, team=team)
        project.save()

        return Response({'message': 'Project Create successful'}, status=status.HTTP_200_OK)
