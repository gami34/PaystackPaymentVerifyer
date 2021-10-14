"use strict";
const https = require("https");
const PayStack = require("paystack-node");
const config = require("../../config");
const User = require("../../models/users.model");

const verifyReference = async (newReference) => {

  console.log("verification got called 1")


  // get the customer in smsNotification with the customersid
  return new Promise(function (resolve, reject) {

    let options = {
      method: "GET",
      port: 443,
      hostname: "api.paystack.co",
      path: `/transaction/verify/${newReference}`,
      headers: {
        Authorization: "Bearer " + config.paystack.api_key,
        "Content-Type": "application/json",
      },
      maxRedirects: 20,
    };

    let req = https.request(options, function (res) {
      let chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        let body = Buffer.concat(chunks);

        // convert to object
        let b = Buffer.from(body);
        let s = b.toString("utf-8");
        let o = JSON.parse(s);

        console.log(o);

        if (o.status) {
          resolve(o.data);
        } else {
          reject(false);
        }
      });
      res.on("error", function (error) {
        reject("internal server error")
      });
    });

    req.end()
  })
}

const increaseAccount = (username, amount) => {
  console.log(username, amount)
  User.findOneAndUpdate({ username: username }, {
    $inc: {
      account: parseInt(amount),
    }
  }).exec();
}

const increaseBonusCount = (username) => {
  User.findOneAndUpdate({ username: username }, {
    $inc: {
      bonusCount: 1,
    }
  }).exec();
}

exports.verify = async (req, res, next) => {
  // get customer reference value
  const { reference } = req.params;

  //  verify from paystack
  await verifyReference(reference).then(async transactionData => {

    //increase customer account
    await increaseAccount(req.user.username, transactionData.amount * 0.01);
    //increment bonus count
    await increaseBonusCount(req.user.username)

    // check if customer deserves a bonus
    if (req.user?.bonusCount > 0 && req.user?.bonusCount % 4 == 0) {
      // increase the account balance for customer..
      await increaseAccount(req.user.username, transactionData.amount * 0.1 * 0.01); // int data type: amount
    }

    // fetch updated value
    User.findOne({ username: req.user?.username }, (err, updatedUser) => {
      if (err) {
        return res.status(501).json({ status: false, message: "internal server error" })
      }
      return res.status(200).json({ status: true, message: "successfully registered", user: updatedUser });
    })

  }).catch(error => {
    res.status(401).json({ status: false, message: "Transaction reference not found", error: error.message })
  });
};






