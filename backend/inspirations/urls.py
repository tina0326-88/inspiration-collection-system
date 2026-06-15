from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InspirationViewSet

router = DefaultRouter()
router.register(r'', InspirationViewSet, basename='inspiration')

urlpatterns = [
    path('', include(router.urls)),
]
