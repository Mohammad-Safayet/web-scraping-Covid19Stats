const express = require("express");

const scrapper = require("./scrapper");

const router = express.Router();

router.get("/countries", async (req, res, _) => {
  const countries = await scrapper.getTheCountries(req.query.sort || "name");

  res.status(200).json({ total: countries.length, countries: countries });
});

router.get("/countries/:name", async (req, res, _) => {
  const { name } = req.params;
  const countries = await scrapper.getTheCountries("name");

  const country = countries.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (country == null) res.status(404).json({ message: "Not found" });
  else res.status(200).json({ country: country });
});

router.get("/continents", async (req, res, _) => {
  const continents = await scrapper.getTheContinents(req.query.sort || "name");
  
  res.status(200).json({ total: continents.length, continents: continents });
});

router.get("/continents/:name", async (req, res, _) => {
  const { name } = req.params;
  const continents = await scrapper.getTheContinents(req.query.sort || "name");
  let countries = await scrapper.getTheCountries("name");

  const continent = continents.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (continent != null)
    countries = countries.filter(
      (item) => item.continent.toLowerCase() === name.toLowerCase()
    );

  if (continent == null) res.status(404).json({ message: "Not found" });
  else {
    const {
      name,
      cases,
      newCases,
      deaths,
      newDeaths,
      recovered,
      newRecovered,
      activeCases,
      seriousCases,
    } = continent;
    res.status(200).json({
      name: name,
      cases: cases,
      newCases: newCases,
      deaths: deaths,
      newDeaths: newDeaths,
      recovered: recovered,
      activeCases: activeCases,
      seriousCases: seriousCases,
      totalCountries: countries.length,
      countries: countries,
    });
  }
});

router.get("/all", async (req, res, _) => {
  const countries = await scrapper.getTheCountries("", true);

  res.status(200).json({ total: countries.length || 1, countries: countries });
});

module.exports = router;
