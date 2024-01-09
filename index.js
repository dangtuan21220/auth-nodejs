const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/products");
const connectDB = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hi, I am live ");
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Management System",
      version: "1.0.0",
      description:
        "Auth Management System covered Create, Read, Update, and Delete operations using a Node.js API",
    },
    servers: [{ url: "http://localhost:8000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-swagger", swaggerUi.serve, swaggerUi.setup(specs));

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
