const mongoose = require('mongoose');
const dns = require('dns');

// Ensure Node uses reliable DNS servers for SRV lookups used by mongodb+srv.
// Some local routers/ISP DNS servers reject SRV queries and cause ECONNREFUSED.
// Setting public DNS servers (Google) here reduces that risk.
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // non-fatal — keep default if this failsj
}

// Connect with retry/backoff. This helps with transient DNS/network issues
// (like temporary ECONNREFUSED when resolving SRV records).
const connectDB = async (retries = 5, delayMs = 2000) => {
    const uri = process.env.MONGO_URI;
    const options = {
        // Keep a short server selection timeout so our retry loop can react
        serverSelectionTimeoutMS: 5000,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`🔌 Intentando conectar a MongoDB (intento ${attempt}/${retries})`);
            await mongoose.connect(uri, options);
            console.log('✅ MongoDB Conectado');
            return;
        } catch (error) {
            // Log useful error pieces but avoid leaking credentials
            console.error(`❌ Error de conexión (intento ${attempt}):`, error && error.message ? error.message : error);

            if (attempt < retries) {
                const wait = delayMs * attempt; // simple backoff
                console.log(`⏳ Reintentando en ${wait}ms...`);
                await new Promise((res) => setTimeout(res, wait));
            } else {
                console.error('❌ No se pudo conectar a MongoDB después de varios intentos.');
                process.exit(1);
            }
        }
    }
};

module.exports = connectDB;
