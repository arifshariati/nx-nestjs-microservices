

# Nestjs Microservices with nx workspaces

nx workspaces comes with many benifits, once of which is scalibility and development speed. In this repo i have demonstrated, how microservices can be developed/created in Nestjs using nx workspaces. 

Tech stack for this project is below;

1. [nx workspaces](https://nx.dev/) 
2. [Nestjs](https://nestjs.com/) 
3. [Graphql](https://graphql.org/) 
4. [Postgresql](https://www.postgresql.org/)
5. [Docker](https://www.docker.com/)
6. [Microservices](https://microservices.io/)
7. [RabbitMQ](https://www.rabbitmq.com/)

## Architecture 

Let's have a look at the architecture for this project. 

![Microservices Architecture](images/architecture.jpg)

RabbitMQ as message broker comes between microservices and our API server. In real world projects, microservices implementation focus on loosely code base and database dependency. 

## Entities  

Though entity definition does not add much value to your understanding, however i feel it is good to share for better understanding.  

### User Entity
```javascript
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}

export default User;
```

### Post Entity 
```javascript
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    body: string;

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}

export default Post;
```

## RabbitMQ as message broker

RabbitMQ plays vital role in implementing microservices while it keeps communication between our producers and consumers. You can try our [Redis](https://redis.io/) as well.

### Producer Configuration 
```javascript
ClientsModule.register([
{
  name: 'USER_SERVICE',
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URI],
    queue: 'users',
    queueOptions: {
      durable: true
    }
  }
}])
```

### Consumer Configuration 
```javascript
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@127.0.0.1:5672/vhost'],
    queue: 'users',
    queueOptios: {
      durable: true
    }
  }
});
```
Below are RabbitMQ Connection and Queue Dashboard.
![RabbitMQ Queue Graph](images/rabbitmq_queue_graph.png)
![RabbitMQ Connection](images/rabbitmq_connection.png)

## Docker 

Docker containers are used to spin RabbitMQ and Postgresql.
```javascript
version: "3"

services:
# postgresql
# ***************************************
  postgres:
    image: postgres:latest
    container_name: nx-nestjs-microservice-pg
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - ./pg/pgData:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    networks:
      - nx-nestjs-microservice
# rabbitmq 
# ***************************************
  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    environment:
      RABBITMQ_DEFAULT_VHOST: vhost
    ports:
      - 5672:5672
      - 15672:15672
    networks:
      - nx-nestjs-microservice
networks:
  nx-nestjs-microservice:
```

![createpost](images/docker_containers.png)

## Graphql Playground 

If everything is setup properly, you should be able to experiment with microservices and all should work as expected.

### createpost  
![createpost](images/graphql_createpost.png)
### posts 
![createpost](images/graphql_posts.png)
### users  
![createpost](images/graphql_users.png)

# How to Install ?

clone this repo on your machine, go to projec directory and install dependencies.

```bash
npm i
```
Once depencies are install, while being in project root folder, run below to spin docker container for RabbitMQ and Postgresql.  

```bash
docker-compose up -d
```
# Start Project 
run below commands in separate terminals to spin API server, user microsevice and post microsevice.

```bash
# API server 
nx serve api 

# user microservice 
nx serve ms-user 

# post microservice 
nx serve ms-post
```

# 🚀 That's it, you have made it running project  

I appreciate reading all instructions, though may seem bit complicated at first, however, will be quite easy once you get familiar with microservices implementations. 

*Do share your thoughts*
