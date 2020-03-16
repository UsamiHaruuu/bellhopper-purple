## BellHopper

### Description
BellHopper is a cloud-based web application that helps users prepare for their upcoming travels. Users can search a location to see Entry Requirements, Vaccine Information, Weather, Electrical Plugs, and more. Users can quick-add this information to a to-do list that they can manage.

### Dependencies
 - exchange rate api at `http://api.currencylayer.com/`
 - weather rate api at `https://api.mapbox.com/`
 - other information just pulled from static json files 

### Known Bugs and Deficiencies
As mentioned above, information about Visa Requirements, Travel Advisories, Plug Type, Exchange Rate, and Vacccine Info are all given by static json files. These would need to be replaced with actual API sources. 

### System Requirements
 - NodeJs (12+)
 - npm

### Installation
 - `npm install`
 - create an account and new project with firebase, run `firebase login`
 - go to `/src/Firebase/config.js` and replace the config object with the one given by your new project
 - ideally use vscode and install the eslint extension

### Running
 - `npm start` to debug locally
 - `npm run build; firebase deploy` to deploy the application

### Testing
This project has no testing so far. 
