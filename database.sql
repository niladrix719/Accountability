CREATE DATABASE teamprojectapp;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    class_description TEXT NOT NULL,
    class_admin INTEGER REFERENCES users(id),
    members INTEGER[] REFERENCES users(id),
    total_members INTEGER NOT NULL
);

CREATE TABLE class_members (
    class_id INTEGER REFERENCES classes(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (class_id, user_id)
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    PRIMARY KEY (project_id, user_id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    project_admin INTEGER REFERENCES users(id),
    goal VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL,
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    goal_description TEXT NOT NULL,
    sub_goals TEXT[] NOT NULL,
);

CREATE TABLE sub_goals (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER REFERENCES goals(id),
    sub_goal_description TEXT NOT NULL,
    individual_goals TEXT[] NOT NULL,
    completed BOOLEAN DEFAULT false,
);
