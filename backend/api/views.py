from rest_framework import viewsets
from .models import Transaction
from .serializers import TransactionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .ai import get_budget_suggestion


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer


@api_view(["POST"])
def budget_ai(request):
    """
    Takes a summary payload {summary: "..."} and returns Groq suggestion.
    """
    summary = request.data.get("summary", "")
    if not summary:
        return Response({"error": "summary is required"}, status=400)
    suggestion = get_budget_suggestion(summary)
    return Response({"suggestion": suggestion})
