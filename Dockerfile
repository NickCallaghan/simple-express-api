# => Run container
FROM node

# Static build
COPY /api /var/www

# Copy environment variables into filesystem
#COPY ./scripts/env.sh /var/www

# Port exposure
EXPOSE 3000

RUN apt-get update
RUN apt-get -y install nodejs



# Set permissions of shell script
#RUN chmod +x /var/www/env.sh

# Start Nginx server
CMD ["cd /var/www/app.js &&", "node", "/var/www/app.js"]