const axios = require("axios");
const cheerio = require("cheerio");

const utils = require("./utils");

module.exports.getTheCountries = async (sort, all = false) => {
  const $ = cheerio.load(
    (await axios.get("https://www.worldometers.info/coronavirus/")).data
  );

  const data = $("table#main_table_countries_today")
    .children("tbody:first-of-type")
    .children("tr:not(.row_continent)")
    .map((_, row) => {
      const country = {};

      cheerio(row)
        .children("td")
        .each((index, element) => {
          element = cheerio.load(element);

          country[utils.countryDataField[index]] =
            index != 1 && index != 15
              ? parseInt(element.text().replace(/(\n|,)/g, "")) || 0
              : element.text().replace(/(\n|,)/g, "");
        });

      return country;
    })
    .get();

  var world = data.shift();
  if (all) {
    return world;
  }

  if (sort.toLowerCase() === "name".toLowerCase()) {
    return data.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else {
    return [
      ...data.sort((a, b) =>
        a[sort.toLowerCase()] < b[sort.toLowerCase()] ? 1 : -1
      ),
    ];
  }
};

module.exports.getTheContinents = async (sort) => {
  const $ = cheerio.load(
    (await axios.get("https://www.worldometers.info/coronavirus/")).data
  );

  const data = $("table#main_table_countries_today")
    .children("tbody:first-of-type")
    .children("tr.row_continent")
    .map((_, row) => {
      const country = {};

      cheerio(row)
        .children("td")
        .each((index, element) => {
          element = cheerio.load(element);

          if (index > 0 && index < 10)
            country[utils.continentDataField[index]] =
              index != 1
                ? parseInt(element.text().replace(/(\n|,)/g, "")) || 0
                : element.text().replace(/(\n|,)/g, "") || "Other";
        });

      return country;
    })
    .get();

  if (sort.toLowerCase() === "name".toLowerCase())
    return data.sort((a, b) => (a.name > b.name ? 1 : -1));
  else
    return data.sort((a, b) =>
      a[sort.toLowerCase()] < b[sort.toLowerCase()] ? 1 : -1
    );
};
