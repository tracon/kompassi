# Generated by Django 2.1.5 on 2019-03-01 07:27

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programme', '0085_programme_ropecon2019_gaming_desk_subtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programme',
            name='max_players',
            field=models.PositiveIntegerField(blank=True, default=4, help_text='What is the maximum number of players that can take part in a single run of the game?', null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(99)], verbose_name='maximum number of players'),
        ),
        migrations.AlterField(
            model_name='programme',
            name='min_players',
            field=models.PositiveIntegerField(blank=True, default=1, help_text='How many players must there at least be for the game to take place?', null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(99)], verbose_name='minimum number of players'),
        ),
    ]