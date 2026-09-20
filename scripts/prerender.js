// Runs after `vite build`. A crawler that doesn't execute JS (and some
// ATS/recruiter tools) hits an empty <div id="root"> on a pure client-side
// SPA — this snapshots the fully-rendered page with a headless browser and
// writes that markup back into dist/index.html. The <script> tag stays in
// place, so real visitors still get the full interactive React app; it just
// mounts on top of markup that was already readable instead of a blank div.
//
// Deliberately uses puppeteer-core (no bundled browser, so `npm install`
// never depends on a ~200MB Chromium download succeeding in a locked-down
// CI build). It finds a browser instead:
//   - on Linux CI (Vercel's build image) via @sparticuz/chromium, a binary
//     built specifically to run there
//   - locally, via whatever Chrome/Edge is already installed on the machine
// If neither is found, or anything else goes wrong, this script logs and
// exits 0 — the build must never fail because of it.
import http from "node:http";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));

const MIME = {
  ".html": "text/html; charset=UTF-8",
  ".js": "text/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".m4a": "audio/mp4",
  ".glb": "model/gltf-binary",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".json": "application/json",
};

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const filePath = join(DIST, urlPath === "/" ? "index.html" : urlPath);
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const LOCAL_BROWSER_PATHS = [
  // Windows
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  // macOS
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  // Linux desktop / other CI images that ship a system browser
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/microsoft-edge",
];

async function launchBrowser() {
  // Vercel's build runs on Linux — @sparticuz/chromium ships a binary built
  // for exactly that environment. Elsewhere (a dev machine), it won't run,
  // so this path is skipped entirely rather than attempted and failed.
  if (process.platform === "linux") {
    try {
      const { default: chromium } = await import("@sparticuz/chromium");
      const executablePath = await chromium.executablePath();
      return await puppeteer.launch({
        executablePath,
        args: chromium.args,
        headless: true,
      });
    } catch (err) {
      console.error("prerender: @sparticuz/chromium unavailable —", err.message);
    }
  }

  const localPath = LOCAL_BROWSER_PATHS.find((p) => existsSync(p));
  if (localPath) {
    return puppeteer.launch({ executablePath: localPath, headless: true });
  }

  throw new Error("no Chrome/Chromium/Edge executable found");
}

async function main() {
  const server = await startServer();
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // dismiss the intro splash so the snapshot is the real page, not the
    // "want something on while you look around" overlay. The splash types
    // its greeting out first, so the dismiss button doesn't exist right
    // away — poll for it instead of clicking immediately.
    await page
      .waitForFunction(
        () =>
          Array.from(document.querySelectorAll("button")).some((b) =>
            /just show me the site/i.test(b.textContent)
          ),
        { timeout: 5000 }
      )
      .catch(() => {});

    await page
      .evaluate(() => {
        const btn = Array.from(document.querySelectorAll("button")).find(
          (b) => /just show me the site/i.test(b.textContent)
        );
        btn?.click();
      })
      .catch(() => {});

    await new Promise((r) => setTimeout(r, 1200));

    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await writeFile(join(DIST, "index.html"), `<!doctype html>\n${html}\n`);
    console.log("prerender: wrote dist/index.html");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  // Never fail the build over this — a plain SPA index.html is still a
  // working site, just less crawlable. The build itself already succeeded.
  console.error("prerender: skipped —", err.message);
});
