# Requirements

- Docker is required to run both projects.

If you are using Windows you can download docker desktop here
https://www.docker.com/products/docker-desktop/

- Yarn is also required to boot up the client

- MySQL

the database environment variable in the docker-compose files will have to be changed suited to your systems MySQL username and password


## Client setup

In the client directory enter the following commands to install the dependencies and to run the client

```bash
yarn
yarn watch
```

## Microservices

In the microservices directory

Use the following docker command to boot up the backend

```bash
docker-compose up
```

Ctrl + C to kill server

## Monolith

In the microservices directory

Use the following docker command to boot up the backend

```bash
docker-compose up
```

Ctrl + C to kill server