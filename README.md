# The-Farm-PET

## Docker Info
The project is split into two separate packages: pet-api (the PET backend which will perform database operations) and pet-client (the React-Bootstrap frontend). Both are containerized and can be started simultaneously with

docker-compose up
This will start the client at http://localhost:3000 and the API at http://localhost:3001. Try logging in with the email fido@umass.edu and password fido! To exit, simply press Ctrl+C and wait for the services to stop.

To start an individual service, you can do the following:

docker-compose up $SERVICE_NAME
where $SERVICE_NAME is one of api, client, or db. To start one or all services in "detached" mode, allowing you to return to your command prompt after the service starts, use the -d flag.

### for example
docker-compose up -d api
### or to start all services
docker-compose up -d
To stop services after doing this, use docker-compose down.

### an example for one service
docker-compose down api
### or, stop all running services
docker-compose down
Note: if you make a change in any source files, for now you will need to tell Docker to rebuild the image for that service in order to see the changes (I'm looking into workarounds to avoid having to do this but for now we need to). To tell Docker to rebuild an image, use the --build flag when you bring a service up.

### for example, if you made some API changes and want to see them, bring the service up like this
docker-compose up --build api
### or just rebuild images for everything
docker-compose up --build
