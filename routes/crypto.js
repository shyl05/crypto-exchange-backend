var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET top 100 cryto types */
router.get('/allTypes', function(req, res, next) {
  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x-cg-pro-api-key=${process.env.XCGPROAPIKEY}`)
  .then((result) => {
    if(result?.data[0].name){
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

/* POST exchange cryto*/
router.post('/exchange', function(req, res, next) {
  const body = req.body;
  axios.get(`https://api.coingecko.com/api/v3/coins/${body.id}?x-cg-pro-api-key=${process.env.XCGPROAPIKEY}`)
  .then((result) => {
    let resultData = result.data.market_data.current_price[body.amountType]; 
    res.json({exchangeValue: resultData});
  })
  .catch((err)=>{
    console.log(err);
    res.json(err);
  })
});

module.exports = router;

