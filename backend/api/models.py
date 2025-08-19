from django.db import models

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    title = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    category = models.CharField(max_length=50)
    date = models.DateField()
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)

    def __str__(self):
        return f"{self.title} ({self.type}) - {self.amount}"
