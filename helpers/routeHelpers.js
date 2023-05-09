const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log("REQ BODY =>", req.body);
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  validateParams: (schema) => {
    return (req, res, next) => {
      const params = { ...req.params, ...req.query };
      const result = Joi.validate(params, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      name: Joi.string().required(),
      userType: Joi.string(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
      password: Joi.string().required(),
      gstn: Joi.string(),
      uid: Joi.number(),
    }),
    loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    userSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
      password: Joi.string(),
      dob: Joi.string().required(),
      role: Joi.string(),
      gender: Joi.string()
    }),
    queryUser: Joi.object().keys({
      role: Joi.string(),
    }),
    referalSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
      message: Joi.string(),
      referalId: Joi.string(),
      interested: Joi.string(),
    }),
    productList: Joi.object().keys({
      search: Joi.string(),
      categories: Joi.string(),
    }),
    reviewSchema: Joi.object().keys({
      rating: Joi.number().integer().min(1).max(5).required(),
      description: Joi.string().required(),
    }),
    customerAuthSchema: Joi.object().keys({
      phone: Joi.number().integer().min(1000000000).max(9999999999),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string(),
    }),
    customerloginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    }),
    changePassword: Joi.object().keys({
      oldpassword: Joi.string().required(),
      newpassword: Joi.string().required(),
    }),
    emailSchema: Joi.object().keys({
      toMail: Joi.string().email().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }),
    otpGenerate: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
    checkOtp: Joi.object().keys({
      email: Joi.string().email().required(),
      otp: Joi.string().required(),
    }),
    updateNewpassword: Joi.object().keys({
      email: Joi.string().email().required(),
      newpassword: Joi.string().required(),
      confirmpassword: Joi.any()
        .valid(Joi.ref("newpassword"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } }),
    }),
    userAddress: Joi.object().keys({
      title: Joi.string().required(),
      name: Joi.string().required(),
      address_line_1: Joi.string().required(),
      address_line_2: Joi.string().required(),
      landmark: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.number().required(),
      phone: Joi.number().required(),
    }),
    categeorySchema: Joi.object().keys({
      image: Joi.string(),
      name: Joi.string().required(),
      slug: Joi.string().required(),
    }),
    bannerSchema: Joi.object().keys({
      image: Joi.string(),
      name: Joi.string().required(),
      slug: Joi.string().required(),
    }),
    brandSchema: Joi.object().keys({
      name: Joi.string().required(),
      slug: Joi.string().required(),
      categories: Joi.array().required(),
    }),
    productSchema: Joi.object().keys({
      name: Joi.string().required(),
      slug: Joi.string().required(),
      categories: Joi.string().required(),
      images: Joi.array().items(Joi.string()).required(),
      price: Joi.number().required(),
      salePrice: Joi.number().required(),
      discount: Joi.number().min(1).max(100).required(),
      description: Joi.string().required(),
      brand: Joi.string().required(),
    }),
    stockSchema: Joi.object().keys({
      productId: Joi.string().required(),
      existingStock: Joi.number().required(),
      addedStock: Joi.number().required(),
      totalStock: Joi.number().required(),
      operation: Joi.string().required(),
      reason: Joi.string(),
    }),
    cartSchema: Joi.object().keys({
      products: Joi.array().required(),
    }),
    orderSchema: Joi.object().keys({
      amount: Joi.number().required(),
      payment_method: Joi.string().required(),
      delivery_address: Joi.object().required(),
      contact_number: Joi.number().integer().min(1000000000).max(9999999999).required(),
      subtotal: Joi.number().required(),
      discount: Joi.number().required(),
      delivery_fee: Joi.number().required(),
      status: Joi.string().required(),
      products: Joi.array().items({
        product: Joi.string().required(),
        name: Joi.string().required(),
        count: Joi.number().required(),
        image: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        units: Joi.string().required(),
      }),
      deliveryDate: Joi.string().required(),
      deliveryTime: Joi.string().required(),
      payment_details: Joi.object().required(),
    }),
    orderAssignSchema: Joi.object().keys({
      assignedTo: Joi.string().required(),
      date: Joi.string().required(),
    }),
    orderReturnSchema: Joi.object().keys({
      assignedTo: Joi.string().required(),
      date: Joi.string().required(),
    }),
  },
};
