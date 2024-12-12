from django.db import models

class Bracket(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(max_length=255)
    description = models.TextField()
    num_items = models.IntegerField()
    items = models.JSONField(blank=True, default=list)
    creator = models.TextField(null=True, blank=True)
    first_name = models.TextField(null=True, blank=True)
    winner = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
    
    def add_item(self, item_name):
        if not isinstance(self.items, dict):
            self.items = {}
        self.items[item_name] = 0
        self.save()



