CREATE DATABASE teamprojectapp;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    characteristics VARCHAR(255)[] NOT NULL,
    created_on TIMESTAMP NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    project_admin INTEGER REFERENCES users(id),
    project_goal TEXT NOT NULL,
    project_code VARCHAR(8) UNIQUE NOT NULL,
    total_members INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL
);

CREATE TABLE project_members (
    project_id INTEGER REFERENCES projects(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (project_id, user_id)
);

CREATE TABLE sub_goals (
    id SERIAL PRIMARY KEY,
    sub_goal_name VARCHAR(255) NOT NULL,
    sub_goal_description TEXT NOT NULL,
    sub_goal_status VARCHAR(255) NOT NULL,
    sub_goal_deadline TIMESTAMP NOT NULL
);

CREATE TABLE project_sub_goals (
    project_id INTEGER REFERENCES projects(id),
    sub_goal_id INTEGER REFERENCES sub_goals(id),
    PRIMARY KEY (project_id, sub_goal_id)
);

CREATE TABLE individual_assignments (
    id SERIAL PRIMARY KEY,
    assignment_name VARCHAR(255) NOT NULL,
    assignment_description TEXT NOT NULL,
    assignment_status VARCHAR(255) NOT NULL,
    assignment_deadline TIMESTAMP NOT NULL,
    assignee INTEGER REFERENCES users(id)
);

CREATE TABLE sub_goal_assignments (
    sub_goal_id INTEGER REFERENCES sub_goals(id),
    assignment_id INTEGER REFERENCES individual_assignments(id),
    PRIMARY KEY (sub_goal_id, assignment_id)
);

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    team_admin INTEGER REFERENCES users(id),
    team_progress INTEGER NOT NULL,
    total_members INTEGER NOT NULL
);

CREATE TABLE team_members (
    team_id INTEGER REFERENCES team(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    class_description TEXT NOT NULL,
    class_admin INTEGER REFERENCES users(id),
    total_members INTEGER NOT NULL
);

CREATE TABLE class_members (
    class_id INTEGER REFERENCES classes(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (class_id, user_id)
);
