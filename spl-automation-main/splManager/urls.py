from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('spl', views.SplViewSet)
router.register('projects', views.ProjectViewSet)
router.register('teams', views.TeamViewSet)
app_name = 'splManager'

urlpatterns = [
    path('', include(router.urls)),
    path('project/<slug:spl_code>',views.ProjectListViewBySPL.as_view(), name='spl-projects'),
    path('create-project/<slug:spl_code>',views.CreateProject.as_view(), name='create-projects'),


    path('spl/join',views.JoinSpl.as_view(), name='spl-join'),
    path('form-team/<slug:spl_code>',views.FormTeam.as_view(), name='form-team'),
    path('student-mentor-list/<slug:spl_code>',views.StudentMentorList.as_view(), name='student-mentor-list'),
    path('student-mentor-list-create-team/<slug:spl_code>',views.StudentMentorListCreateTeam.as_view(), name='student-mentor-list'),


]
