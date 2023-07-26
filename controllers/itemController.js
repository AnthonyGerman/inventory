const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of books, book instances, authors and genre counts (in parallel)
    const numItems = await Item.countDocuments({}).exec();
  
    res.render("index", {
      title: "Inventory",
      item_count: numItems,
    });
  });