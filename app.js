const express = require("express");
const cors = require("cors");

const axios = require("axios");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/api/rates", (req, res) => {
  const { base, currency } = req.query;
  axios
    .get(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    )
    .then((response) => {
      const { data } = response;
      res.status(200)
      res.json({
        results: {
          base: data.base,
          date: data.date,
          rates: data.rates,
        },
      });
    })
    .catch((err) => {
        res.status(500)
        res.json({
            errror: err.message
        })
    });
});

app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});
