# Setting up
There are many ways to run the Examplar server.

## With docker-compose
This is the most painless way of starting the Examplar server. Simply run `sudo docker-compose up -d` in this directory to start up both the server and the database in Docker.

## With Docker
This allows you to run the database and server separately. Run `sudo make database-start` to start up the database. Then run `sudo make docker-run` to start up the server. 

## With Go
Either use `sudo make database-start` to start up the database, or manually set up a local Postgres database with the following credentials
```
user: examplar
password: examplar
database: examplar
```
. Start the aforementioned local database and then run `sudo make run` to start up the server.

# First run
On the first time running the Examplar server, the database needs to be initialized with university data. There are many ways of achieving this.

## With Docker
Simply run `sudo make universities-load` to run the initialization script in Docker.

## With Go
Run `go run packages/uniloader/uniloader.go` in this directory to run the initialization script.
