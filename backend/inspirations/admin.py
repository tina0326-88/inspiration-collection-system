from django.contrib import admin
from .models import Inspiration


@admin.register(Inspiration)
class InspirationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')
