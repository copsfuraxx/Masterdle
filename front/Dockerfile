FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/cats-front /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200