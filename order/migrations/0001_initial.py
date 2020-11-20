# Generated by Django 2.2.8 on 2020-06-22 12:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cart', '0001_initial'),
        ('accounts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('cart_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='cart.Cart')),
                ('order_status', models.CharField(choices=[('added', 'Added'), ('accepted', 'Accepted'), ('processing', 'Processing'), ('out_for_delivery', 'OUT_FOR_DELIVERY'), ('delivered', 'Delivered'), ('cancel', 'Cancel'), ('unCompleted', 'UnCompleted')], default='added', max_length=100)),
                ('payment_method', models.CharField(choices=[('k_net', 'K_NET'), ('credit_card', 'Credit_Card'), ('cash', 'Cash')], default='cash', max_length=100)),
                ('orderID', models.IntegerField()),
                ('date', models.DateField(auto_now=True)),
                ('sub_total', models.FloatField()),
                ('total', models.FloatField()),
                ('delivery_notes', models.TextField()),
                ('payment_status', models.CharField(choices=[('paid', 'Paid'), ('not_paid', 'Not_Paid')], default='not_paid', max_length=50)),
                ('driver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='delivery_orders', to=settings.AUTH_USER_MODEL)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='orders', to='accounts.UserLocation')),
                ('order_owner', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
            bases=('cart.cart',),
        ),
    ]