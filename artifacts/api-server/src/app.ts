import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // frontend is served separately
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.REPLIT_DOMAINS
  ? process.env.REPLIT_DOMAINS.split(",").map((d) => `https://${d.trim()}`)
  : [];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow same-host (no origin header) or localhost in dev
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.some((o) => origin.startsWith(o)) || origin.includes("localhost")) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  }),
);

// ── Rate limiting ─────────────────────────────────────────────────────────────
// General limit for all /api routes
app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,      // 1 minute
    max: 120,                  // 120 requests/min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Shumë kërkesa. Provoni përsëri pas një minute." },
  }),
);

// Stricter limit for write operations
app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    skip: (req) => req.method === "GET" || req.method === "HEAD",
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Shumë operacione shkrimi. Provoni përsëri pas pak." },
  }),
);

// ── Body parsing (size-limited) ───────────────────────────────────────────────
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));

// ── Request logging ───────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", router);

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "CORS: origjina e palejuar." });
    return;
  }
  res.status(500).json({ error: "Gabim i brendshëm i serverit." });
});

export default app;
