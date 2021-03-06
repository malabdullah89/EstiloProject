# Generated by Django 2.2.8 on 2020-06-22 12:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(blank=True, max_length=30)),
                ('status', models.CharField(choices=[('pending_approval', 'Pending Approval'), ('active', 'Active'), ('unactive', 'Unactive')], default='pending_approval', max_length=16)),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.user',),
        ),
    ]
