const express = require('express');
const router = express.Router();
const Postcode = require('../models/postcode_collection');
const http = require('http');
const request = require('request');

//Routes for Environment details

/** POST ENV COLLECTION**/
router.post('/postcode_add', (req, res, next) => {
  let newPostCodeAdd  = new Postcode({
    postcode: req.body.postcode,
    add_type: req.body.add_type,
    add_name: req.body.add_name,
    duration: req.body.duration
  });

  Postcode.saveAdd(newPostCodeAdd, (err, newPostCodeAdd)=> {
    if(err) { res.json({success: false, msg : err}); }
    else { res.json({success: true, msg : newPostCodeAdd}); }
  })
})

router.get('/postcode_add', (req, res) => {
  Postcode.find((err, postcodeadd) => {
    if(err) { res.json({success: false, msg : err}); }
    else {  res.json({success: true, msg : postcodeadd});}
  })
})

router.get('/postcode_add/:postcode', (req, res) => {
  Postcode.getItemByPostcode(req.params.postcode, (err, addItems) => {
      if(err) { res.json({success: false, msg : err}); }
      else {

        if(addItems == null){
            addItems = [];
            addItems.push({
              "postcode": "2145",
              "add_type": "Scroll",
              "add_name": "Innowiz",
              "duration": "100",
            })
        }
        res.json({success: true, msg : addItems});
      }
  });
})

/** POST ENV COLLECTION**/
router.put('/postcode_add/:id', (req, res, next) => {
  let query = {_id: req.params.id};
  req.body.modified_date = new Date();
  Postcode.findOneAndUpdate(query, req.body, {upsert:true}, (err, postcode) => {
    if(err) { res.json({success: false, msg : err}); }
    else {  Postcode.getPostCodeById(postcode._id, (err, postcode_collections) => {
        if(err) { res.json({success: false, msg : err}); }
        else { res.json({success: true, msg : postcode_collections}); }
      });
    }
  })
})

/** DELETE ENV COLLECTION BY ID - **/
router.delete('/postcode_add/:id', (req, res) => {
  Postcode.findByIdAndRemove(req.params.id, (err, postcode) => {
    if(err) { res.json({success: false, msg : err}); }
    else {  res.json({success: true, msg : postcode});}
  })
});

router.get('/getPostCode/:lat/:lng', (req, res)=> {
  let lat =  req.params.lat;
  let lng = req.params.lng;
  let latLng = lat +"," + lng;

  request('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latLng, function (error, response, body) {
    if(error) { res.json({success: false, msg : error}); }
    else {
      let result = JSON.parse(body);
      let addressComp = result.results[0].address_components;
      let postcode = "";
      addressComp.filter(function(obj) {
        if(obj.types == "postal_code"){
          postcode = obj.long_name;
        }
      })
      res.json({success: true, msg : postcode});}

  });
})

module.exports = router;
