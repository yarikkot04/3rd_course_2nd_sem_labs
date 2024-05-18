### Laboratory Work No. 4

**Topic:** NodeJS. Creating a server using express. Handling routes. Templating.

**Task:**
Develop a web application for obtaining weather data.
- In the template, create a menu of links with city names (one of the menu items must include the author's location).
- The format of the request string to obtain weather data:
/weather/{city}, where city is the name of the selected city.
- Weather data can be obtained by sending a request to OpenWeatherMap Advanced. Retrieve weather data at the user's location using the following URI: /weather/

### How to Start

To start the server, follow these steps:

1. Ensure you have Node.js installed on your machine.

2. Navigate to the project directory in your terminal.

3. Run the following command:

   ```
   npm run dev
   ```
   or
    ```
   node index.js
   ```

   This will start the server using nodemon, which will automatically restart the server whenever changes are detected in the files.

4. Once the server is running, you can access it by navigating to http://localhost:5000 .