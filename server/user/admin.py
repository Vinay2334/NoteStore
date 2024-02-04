from django.contrib import admin
from user import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    """Define custom admin panel for users"""
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active', 
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important Info'), {'fields': ('last_login', 'profile_pic',)}),
    )
    readonly_fields = ['last_login', 'profile_pic']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'name',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )

admin.site.register(models.UserProfile, UserAdmin)
admin.site.register(models.Note)
admin.site.register(models.OTP)
admin.site.register(models.Bookmark)
admin.site.register(models.Comment)