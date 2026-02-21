const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
  });

// Rutas
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
