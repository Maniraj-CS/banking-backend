import express from "express"
import cookieParser from "cookie-parser" // for store cookies in request object in browser
import cors from "cors"

/**
 * - Required Routes
 */
import userRouter from "./routes/user.routes.js"
import accountRouter from "./routes/account.routes.js"
import transactionRouter from "./routes/transaction.routes.js"


const app = express()

const ALLOWED_ORIGINS = new Set(
  (process.env.CORS_ORIGINS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
);

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    // Postman/curl me Origin header nahi hota -> allow
    if (!origin) return cb(null, true);

    // sirf allowlist wale origins allow
    if (ALLOWED_ORIGINS.has(origin)) return cb(null, true);

    // baki sab block
    return cb(null, false);
  },

  credentials: true, // cookies/auth ke liye important
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Idempotency-Key", "X-CSRF-Token"],
  maxAge: 600, // preflight cache 10 min
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // preflight support
app.use(express.json())
app.use(cookieParser())

/**
 * - Use Routes
 */
app.use("/api/v1/auth" , userRouter )
app.use("/api/v1/account" , accountRouter )
app.use("/api/v1/transaction" , transactionRouter)

export default app