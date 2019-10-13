from peewee import *
import math
import datetime
import random

db = MySQLDatabase("nature-db",
                   host='nature-db.ch4xyx7zneie.us-east-2.rds.amazonaws.com',
                   user='uciadmin',
                   port=3306,
                   passwd='ucipassword')

db.connect()

EARTH_RADIUS = 6378137

def find_distance_in_meters(long_x,lat_x,long_y,lat_y):
    if long_x==0:
        return 0.0
    rad_lat_x = math.radians(lat_x)
    rad_lat_y = math.radians(lat_y)
    a = rad_lat_x - rad_lat_y
    b = math.radians(long_x) - math.radians(long_y)
    s = 2 * math.asin(math.sqrt(math.pow(math.sin(a/2),2) + 
    math.cos(rad_lat_x)*math.cos(rad_lat_y)*math.pow(math.sin(b/2),2)))
    s = s * EARTH_RADIUS
    s = int(s * 10000) / 10000
    return s

class BaseModel(Model):
    class Meta:
        database = db

class apis_species(BaseModel):
    species = CharField(max_length=30)
    movement_type = CharField(max_length=30)
    # could add more info about the species.

class apis_animal(BaseModel):
    species = ForeignKeyField(apis_species)
    name = CharField(max_length=30)
    intro = TextField()
    static_url = CharField(max_length=128)

class apis_animalmovement(BaseModel):
    animal = ForeignKeyField(apis_animal)
    time = DateTimeField()
    steps = FloatField()

def main():
    animal = apis_animal.get(id=4)
    now = datetime.datetime.now()
    now = now.replace(second=0,microsecond=0)
    if now.minute>45 or now.minute<=15:
        now = now.replace(minute=0)
    else:
        now = now.replace(minute=30)
    """
    #now = datetime.datetime(2019,1,7,19,0,0) 
    last = now - datetime.timedelta(days=1,minutes=15)
    next = last + datetime.timedelta(minutes=30)
    last_move = apis_animalmovement.get( (apis_animalmovement.animal==4)
        & (apis_animalmovement.time>last) & (apis_animalmovement.time<next) )
    """
    new_data = apis_animalmovement(animal=animal,time=now,steps=int(abs(random.normalvariate(500,300))) )
    print(now,new_data.steps)
    new_data.save()


if __name__=='__main__':
    main()

