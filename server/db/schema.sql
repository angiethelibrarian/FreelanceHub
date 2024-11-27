-- Example Database
DROP DATABASE IF EXISTS project_tracker_db;

-- Create new database
CREATE DATABASE project_tracker_db;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    budget DECIMAL(10, 2) NOT NULL,
    poster_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(20) CHECK (status IN ('Open', 'In Progress', 'Closed')) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Project Acceptances table
CREATE TABLE project_acceptances (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id),
    acceptor_id INTEGER NOT NULL REFERENCES users(id),
    accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_status VARCHAR(20) CHECK (completion_status IN ('Pending', 'Completed', 'Abandoned')) DEFAULT 'Pending',
    UNIQUE (project_id, acceptor_id)
);
