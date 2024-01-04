# Dockerfile
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
