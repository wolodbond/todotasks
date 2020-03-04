# Todo tasks project

All things done

### Prerequisites

Required installation:

```
Docker
Docker-compose
Postman
```

### Installing

Please clone repo and run docker-compose up

```
docker-compose up
```

### Testing

Sorry without swagger.
Please use follow routes:

http://127.0.0.1:8080/ - in browser, for pg Adminer
http://127.0.0.1:3000/graphiql - in browser, for graphi interface

http://127.0.0.1:3000/auth/login - post req, for getting jwt

```
{
  "email": "star@marvstars.com",
  "password": "password"
}
```

http://127.0.0.1:3000/api/v1/users/2/tasks - get request, for get second user's seeded tasks. Please use Bearer token for auth

http://127.0.0.1:3000/graphql - post request, for create, update and delete user's task. For quick test it please make import follow requests to postman and add Bearer token for auth:

1 create task

```
curl 'http://127.0.0.1:3000/graphql' -H 'Accept: application/json' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data '{"query":"mutation {\n  updateTaskById(input: {id: 13, taskPatch: {taskStatus: \"done\"}}) {\n    clientMutationId\n    task {\n      id\n      title\n      body\n      taskStatus\n    }\n  }\n}\n","variables":null}'
```

2 update task's status to done

```
curl 'http://127.0.0.1:3000/graphql' -H 'Accept: application/json' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data '{"query":"mutation {\n  deleteTaskById(input: {id: 13}) {\n    deletedTaskId\n  }\n}\n","variables":null}'
```

3 delete task

```
curl 'http://127.0.0.1:3000/graphql' -H 'Accept: application/json' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data '{"query":"mutation {\n  createTask(input: {task: {id: 13, title: \"new task2\", body: \"new task here!\", taskStatus: \"WIP\", userId: \"2\", createdDate: \"2020-03-03\", updatedDate: \"2020-03-03\"}}) {\n    clientMutationId\n    task {\n      id\n      title\n    }\n  }\n}\n","variables":null}'
```
