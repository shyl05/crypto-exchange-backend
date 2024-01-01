var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET top 100 cryto types */
router.get('/allTypes', function(req, res, next) {
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x-cg-pro-api-key=CG-i6Fcc8ptbRnrTEsJR6mRP6Tq")
  .then((result) => {
    if(result.data[0].name){
      let coinTypes = result.data.map((item) => {
        return {
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
        }
      });
      res.json(coinTypes);
    } else {
      res.status(result.data.response.status).json(result.data.response.statusText)
    }
  })
  .catch((err)=>{
    console.log(err);
    res.json(err);
  })
});

/* POST top 100 cryto types */
router.post('/exchange', function(req, res, next) {
  const body = req.body;
  // axios.get(`https://api.coingecko.com/api/v3/coins/${body.id}?x-cg-pro-api-key=CG-i6Fcc8ptbRnrTEsJR6mRP6Tq`)
  // .then((result) => {
  //   let resultData = result.data.market_data.current_price[body.amountType]; 
  //   res.json({exchangeValue: resultData});
  // })
  // .catch((err)=>{
  //   console.log(err);
  //   res.json(err);
  // })
  const data = {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "market_data": {
      "current_price": {
        "aed": 156713,
        "ars": 34496423,
        "aud": 62637,
        "bch": 162.337,
        "bdt": 4695835,
        "bhd": 16124.05,
        "bmd": 42669,
        "bnb": 137.184,
        "brl": 207109,
        "btc": 1,
        "cad": 56536,
        "chf": 35918,
        "clp": 37775663,
        "cny": 302033,
        "czk": 954917,
        "dkk": 288178,
        "dot": 5116,
        "eos": 49472,
        "eth": 18.452469,
        "eur": 38612,
        "gbp": 33514,
        "gel": 114565,
        "hkd": 333678,
        "huf": 14817216,
        "idr": 656668360,
        "ils": 154445,
        "inr": 3551132,
        "jpy": 6017540,
        "krw": 55235665,
        "kwd": 13157.3,
        "lkr": 13858820,
        "ltc": 579.795,
        "mmk": 89856991,
        "mxn": 724266,
        "myr": 196062,
        "ngn": 38363325,
        "nok": 434126,
        "nzd": 67513,
        "php": 2363750,
        "pkr": 11903701,
        "pln": 168172,
        "rub": 3808129,
        "sar": 160007,
        "sek": 430455,
        "sgd": 56301,
        "thb": 1467134,
        "try": 1256557,
        "twd": 1309223,
        "uah": 1626908,
        "usd": 42669,
        "vef": 4272.4,
        "vnd": 1035564723,
        "xag": 1793.28,
        "xau": 20.65,
        "xdr": 31881,
        "xlm": 328633,
        "xrp": 68724,
        "yfi": 5.22755,
        "zar": 780629,
        "bits": 1000008,
        "link": 2795,
        "sats": 100000804
      }
    }
  };

  let resultData = data.market_data.current_price[body.amountType]; 
  res.json({exchangeValue: resultData});
});

module.exports = router;

