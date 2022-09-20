from rest_framework.response import Response

from . import models
from . import serializers
from rest_framework import viewsets, filters, generics, mixins, status, views


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
