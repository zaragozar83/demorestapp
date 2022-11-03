const jwt = require('jsonwebtoken')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 80

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to this API service"
  })
})

app.post("/api/posts", verifyToken, (req, res) => {

  console.log("************************************")
  console.log(req.token)
  console.log("************************************")
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if(err) {
      console.log(err)
      res.sendStatus(403)
    } else{

      console.log("Reading Payload")
      let name = authData.data["givenName"]
      let user = authData.data["usertype"]
      let sn = authData.data["sn"]
      let email = authData.data["email"]
      let sub = authData.data["sub"]

      res.json({
        name: name,
        user: user,
        sn: sn,
        email: email,
        sub: sub,
      })
    }
  })
})

app.post("/api/login", (req, res) => {
  const data = {
    sub: "5a95ea08-3fb5-464b-809b-2bc929ed819f",
    bu: "11",
    givenName: "Commercial",
    usertype: "customer",
    sn: "BilltoCustomer",
    email: "Commercial-Bill-to-Customer@Dell.com",
    phone: "none",
    countryCode: "none",
    domain: "none",
    networkID: "none",
    orgId: "2023",
    language: "en",
    country: "US",
    dcn: "22332233",
    salesRepBadgeNumber: null,
    stealthMode: null,
    isTestOrg: false,
    orgType: "Direct",
    currency: "USD",
    region: "AMER",
    billingAddressId: null,
    apId: null,
    companyNumber: null,
    salesMotion: null,
    ucIdDuns: null,
    primaryBillingAddressId: null
  };

  jwt.sign({ data: data }, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
});


function verifyToken(req, res, next) {
  
  const bearerHeader = req.headers["authorization"];

  if(typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else{
    res.sendStatus(403);
  }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})