# Deployment Guide

## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t ecommerce-app .
docker run -p 80:80 ecommerce-app