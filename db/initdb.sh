# !/bin/bash
# bash script to initialize the database

# delete the existing database file
rm -f blog.dev.db

# create a new database file
sqlite3 blog.dev.db < schema.sql 
sqlite3 blog.dev.db < seed.sql 