const Item = require('../models/item');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of books, book instances, authors and genre counts (in parallel)
    const numItems = await Item.countDocuments({}).exec();
    const allItems = await Item.find({}).exec();
  
    res.render("index", {
      title: "Inventory",
      item_count: numItems,
      item_list: allItems
    });
});

exports.index_post = asyncHandler(async (req, res, next) => {
  const obj = eval('({' + req.body.info + '})');
  console.log(obj);
  // Get details of books, book instances, authors and genre counts (in parallel)
  const numItems = await Item.countDocuments(obj).exec();
  const allItems = await Item.find(obj).exec();

  res.render("index", {
    title: "Inventory",
    item_count: numItems,
    item_list: allItems
  });
});

exports.item_create_get = (req, res, next) => {
    res.render("create_form", {
        title: "Add Item"
      });
};

exports.item_create_post = [
    // Validate and sanitize fields.
    body("room")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Room must be specified"),
    body("container")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Container must be specified."),
      body("content")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Content must be specified."),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create Author object with escaped and trimmed data
      const item = new Item({
        room: req.body.room,
        container: req.body.container,
        content: req.body.content,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("create_form", {
          title: "Add Item",
          item: item,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
  
        // Save author.
        await item.save();
        // Redirect to new author record.
        res.redirect('/');
      }
    }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
    // Get book, authors and genres for form.
    const item = await Item.findById(req.params.id).exec()
  
    if (item === null) {
      // No results.
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
  
    // Mark our selected genres as checked.
    res.render("create_form", {
      title: "Update Item",
      item: item,
    });
});

exports.item_update_post = [
    // Convert the genre to an array.
    (req, res, next) => {
      next();
    },
  
    // Validate and sanitize fields.
    body("room")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Room must be specified"),
    body("container")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Container must be specified."),
      body("content")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Content must be specified."),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      const item = new Item({
        room: req.body.room,
        container: req.body.container,
        content: req.body.content,
        _id: req.params.id,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        res.render("create_form", {
            title: "Edit Item",
            item: item,
            errors: errors.array(),
        });
        return;
      } else {
        const theitem = await Item.findByIdAndUpdate(req.params.id, item, {});
        // Redirect to book detail page.
        res.redirect('/');
      }
    }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const item = await Item.findById(req.params.id).exec();
  
    if (item === null) {
      // No results.
      res.redirect("/");
    }
  
    res.render("item_delete", {
      title: "Delete Item",
      item: item,
    });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const item = await Item.findById(req.params.id).exec();
  
    // Author has no books. Delete object and redirect to the list of authors.
    await Item.findByIdAndRemove(req.body.itemid);
    res.redirect("/");
});

