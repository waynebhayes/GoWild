from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import authentication #import SessionAuthentication
from apis.models import *
import json
import datetime, iso8601

def str_to_date(str):
    return datetime.datetime.strptime(str, "%Y-%m-%d").date()

def str_to_time(str):
    format = '%Y-%m-%dT%H:%M:%S'
    return datetime.datetime.strptime(str, format)

def datetime_str_to_date(str):
    return iso8601.parse_date(str).date()
    #format = '%Y-%m-%dT%H:%M:%S%z'
    #return datetime.datetime.strptime(str, format).date()


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_my_animal(request, format=None):
    user = User.objects.get(user_id=request.user.id)
    animal = user.animal
    if animal is None:
        return JsonResponse({"success":"false", "error":"no animal assigned."},status=200)
    content = {
        'animal_info' :
            {
                "animal_id": animal.id,
                "name": animal.name,
                "image_url": animal.static_url,
                "intro": animal.intro,
                "species": animal.species.species,
                "movement_type": animal.species.movement_type
            }
    }
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def my_info(request, format=None):
    content = {
        'user': request.user.username,
        'id' : request.user.id,
        'auth': request.auth.key,
        'email' : request.user.email,
        'date_joined' : request.user.date_joined,
    }
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_last_updated_date(request, format=None):
    user = User.objects.get(user_id=request.user.id)
    #print(user.last_update)
    content = {
        'last_updated_date': user.last_update
    }
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_animal_list(request, format=None):
    animals = Animal.objects.all()
    animal_list = []
    for animal in animals:
        animal_list.append(
            {
                "animal_id" : animal.id,
                "name" : animal.name,
                "image_url" : animal.static_url,
                "intro" : animal.intro,
                "species" : animal.species.species,
                "movement_type" : animal.species.movement_type
            }
        )
    content = {
        "animal_list" : animal_list
    }
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def adopt_animal(request, format=None):
    data = json.loads(request.body)
    try:
        animal = Animal.objects.get(id=data["animal_id"])
        user = User.objects.get(user_id=request.user.id)
        user.animal = animal
        user.save()
        return JsonResponse({"success":"true"},status=200)
    except Animal.DoesNotExist:
        return JsonResponse({"success":"false", "message":"Invalid animal_id."},status=200)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_animal_movement(request, format=None):
    data = json.loads(request.body)
    user = User.objects.get(user_id=request.user.id)
    animal = user.animal
    start_time = iso8601.parse_date(data["start_time"])
    end_time = iso8601.parse_date(data["end_time"])+datetime.timedelta(days=1)
    segment = data["segment"]

    # the queries on animal data doesn't consider timezone info.
    #user_tzinfo = start_time.tzinfo
    #start_time = start_time.replace(tzinfo=datetime.timezone.utc)
    #end_time = end_time.replace(tzinfo=datetime.timezone.utc)

    if segment == "hour":
        time_segment = datetime.timedelta(hours=1)
    elif segment == "day":
        time_segment = datetime.timedelta(days=1)
    elif segment == "week":
        time_segment = datetime.timedelta(days=7)
    else:
        return JsonResponse({"success": "false", "message": "Invalid time segment type."}, status=200)

    queryset = AnimalMovement.objects.filter(animal=animal).filter(time__gt=start_time).filter(time__lte=end_time)
    movement_list = []
    next_segment = start_time + time_segment
    step_counter = 0
    for line in queryset:
        if line.time<=next_segment:
            step_counter += line.steps
        else:
            movement_list.append({
                "time": next_segment,#.replace(tzinfo=user_tzinfo),
                "steps": step_counter
            })
            step_counter = line.steps
            next_segment += time_segment
    movement_list.append({
        "time": end_time,#.replace(tzinfo=user_tzinfo),
        "steps": step_counter
    })

    content = {"data": movement_list}
    print(start_time,end_time)
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def update_user_movement(request, format=None):
    data = json.loads(request.body)
    movement_list = data["data"]
    user = User.objects.get(user_id=request.user.id)
    last_updated_date = user.last_update
    if last_updated_date is None:
        last_updated_date = datetime.date.min
    for day in movement_list:
        date_formatted = datetime_str_to_date(day["start_time"])
        try:
            line = UserMovement.objects.get(date=date_formatted, user=user)
            line.steps = int(day["steps"])
            # if the date exist, overwrite it
        except UserMovement.DoesNotExist:
            line = UserMovement(user=user, date=date_formatted, steps=int(day["steps"]))
            # if the date does not exists
        last_updated_date = max(last_updated_date, date_formatted)
        line.save()
    if last_updated_date != datetime.date.min:
        user.last_update = last_updated_date
        user.save()
    return JsonResponse({"success":"true"},status=200)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_user_movement(request, format=None):
    data = json.loads(request.body)
    start_date = str_to_date(data["start_date"])
    end_date = str_to_date(data["end_date"])
    queryset = UserMovement.objects.filter(user=User.objects.get(user_id=request.user.id)).filter(date__gte=start_date).filter(date__lte=end_date)
    movement_list = []
    for line in queryset:
        movement_list.append({
            "date" : line.date,
            "steps" : line.steps
        })
    content = { "data" : movement_list }
    print(start_date,end_date)
    return JsonResponse(content)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
def get_user_movement_list(request, format=None):
    data = json.loads(request.body)
    user = User.objects.get(user_id=request.user.id)
    start_date = str_to_date(data["start_date"])
    end_date = str_to_date(data["end_date"])
    segment = data["segment"]

    if segment == "hour":
        time_segment = datetime.timedelta(days=1)
    elif segment == "day":
        time_segment = datetime.timedelta(days=1)
    elif segment == "week":
        time_segment = datetime.timedelta(days=7)
    else:
        return JsonResponse({"success": "false", "message": "Invalid time segment type."}, status=200)

    queryset = UserMovement.objects.filter(user=user).filter(date__gt=start_date).filter(date__lte=end_date)
    movement_list = []
    next_segment = start_date + time_segment
    step_counter = 0
    for line in queryset:
        if line.date<=next_segment:
            step_counter += line.steps
        else:
            movement_list.append({
                "date": next_segment,
                "steps": step_counter
            })
            step_counter = line.steps
            next_segment += time_segment
    movement_list.append({
        "date": end_date,
        "steps": step_counter
    })

    content = {"data": movement_list}
    return JsonResponse(content)