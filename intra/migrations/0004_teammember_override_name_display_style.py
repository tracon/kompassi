# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-03-11 14:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intra', '0003_team_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='teammember',
            name='override_name_display_style',
            field=models.CharField(blank=True, choices=[('', 'As set by the user themself'), ('firstname_nick_surname', 'Firstname "Nickname" Surname'), ('firstname_surname', 'Firstname Surname'), ('firstname', 'Firstname'), ('nick', 'Nickname')], default='', help_text='For the purpose of public listings, the name display style of the team member may be overridden here.', max_length=22, verbose_name='Override name display style'),
        ),
    ]