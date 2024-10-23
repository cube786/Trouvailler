const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: [
      "https://trouvailler.com","https://www.trouvailler.com", "https://admin.trouvailler.com", "http://localhost:3000", "http://localhost:3001", "https://test.trouvailler.com"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


const packagelocationsRoutes = require('./routes/packageLocations')
const packageRoutes = require('./routes/packageRoutes')
const AdminRoutes = require('./routes/AdminRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const CategoryItemRoutes = require('./routes/CategoryItemRoutes')

const ReviewRoutes = require('./routes/ReviewRoutes')
const PopularPlacesRoutes = require('./routes/PopularPlacesRoutes')
const userRoutes = require('./routes/UseRoutes')

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8000, () => {
      console.log("server is up");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });


  app.use('/api/packagelocations',packagelocationsRoutes)
  app.use('/api/package',packageRoutes)
  app.use('/api/admin/auth',AdminRoutes)
  app.use('/api/category', CategoryRoutes)
  app.use('/api/categoryItem', CategoryItemRoutes)

  app.use('/api/reviews', ReviewRoutes)
  app.use('/api/popularplaces', PopularPlacesRoutes)
  app.use('/api/user', userRoutes)
