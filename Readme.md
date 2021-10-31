## This is a simple project to show row to configure nginx to proxy requests to a node app

The project uses three docker images:

1. Mysql oficial image as database.
2. App as application using nodejs.
3. NginX as reverse proxy.

Two networks are used do exchange data between containers:

1. nodenet: exchange data between nginx and node app ( proxy ports 8080 (host) -> 80 (nginx) -> 3000 (app))
2. sqlnet: exchange data between node app and mysql ( port 3036 expose from mysql container).

When the database container is up, a script is executed creating a table in project database.
The node-app wait until the database is online (using dockerize) and set a conection.
The javascript code write a row inside the created table.

When a requistion is made to http://<you_machine_ip_or_name>:8080 nginx redirects to node app. The app execute a select in database and read the row tha was write before and send a response in html.

### Run command:

To Build you must run (in project root folder - node):

docker-compose up -d or

docker-compose up -d --build

### Down commnad:

docker compose down
