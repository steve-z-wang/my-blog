#!/bin/bash

# EC2 Blog Deployment Script
# This script sets up persistent storage for your blog on EC2 using the root EBS volume

set -e

# Use a directory on the existing root EBS volume for Ubuntu instance
# This directory will persist even after server restarts
DATA_DIR="/home/ubuntu/blog-data"
DB_DIR="$DATA_DIR/db"

# Ensure the directories exist
mkdir -p $DATA_DIR
mkdir -p $DB_DIR

# No need to mount additional EBS volumes since we're using the root volume
# The root volume already has /dev/sda1 mounted and is persistent

# Create .env file for docker-compose
cat > .env << EOF
DB_VOLUME_PATH=$DB_DIR
EOF

echo "Database files will be stored at $DB_DIR"
echo "Created .env file with DB_VOLUME_PATH set to $DB_DIR"

# Copy schema files to data directory if they don't exist
if [ ! -f "$DB_DIR/schema.sql" ]; then
    echo "Copying database schema to data directory..."
    cp -v ./db/schema.sql "$DB_DIR/"
    cp -v ./db/seed.sql "$DB_DIR/" 2>/dev/null || echo "No seed.sql found, skipping"
fi

# Initialize database if it doesn't exist
if [ ! -f "$DB_DIR/blog.db" ] && [ -f "$DB_DIR/schema.sql" ]; then
    echo "Initializing database..."
    sqlite3 "$DB_DIR/blog.db" < "$DB_DIR/schema.sql"
    if [ -f "$DB_DIR/seed.sql" ]; then
        sqlite3 "$DB_DIR/blog.db" < "$DB_DIR/seed.sql"
    fi
fi

echo "Starting Docker services..."
docker-compose down
docker-compose up -d

echo "Deployment complete! Your blog should be running."