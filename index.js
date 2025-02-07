require("dotenv").config();

const express = require("express"); //Funcionalidad para los controladores
const morgan = require("morgan"); //Peticiones e info a la API, como el HHTPIE
const cors = require("cors"); //Quien accede a la api
const app = express();
const { mongoose } = require("./database"); //Ayuda a la gestion y creación de la base de datos
const { json } = require("express");

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/movies", require("./routes/movie.route"));
app.use("/", (req, res) => res.send("Api is in /api/v1/movies"));

//Settings
app.set("port", process.env.PORT || 3000);

//Iniciar el Server
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
