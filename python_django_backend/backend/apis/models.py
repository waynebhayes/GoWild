from django.db import models

class Species(models.Model):
    species = models.CharField(max_length=30)
    movement_type = models.CharField(max_length=30)
    # could add more info about the species.

class Animal(models.Model):
    species = models.ForeignKey(Species, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=30)
    intro = models.TextField()
    static_url = models.CharField(max_length=128)

class User(models.Model):
    user_id = models.IntegerField()
    last_update = models.DateField(null=True)
    animal = models.ForeignKey(Animal, null=True, on_delete=models.SET_NULL)
    # other user info here

"""
class Owns(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE) #db_index=True
    animal = models.ForeignKey(Animal,on_delete=models.CASCADE)
    animal_given_name = models.CharField(max_length=30)r
"""

class AnimalMovement(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    time = models.DateTimeField()
    steps = models.IntegerField()

class UserMovement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    steps = models.IntegerField()

