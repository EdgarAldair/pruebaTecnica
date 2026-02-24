const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (usamos el módulo con retry/backoff)
const connectDB = require("./config/db");

// Rutas
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ No se pudo iniciar el servidor por fallo en la conexión a la base de datos.');
    process.exit(1);
  });
