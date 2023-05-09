const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var app = express();
require("dotenv").config();

const { MONGODB_CONN_STR } = require("./configuration/index");
const bodyParser = require("body-parser");

const CONN_STRING = MONGODB_CONN_STR;
console.log(MONGODB_CONN_STR);
mongoose.Promise = global.Promise;
mongoose
  .connect(CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO DB CONNECTION SUCCESSFUL"))
  .catch((error) => console.log(error));

app.disable("etag");

// const app = express();
app.use(cookieParser());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());
// app.use(express.static(__dirname + '/email_templates/images'));


// app.use('/images', express.static(__dirname+'//email_templates/images/'))

// Routes
app.use("/users", require("./routes/users"));
// app.use("/emails", require("./routes/emails"));
// app.use("/images", require("./routes/images"));
// app.use("/categories", require("./routes/categories"));
// app.use("/products", require("./routes/products"));
// app.use("/orders", require("./routes/orders"));
// app.use("/brands", require("./routes/brands"));
// app.use("/stock", require("./routes/stocks"));
// app.use("/notifications", require("./routes/notifications"));
// app.use("/cart", require("./routes/cart"));
// app.use("/banners", require("./routes/banners"));
// app.use("/payment", require("./routes/payment"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("NODE SERVER STARTED");
});
