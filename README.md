# Web Scraping 9COVID-19 API)

> Serving data from [worldmeter](https://www.worldometers.info/coronavirus/) as a JSON api

## Routes

can also be found on [Postman](https://documenter.getpostman.com/view/10967946/SzzefzaP?version=latest)

- /v1/all: global summary

- /v1/countries: Returns a JSON array with an element for each country that has stats available

- /v1/continents: Returns a JSON array with an element for each continent that has stats available

- /v1/continents/:query: Returns JSON data for a specific continent that has stats available.

- /v1/conuntries/:query: Returns JSON data for a specific country that has stats available.

## Usage

1. Clone

   ```bash
   git clone https://github.com/Mohammad-Safayet/web-scraping-Covid19Stats
   ```

2. Install deps (`npm install`)

3. Start the dev server (`npm start`)
