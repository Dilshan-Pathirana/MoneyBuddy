from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, budget_ai

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ai/suggest/', budget_ai),
]
