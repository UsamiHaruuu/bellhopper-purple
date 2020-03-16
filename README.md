## BellHopper

### Description
BellHopper is a cloud-based web application that helps users prepare for their upcoming travels. Users can search a location to see Entry Requirements, Vaccine Information, Weather, Electrical Plugs, and more. Users can quick-add this information to a to-do list that they can manage.

### Dependencies
 - Location API at `https://api.mapbox.com/`
 - Weather API at `http://api.worldweatheronline.com/`
 - Replace the API keys with valid keys on lines 8, 54, and 96 of `/src/Components/Dashboard/CountryHelpers/Weather.js` to use the above APIs
 - Other information just pulled from static json files

### Known Bugs and Deficiencies
As mentioned above, information about Visa Requirements, Travel Advisories, Plug Type, Exchange Rate, and Vacccine Info are all given by static json files. These would need to be replaced with actual API sources.

The list of cities is also hardcoded in `/src/Components/Dashboard/CountryHelpers/CountryData.js`. In the future, this list may need updates or should be dynamically fetched elsewhere.

Additionally, some information was hardcoded specific to certain countries for the demo of our app. Specifically, in `/src/Components/Dashboard/CountryHelpers/index.js`, the todo for weather is hardcoded for 3 cities on lines 39-43 and weather to include an alert icon in the contents is hardcoded on lines 47-57. Those should be replaced in the future to not be different for specific countries, unless there is additional reason to do so.

### System Requirements
 - NodeJs (12+)
 - npm

### Installation
 - `git clone https://github.com/cs394-w20/bellhopper-purple.git`
 - `cd bellhopper-purple`
 - `npm install`
 - Create an account and new project with [Firebase](https://console.firebase.google.com/u/0/)
 - `firebase login`
 - Go to `/src/Firebase/config.js` and replace the config object with the one given by your new project
 - Ideally, use Visual Studio Code and install the eslint extension

### Running and Deploying
 - `npm start` to debug locally
 - `npm run build; firebase deploy` to deploy the application

### Testing
This project has no testing so far. 
