"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
assert.ok(!html.includes("user-scalable=no"), "Browser zoom must remain available");
assert.ok(html.includes('<a class="skip-link" href="#main">'), "Skip link is present");
assert.ok(html.includes('<main id="main">'), "Main landmark is present");
assert.ok(html.includes('<link rel="icon" href="/favicon.svg" type="image/svg+xml">'), "Favicon is linked");
assert.ok(html.includes('content="https://freeman-ipumbu.pages.dev/social-preview.png"'), "Social preview uses the production origin");
assert.ok(html.includes('<meta property="og:image:width" content="1200">'));
assert.ok(html.includes('<meta property="og:image:height" content="630">'));
assert.ok(html.includes('<meta name="twitter:image:alt"'));
assert.ok(html.includes('type="application/ld+json"'), "Person structured data is present");
assert.ok(!/\son(?:click|error|load)=/i.test(html), "No inline event handlers");

const cards = [...html.matchAll(/<article class="build-card/g)].length;
assert.equal(cards, 15, "Selected build count changed; update the portfolio metric and test intentionally");
assert.ok(html.includes('<strong>15</strong><span>SELECTED BUILDS</span>'), "Hero build metric matches the cards");

for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
  const value = match[1];
  if (/^(?:https?:|mailto:|tel:|\/)/.test(value)) continue;
  if (/[+'`]/.test(value)) continue; // Runtime-generated markup is verified by its source data.
  assert.ok(fs.existsSync(path.join(root, value)), `Missing local asset: ${value}`);
}

const image = fs.readFileSync(path.join(root, "social-preview.png"));
assert.deepEqual([...image.subarray(0, 8)], [137,80,78,71,13,10,26,10], "Social preview must be PNG");
assert.equal(image.readUInt32BE(16), 1200, "Social preview width");
assert.equal(image.readUInt32BE(20), 630, "Social preview height");

console.log("PASS: portfolio metadata, accessibility landmarks, asset references, build count and social image.");
