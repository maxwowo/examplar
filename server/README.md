# Endpoints

You can access the Examplar server endpoints by connecting to [https://server.examplar.org](https://server.examplar.org).

# Setting up

There are many ways to run the Examplar server. **If you plan to run the Examplar server using Docker**, make sure to complete the [Docker post-installation steps](https://docs.docker.com/install/linux/linux-postinstall/). This includes creating a Docker group using `$ sudo groupadd docker`, then adding the current user into the Docker group using `$ sudo usermod -aG docker $USER`, finally logging out then back in or running `$ newgrp docker` on Linux to activate the changes to groups. If this step wasn't done properly, the generated migration files would be read-only because of Docker permission shenanigans.

## With docker-compose

This is the most painless way of starting the Examplar server. Simply run `$ make run-bundle` in this directory to start up both the server and the database in Docker.

## With Docker

This allows you to run the database and server separately. Run `$ make database-start` to start up the database. Then run `$ make run-docker` to start up the server. 

## With Go

Either use `$ make database-start` to start up the database, or manually set up a local PostgreSQL database with the following credentials

```
user: examplar
password: examplar
database: examplar
```

. Start the aforementioned local database, then run `$ make run` to start up the server.

# Database migration

Use `$ make migrations-run` to run the database migrations, and `$ make migrations-generate name=example` to generate a new set of up & down migration files with a specified name.

# University initialization

On the first time running the Examplar server, the database needs to be initialized with university data. There are many ways of achieving this.

## With Docker

**You need Docker for this.** Simply run `$ make universities-load` to run the initialization script in Docker.

## With Go

Run `$ go run packages/uniloader/uniloader.go` in this directory to run the initialization script.