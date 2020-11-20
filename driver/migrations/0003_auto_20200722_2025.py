
# Generated by Django 2.2.8 on 2020-07-22 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('driver', '0002_driver_seller_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driver',
            name='seller_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivers', to='seller.Seller'),
        ),

        
    ]
