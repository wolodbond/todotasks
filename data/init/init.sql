CREATE TABLE IF NOT EXISTS users
(
  id serial NOT NULL primary key,
  "firstName" varchar(50),
  "lastName" varchar(50),
  "email" varchar(50),
  "password" varchar(50),
  "createdDate" date NOT NULL DEFAULT CURRENT_DATE,
  "updatedDate" date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tasks
(
  id serial NOT NULL primary key,
  title varchar(50),
  body varchar(50),
  "taskStatus" varchar(50),
  "userId" varchar(50),
  "createdDate" date NOT NULL DEFAULT CURRENT_DATE,
  "updatedDate" date NOT NULL DEFAULT CURRENT_DATE
);

insert into users
  ("firstName", "lastName", "email", "password")
values
  ('Tony', 'Stark', 'stark@marvelstars.com', 'password'),
  ('Steve', 'Rogers', 'rogers@marvelstars.com', 'password');

insert into tasks
  (title, body, "taskStatus", "userId")
values
  ('init project', 'init new project', 'in progress', 2),
  ('finish project', 'finish current project', 'in progress', 2);
