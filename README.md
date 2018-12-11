# Mylibrary
App allow to user to create his own library, by adding books that have been read to their own list.

# User journey :
  - As a user I want to create account to create own library.
  - As a user I want to login to my account .
  - As a user I want to add book to my list .
  - As a user I want to search form my library books.
  - As a user I want to logout from my account .
 

# Website Link:[My Library](https://music-dbapp.herokuapp.com/)
# Architecture :
- App Architecture 
- file Structure 
  - public 
    - index.html 
    - style.css 
    - assets folder for images
  - src 
   -srever
    - server.js
    - router.js
    - handler.js
   - tests
     - test.js
   - database
     - db_build.sql
     - db_connection.js
     - db_build.js
   - queries
     - getData.js
     - setData.js
     - check.js
  - package.json
  
 
# How to run our site on your machine?
- git clone this repo **(https://github.com/FACK1/had-am-sa.git)**
- Open your **command line**.
- Put in terminal : **npm install** .
- create database **CREATE DATABASE <database name here>; **
- create uesrname and password **CREATE USER <desired username to connect to database>;**
- grant prinileges **GRANT ALL PRIVILEGES ON DATABASE <database name here> TO <desired username entered previously>;**
- make config.env file and put **DATABASE_URL= postgres://uesrname:password@localhost:5432/dbname**
- Put in terminal : **node database/db_build.js**.
- Then put in terminal : **npm run dev**  to run the server.
- Open your browser and put in terminal: **localhost:3000**.

# Test coverage


# CI Test

# Team_Member:
  - Hadeel Slamin
  - Aman Shawar
  - Sama' Amro 

