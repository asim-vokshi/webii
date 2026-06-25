// Minimal zero-dependency static file server for the built Vite SPA.
// Serves files from ./dist, falls back to index.html for client-side routes,
// and binds to 0.0.0.0:$PORT as required by Render Web Services.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const PORT = Number(process.env.PORT) || 10000;
const HOST = "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

async function sendFile(res, filePath, statusCode = 200) {
  const data = await readFile(filePath);
  const ext = extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  // Cache hashed assets aggressively, HTML not at all.
  const cacheControl = filePath.includes(`${join("dist", "assets")}`)
    ? "public, max-age=31536000, immutable"
    : "no-cache";
  res.writeHead(statusCode, {
    "Content-Type": type,
    "Cache-Control": cacheControl,
  });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  try {
    // Strip query string and decode.
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    // Prevent path traversal.
    const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(DIST, safePath);

    try {
      const info = await stat(filePath);
      if (info.isDirectory()) filePath = join(filePath, "index.html");
      await sendFile(res, filePath);
      return;
    } catch {
      // Not a real file: serve SPA index.html (client-side routing).
      await sendFile(res, join(DIST, "index.html"), 200);
      return;
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
