# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-16 20:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0012_shirtorder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shirtorder',
            name='count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterUniqueTogether(
            name='shirtsize',
            unique_together=set([('type', 'slug')]),
        ),
        migrations.AlterUniqueTogether(
            name='shirttype',
            unique_together=set([('event', 'slug')]),
        ),
    ]
