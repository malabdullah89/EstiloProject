# Generated by Django 2.2.8 on 2020-06-22 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('describtion', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(upload_to='images/category')),
                ('scrol_order_no', models.IntegerField()),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('describtion', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/products')),
                ('available', models.BooleanField(default=True)),
                ('prepared_time', models.DurationField(blank=True, null=True)),
                ('sex', models.CharField(choices=[('men', 'Men'), ('women', 'Women'), ('kid', 'Kids'), ('unisex', 'unisex')], default='unisex', max_length=50)),
                ('size', models.CharField(choices=[('XL', 'XL'), ('L', 'L'), ('S', 'S'), ('M', 'M')], default='L', max_length=50)),
                ('color', models.CharField(choices=[('White', 'White'), ('Red', 'Red'), ('Green', 'Green'), ('Black', 'Black'), ('Purble', 'Purble'), ('Blue', 'Blue'), ('Yellow', 'Yellow'), ('Pink', 'Pink'), ('Grey', 'Grey'), ('Gold', 'Gold')], default='White', max_length=50)),
                ('date', models.DateField(auto_now=True)),
                ('status', models.CharField(choices=[('ready', 'ready'), ('not_ready', 'not_ready')], default='ready', max_length=50)),
                ('quantity', models.IntegerField()),
                ('price', models.FloatField()),
                ('discount', models.FloatField(default=0.0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('viewed', models.BooleanField(default=False)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='product.Category')),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='product', to='accounts.UserLocation')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('describtion', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(upload_to='images/category')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='childerns', to='product.Category')),
            ],
            options={
                'verbose_name_plural': 'Sub Categories',
            },
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/products')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='product.Product')),
            ],
        ),
    ]
