const jwt = require('jsonwebtoken')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 80

app.get('/', (req, res) => {
  
  let queryPayloadToken = req.query.token

  console.log(typeof queryPayloadToken !== "undefined")

  if(typeof headerPayloadToken !== "undefined") {
    let decodeToken = JSON.parse(Buffer.from(headerPayloadToken, 'base64').toString('ascii'))
    console.log("decodeToken ==> " + decodeToken)

    let name = decodeToken["givenName"]
    let email = decodeToken["email"]

    res.send('Welcome ' + name + '!\n' + 'Your email is: ' + email)
    
  } else {
    res.send('Oops!!!\n404 - PAGE NOT FOUND')
  }
})

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to this API service"
  })
})

app.post("/api/posts", verifyToken, (req, res) => {

  console.log("Reading Payload")
  console.log("************************************")
  let decodeToken = JSON.parse(Buffer.from(req.token, 'base64').toString('ascii'))

  let name = decodeToken["givenName"]
  let user = decodeToken["usertype"]
  let sn = decodeToken["sn"]
  let email = decodeToken["email"]
  let sub = decodeToken["sub"]

  res.json({
    name: name,
    user: user,
    sn: sn,
    email: email,
    sub: sub
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