var express = require('express');

var burgers = require("../models/burger.js");


var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burgers.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//Adding new burger to db.
router.post("/api/burgers", function (req, res) {
  // console.log("hhhhheeeeeyyyyyy", req.body.burger_name)
  burgers.insertOne([
    "burger_name", "devoured"
  ], [
      req.body.burger_name, req.body.devoured
    ], function (result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  //updating devoured row
  burgers.updateOne({
    devoured: req.body.devoured
  },
    condition, function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  
  burgers.deleteOne(condition, function (data) {
    res.json(data);
  });

});





module.exports = router;