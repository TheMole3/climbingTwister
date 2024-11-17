# Use joseluisq/static-web-server to serve the static files
FROM nginx

# Copy files from the build stage
COPY build /var/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80