# Gyanmatrix Assignment

ECOM project : This is simple ecommerce website below functionality

1. User register/login
2. Product CRUD operations
3. View product dashboard.

# screenshots - This directory has all screenshots of project for angular 5 front end

# angular : This directory has code written in angular 5 front end and it uses same ecom django project as rest api back end.

# ecom : This is django project, with front end designed in Angularjs.

To run locally, do the usual:

Create a Python 3.7 virtualenv

Install dependencies:

pip install -r ecom/requirements.txt
npm install

Create databases:
User app/db.sql for creating database if you are using mysql

Do the migration
python ./manage.py migrate

Create a superuser:
python ./manage.py createsuperuser

To create admin user :
Use .create_admin_user.py script to create admin user.
copy all content of ecom/create_admin_user.py file and uses command 'python manage.py shell' to open shell and paste all content of file.
Note By default admin details are,
Username : admin@ecom.com
password : 1234

To run static files for Angular jsbower
Need bower package, can install using npm
Once bower is installed in system then go to ecom/static/ directory in teminal and execute following command
bower install

Regarding server setup :
All server related files for this project, can be found in ecom/webservers/ directory
Note : All configuration files are for linux machine.

Note from coder : I have deployed code to my personel new server[Red-hat8]. As its new server, I had to do all packages installation, Inorder to django,
I had to install some dependent packages, which were taking too much ram size, as its free instance, I have only 1GB of RAM, so could not configure it.
Besides I did have much time to look into this issue.
But I have attached all necessary files required to run this project in server for perticualr user. You can find those file in ecom/webserver directory
