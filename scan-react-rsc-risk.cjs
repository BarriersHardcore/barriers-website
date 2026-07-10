#!/usr/bin/env node
/**
 * React RSC Vulnerability Scanner (CVE-2025-55182)
 * CommonJS version (.cjs)
 */

const fs = require("fs");
const path = require("path");

const TARGETS = [
  "react-server-dom-webpack",
  "react-server-dom-parcel",
  "react-server-dom-turbopack",
  "react-server-dom-"
];

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function scanPackageFiles() {
  console.log("\n=== Checking package.json & package-lock.json ===");

  const pkg = readJSON("package.json");
  const lock = readJSON("package-lock.json");

  if (!pkg) {
    console.log("No package.json found.");
    return;
  }

  function searchObj(obj, label) {
    if (!obj) return;
    const text = JSON.stringify(obj);
    TARGETS.forEach((t) => {
      if (text.includes(t)) {
        console.log(`⚠️ Found "${t}" in ${label}`);
      }
    });
  }

  searchObj(pkg, "package.json");
  searchObj(lock, "package-lock.json");

  console.log("Finished scanning package files.\n");
}

function scanSourceFiles(dir) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    // Skip certain directories
    if (stat.isDirectory() && !["node_modules", ".git"].includes(entry)) {
      scanSourceFiles(fullPath);
      continue;
    }

    // Scan source files
    if (stat.isFile() && /\.(js|jsx|ts|tsx|mjs|cjs)$/.test(entry)) {
      // -------------- NEW: skip this scanner file --------------
      if (entry.startsWith("scan-react-rsc-risk")) {
        continue;
      }
      // -----------------------------------------------------------

      const content = fs.readFileSync(fullPath, "utf8");

      TARGETS.forEach((t) => {
        if (content.includes(t)) {
          console.log(`⚠️ Source reference found in: ${fullPath}`);
        }
      });
    }
  }
}

console.log("\n=== React RSC Vulnerability Scanner (CVE-2025-55182) ===");

scanPackageFiles();

console.log("=== Scanning source files… ===");
scanSourceFiles(process.cwd());

console.log("\n✔ Scan completed.");
