const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone: Number,
    role: String,
    password: String,
    dob: String,
    gender: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    //check if the admin has been modified to know if the password has already been hashed
    if (!user.isModified("password")) {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    console.log("Password =>", this.password);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("exited");
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update.password) {
    return next();
  }
  this._update.password = bcrypt.hashSync(this._update.password, 10);
  next();
});
userSchema.methods.isValidPassword = async function (newPassword) {
  console.log(newPassword, this.password);
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const Users = mongoose.model("users", userSchema, "users");

// Export the model
module.exports = Users;
