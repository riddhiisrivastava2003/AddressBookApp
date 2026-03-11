-- Delete old database if exists
DROP DATABASE IF EXISTS addressbook;

-- Create new database
CREATE DATABASE addressbook;
USE addressbook;

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL
);

-- =========================
-- CONTACTS TABLE
-- =========================
CREATE TABLE contacts (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          first_name VARCHAR(50) NOT NULL,
                          last_name VARCHAR(50) NOT NULL,
                          address VARCHAR(255),
                          city VARCHAR(50),
                          state VARCHAR(50),
                          zip VARCHAR(10),
                          phone VARCHAR(15),
                          email VARCHAR(100),
                          date_added DATE,
                          user_id BIGINT,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- SAMPLE USER
-- =========================
INSERT INTO users (username, email, password)
VALUES ('riddhi', 'riddhi@gmail.com', '1234');

-- =========================
-- SAMPLE CONTACTS
-- =========================
INSERT INTO contacts
(first_name, last_name, address, city, state, zip, phone, email, date_added, user_id)
VALUES
    ('Rahul', 'Sharma', 'Street 12', 'Delhi', 'Delhi', '110001', '9876543210', 'rahul@gmail.com', CURDATE(), 1),
    ('Amit', 'Verma', 'Sector 18', 'Noida', 'Uttar Pradesh', '201301', '9123456789', 'amit@gmail.com', CURDATE(), 1),
    ('Priya', 'Singh', 'MG Road', 'Lucknow', 'Uttar Pradesh', '226001', '9988776655', 'priya@gmail.com', CURDATE(), 1);

-- =========================
-- CHECK DATA
-- =========================
SELECT * FROM users;
SELECT * FROM contacts;

UPDATE contacts SET phone_number='9876543210' WHERE id=1;
UPDATE contacts SET phone_number='9123456789' WHERE id=2;
UPDATE contacts SET phone_number='9988776655' WHERE id=3;

use addressbook;

select * from contacts;