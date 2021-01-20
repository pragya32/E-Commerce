const User = require("../models/user");
const order = require("../models/order");
const product = require("../models/product");
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in  db",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "not authorized user",
        });
      }
      req.profile.salt = undefined;
      req.profile.encry_password = undefined;
      req.profile.createdAt = undefined;
      req.profile.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  order
    .find({ user: req.profile.id })
    .populate("user", "id name ")
    .exec((err, order) => {
      if (err)
        return res.status(400).json({
          error: "no order in this account",
        });
      return res.json(order);
    });
};
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store in db

  User.findOneAndUpdate(
    { _id: req.profile.id },
    { $push: { purchases: purchases } },
    { new: true }, //we set this new as true becoz we are saying database to return the updated data
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
