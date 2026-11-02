import dotenv from "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
const PORT = Number(process.env.PORT);
async function startServer() {
    try {
        await connectDB(process.env.MONGODB_URL);
        const server = app.listen(PORT, () => {
            console.log(`App running on Port: ${PORT}`);
        });
        const shutdown = (signal) => {
            console.log(`${signal} received. Shutting down...`);
            server.close(() => process.exit(0));
        };
        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map