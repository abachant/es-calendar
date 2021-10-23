# Turnout Interview Project
Sample project for Turnout interviews.

## Dependencies
- `make`
- `node`
- `npm`
- `docker`
- `docker-compose`

## Getting started
Install the dependencies listed above then run `make up`. This will spin up a local instance at `localhost:5000`. The server and frontend will reload automatically when you change the code. Run `make down` to spin down the project.

## Requirements
The goal is to display a table of events using data from the API. The database has already been populated with event data and there is an ApiService object that can be used to fetch it. You will need to implement the following:
- Create a Sequelize model for event data based on the table in the database.
- Create an API endpoint that returns a list of events.
- Use everything above to fetch and display the event data in a table. You don't need to design the table from scratch, feel free to pull in a library.
- The end result should look roughly like the example in the Styling Mockup. The table should be centered on the page.
- The API endpoint should support limit/offset pagination and the table should use this when changing pages instead of paginating on the frontend.
- Define an API endpoint for updating events with reasonble ACL and error handling.
