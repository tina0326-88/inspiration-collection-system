from rest_framework import serializers
from categories.serializers import CategorySerializer
from .models import Inspiration


class InspirationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.UUIDField(source='user.id', read_only=True)
    category_detail = CategorySerializer(source='category', read_only=True)

    class Meta:
        model = Inspiration
        fields = (
            'id', 'title', 'description', 'image_url', 'source_url',
            'category', 'category_detail',
            'user', 'user_id',
            'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'user', 'user_id', 'created_at', 'updated_at')
