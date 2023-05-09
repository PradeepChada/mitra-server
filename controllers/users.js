const JWT = require("jsonwebtoken");
const Users = require("../models/users");
const { JWT_SECRET } = require("../configuration");

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "mitra-society",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  createUser: async (req, res, next) => {
    const { email, phone } = req.body;
    let foundUser = await Users.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone }],
    });
    if (foundUser) {
      return res.status(400).json({
        message: `${foundUser.role || 'user'} already exists with the ${
          foundUser.email === email ? "Email" : "Phone number"
        }`,
      });
    }
    const cusObj = {
      ...req.body,
      password: req.body.dob,
      createdBy: req.user?._id,
    };
    const newUsers = new Users(cusObj);
    await newUsers.save();
    res.status(200).json({ message: "User created successfully" });
  },

  deleteUser: async (req, res, next) => {
    Users.findOneAndDelete({ _id: req.params.id }, (err, data) => {
      if (err)
        res.status(500).json({
          message: "Sorry something went wrong! please try later...",
          error: err,
        });
      else res.json({ message: "Successfully Deleted." });
    });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
      res.status(200).json({ token });
  },

  signOut: async (req, res, next) => {
    res.clearCookie("access_token");
    res.json({ success: true });
  },

  checkAuth: async (req, res, next) => {
    const token = signToken(req.user);
    console.log("I managed to get here!");
    res.json({ token });
  },

  getUsers: async (req, res, next) => {
    Users.find({})
      .exec((err, response) => {
          res.send(response.filter(o => ({...o, password: undefined})));
        }
      );
  },

  updateProfile: async (req, res) => {
    Users.findOneAndUpdate({ _id: req.user.id }, req.body, (err, response) => {
      if (err) res.status(400).json({ message: "Error in updating user" });
      else res.json(response);
    });
  },

  updateUser: async (req, res) => {
    Users.findOneAndUpdate({ _id: req.params.id }, req.body, (err, response) => {
      if (err) res.status(400).json({ message: "Error in updating user" });
      else res.json(response);
    });
  },

  getProfile: async (req, res) => {
    console.log("USER =>", req.user);
    const profile = req.user;
    delete req.password;
    res.send(profile);
  },

  deleteUser: async (req, res) => {
    Users.findOneAndDelete({ _id: req.params.id }, function (err, response) {
      if (err) res.json({ message: "Error in deleteting product" });
      res.json(response);
    });
  },

  updateNewPassword: async (req, res) => {
    let foundUser = await Users.findOne({ email: req.body.email.toLowerCase().trim() });
    if (!foundUser) {
      return res.status(403).json({ error: "Email is not exit" });
    }
    Users.findOneAndUpdate(
      { email: req.body.email.toLowerCase().trim() },
      { password: req.body.newpassword },
      (err, response) => {
        const token = signToken(Users);
        if (err)
          res.status(400).json({ message: "Error in updating customer" });
        else res.json({ token, profile: req.user });
      }
    );
  },
};
