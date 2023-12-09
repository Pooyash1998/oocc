# oocc/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import EventLogViewSet

router = routers.DefaultRouter()
router.register(r'eventlogs', EventLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('eventlogs/<int:pk>/process_file/', EventLogViewSet.as_view({'post': 'process_file'}), name='eventlog-process-file'),
]
