## recommended set up
Update: I deactived AWS server to avoid further billing, but it wouldn't be too hard to deploy the backend and point frontend to it.
Database connection and other configs are located at setup.py. I do recomment going over Django tutorial before taking over.

We currently use AWS ec2 server, NGINX/Uwsgi/Django/MySQL stack for backend, and freenom for DNS.
For database testing MySQL workbench is recommend.
And Postman for testing the APIs

## commands cheat sheet

Dependency needed for running the project:

* `pip3 install Django djangorestframework`

* `pip3 install mysqlclient`

* And for the stupidity of `%z` format of datetime.strptime() in python3.6, `pip3 install iso8601`

* if installing mysqlclient failed, do `sudo apt-get install libmysqlclient-dev`

To start the server on aws, run

* `uwsgi --ini nature_app_uwsgi.ini` under the path `~/nature-backend/backend`

To start the server locally, run 

* `python3 manage.py runserver`

To update database structure:

* `manage.py makemigrations`

* `manage.py migrate`


## server settings 

Server access 

* The server is currently running on `animove.tk:8000` 
  or you can use `http://18.222.230.254:8000/` if DNS is down

Project

* Path `~/nature-backend/backend`

Nginx 

* Start or restart nginx at `/etc/init.d/nginx start`

* Server settings at `/etc/nginx/sites-available/default`


## apis cheat sheet 

### Test user info:(you can use this for testing)

* `username:test, password:test`
* `username:test1, password:test1`
* `username:1234, password:12345`

### Login and obtain user token:

* e.g. for user 1: sent POST to "/apis/login/", with body: `username:1234, password:12345`

* you'll receive: 
 
 `"token": <token> `

  where `<token>` is some hexdecimal number

### Logout using user token

* send POST to "/apis/logout/" with header: `Authorization: Token <token>` 

### Check user info

* sent POST to "/apis/my_info/" with header: `Authorization: Token <token>`

### Get last updated date of the user

* send POST to "/apis/last_updated_date/" with header: `Authorization: Token <token>`
	you'll receive a json like this:

	```
	{
    	"last_updated_date": "2019-01-01"
	}
	```

	the date will be null if no valid data is on the server

### Get animal list possible to adopt

* send POST to "/apis/animal_list/" with header: `Authorization: Token <token>`
	you'll receive a json like this:
	```
	{
    "animal_list": [
        {
            "animal_id": 1,
            "name": "Bob",
            "image_url": "static/bear.png",
            "intro": "Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, small rounded ears, shaggy hair, plantigrade paws with five nonretractile claws, and short tails.",
            "species": "Bear",
            "movement_type": "run"
        },
        {
            "animal_id": 2,
            "name": "Frank",
            "image_url": "static/fox.png",
            "intro": "Foxes are small-to-medium-sized, omnivorous mammals belonging to several genera of the family Canidae. Foxes have a flattened skull, upright triangular ears, a pointed, slightly upturned snout, and a long bushy tail (or brush).",
            "species": "Fox",
            "movement_type": "run"
        },
        ...
    ]
}
	```

### Adopt a existing animal

* send POST to "/apis/adpot_animal/" with header: `Authorization: Token <token>` with data in the following format:
	```
	{
		"animal_id" : "4"
	}
	```

	you'll receive a json like this on success:
	```
	{
    	"success": "true"
	}
	```

	or a error message when you send a invalid id:
	```
	{
	    "success": "false",
	    "message": "Invalid animal_id."
	}
	```

	note that one use can only have one animal at a time.

### Get your animal's movement data

* send POST to "/apis/animal_movement/" with header: `Authorization: Token <token>` with data in the following format:
	```
	{
		"start_time" : "2019-01-01T00:00:00+07:00"
	}
	```
	where start_time is a datetime with timezone, this time will be hard set to 00:00:00 for a day's query from 00:00:00 to 00:00:00 next day.

	you'll receive a json like this on success:
	```
	{
	    "data": 
	    [
	        {
	            "time": "2019-01-01T00:30:00+07:00",
	            "steps": 266
	        },
	        {
	            "time": "2019-01-01T01:00:00+07:00",
	            "steps": 558
	        },
	        ...
	        {
	            "time": "2019-01-01T23:30:00+07:00",
	            "steps": 808
	        },
	        {
	            "time": "2019-01-02T00:00:00+07:00",
	            "steps": 1097
	        }
	    ]
	}
	```

	this json contains 48 elements in the data array, representing the steps that your animal moved in the past 30 minutes, the time will be converted to user's timezone.

### Update user movement 

* send POST to "/apis/user_movement/" with header: `Authorization: Token <token>` and with data in the following format:
	```
	{
		"data" :
		[
			{
			"steps" : "2683",
			"start_time": "2019-01-01T00:00:00-07:00",
			"end_time": "2019-01-02T00:00:00-04:00"
			},
			{
			"steps" : "8848",
			"start_time": "2019-01-02T00:00:00-04:00",
			"end_time": "2019-01-03T00:00:00-04:00"
			},
			{
			"steps" : "0",
			"start_time": "2019-01-03T00:00:00+10:00",
			"end_time": "2019-01-03T00:00:01-00:00"
			}
		]
	}
	```

	note that start and end time should be in standard format `%Y-%m-%dT%H:%M:%S%z` and start time should always start from `00:00:00` at local time.

	and that steps should be a integer representing the moving steps.

	you'll receive a json like this on success:

	```
	{
    	"success": "true"
	}
	```

### Get User movement history between a time interval

* send POST to "/apis/user_movement_history/" with header: `Authorization: Token <token>` and with data in the following format:
	```
	{
		"start_date" : "2019-01-01",
		"end_date" : "2019-01-05"
	}
	```

	the result will contain all distance data(float, in meters) in the [start_date,end_date] interval

	you'll receive a json like this as the result:

	```
	{
	    "data": 
	    [
	        {
	            "date": "2019-01-01",
	            "distance": 2683.02
	        },
	        {
	            "date": "2019-01-02",
	            "distance": 8848.88
	        },
	        {
	            "date": "2019-01-03",
	            "distance": 12345
	        }
	    ]
	}
	```


## Intro to django:

https://docs.djangoproject.com/en/2.1/intro/tutorial01/

There might be some dependency requirements after install django, please install those packages on your own.


