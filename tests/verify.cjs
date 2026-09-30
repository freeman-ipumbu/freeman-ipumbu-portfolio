"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
assert.ok(!html.includes("user-scalable=no"), "Browser zoom must remain available");
assert.ok(!html.includes("gesturestart','gesturechange','gestureend"), "Gesture zoom blocking must remain removed");
assert.ok(html.includes("touch-action:pan-x pan-y pinch-zoom"), "Touch zoom must remain available");
assert.ok(html.includes('<a class="skip-link" href="#main">'), "Skip link is present");
assert.ok(html.includes('<main id="main">'), "Main landmark is present");
assert.ok(html.includes('<link rel="icon" href="/favicon.svg" type="image/svg+xml">'), "Favicon is linked");
assert.ok(html.includes('content="https://freeman-ipumbu.pages.dev/social-preview.png"'), "Social preview uses the production origin");
assert.ok(html.includes('<meta property="og:image:width" content="1200">'));
assert.ok(html.includes('<meta property="og:image:height" content="630">'));
assert.ok(html.includes('<meta name="twitter:image:alt"'));
assert.ok(html.includes('type="application/ld+json"'), "Person structured data is present");
assert.ok(!/\son(?:click|error|load)=/i.test(html), "No inline event handlers");
assert.ok(html.includes("LIVE // FIELD COMMAND 2"), "Omutambo release signal is current");
assert.ok(html.includes("100 AUTOMATED CHECKS"), "Omutambo verification evidence is visible");
assert.ok(html.includes("cattle, goats, sheep, freely named livestock"), "Omutambo multi-species scope is visible");
assert.ok(html.includes("projects/magic-boys-fa-logo.png"), "Magic Boys uses the approved standalone academy crest");
assert.ok(html.includes("evidence coverage behind poultry measures"), "Omutambo evidence-coverage refresh is visible");
assert.ok(html.includes("UNIFIED 20.0 — Signal Command"), "Current UNIFIED release is visible");
assert.ok(html.includes("projects/unified-20-command-deck.png"), "UNIFIED uses current physical Command Deck proof");
assert.ok(html.includes("version code 21"), "UNIFIED version-code evidence is visible");
assert.ok(html.includes('class="build-card flagship" id="unified"'), "UNIFIED has a shareable flagship anchor");
assert.ok(html.includes("five evidence-led Smart Spaces"), "Continuum scope is visible");
assert.ok(html.includes("physical Capsule export/restore"), "UNIFIED device evidence is explicit");
assert.ok(html.includes("aggregate-only completion contract"), "Runnerz privacy boundary is explicit");
assert.ok(html.includes("FIELD TEST // RUNNERZ 1.1.0 · CODE 16"), "Runnerz release signal is current");
assert.ok(html.includes("projects/runnerz-1.1.0.png"), "Runnerz uses current controlled handset proof");
assert.ok(html.includes('class="build-card flagship runnerz-release" id="runnerz"'), "Runnerz has a shareable flagship anchor");
assert.ok(html.includes("145 TESTS PER VARIANT / 0 FAILURES"), "Runnerz automated-test evidence is visible");
assert.ok(html.includes("exact trails stay local"), "Runnerz trail privacy boundary is visible");
assert.ok(html.includes("public-store acceptance remain tracked gates"), "Runnerz store boundary is visible");
assert.ok(!html.includes('src="projects/runnerz.webp"'), "Legacy Runnerz banner is no longer referenced");
assert.ok(html.includes("PILOT READY // APPROVALS PENDING"), "RightMatch launch gate is current");
assert.ok(html.includes("final Namibian legal, insurance, registration and payment approvals"), "RightMatch external approvals remain explicit");
assert.ok(html.includes("42 valid directional journeys"), "Borizago directional route scope is current");
assert.ok(html.includes("monthly financial/customer reporting"), "Borizago reporting scope is current");
assert.ok(html.includes("borizago-staff-guide.pdf"), "Borizago staff guide is linked");
assert.ok(html.includes("projects/borizago-refined-v2.png"), "Borizago uses the local refined identity asset");
assert.ok(html.includes("ALL RIGHTS RESERVED"), "Portfolio ownership notice is visible");
assert.ok(html.includes("A DIGITAL EXPERIENCE BY SOLARSPIN TECHNOLOGIES"), "SolarSpin experience credit is visible");
assert.ok(html.includes('href="https://titos-barber.pages.dev/"'), "Tito On Call live experience is linked");
assert.ok(html.includes('href="https://github.com/freeman-ipumbu/tito-on-call-case-study"'), "Tito On Call case study is linked");
assert.ok(html.includes("projects/tito-on-call.svg"), "Tito On Call uses its launch identity artwork");
assert.ok(html.includes('href="https://pdm-namibia.pages.dev/"'), "PDM Namibia live experience is linked");
assert.ok(html.includes('href="https://github.com/freeman-ipumbu/pdm-namibia-case-study"'), "PDM Namibia case study is linked");
assert.ok(html.includes("projects/pdm-namibia-hq.png"), "PDM Namibia uses the high-resolution identity banner");
assert.ok(html.includes('href="https://namair-command.pages.dev/"'), "NamAir uses its Git-connected Pages demo");
assert.ok(html.includes('href="https://nammar.pages.dev/"'), "NamMar uses its Git-connected Pages demo");
assert.ok(!html.includes("nammar-command-centre.freeman-ipumbu634390.chatgpt.site"), "Legacy NamMar host is removed");

const cards = [...html.matchAll(/<article class="build-card/g)].length;
assert.equal(cards, 21, "Selected build count changed; update the portfolio metric and test intentionally");
assert.ok(html.includes('<strong>21</strong><span>SELECTED BUILDS</span>'), "Hero build metric matches the cards");

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

const runnerzProof = fs.readFileSync(path.join(root, "projects/runnerz-1.1.0.png"));
assert.deepEqual([...runnerzProof.subarray(0, 8)], [137,80,78,71,13,10,26,10], "Runnerz proof must be PNG");
assert.equal(runnerzProof.readUInt32BE(16), 1600, "Runnerz proof width");
assert.equal(runnerzProof.readUInt32BE(20), 900, "Runnerz proof height");

const unifiedProof = fs.readFileSync(path.join(root, "projects/unified-20-command-deck.png"));
assert.deepEqual([...unifiedProof.subarray(0, 8)], [137,80,78,71,13,10,26,10], "UNIFIED proof must be PNG");
assert.equal(unifiedProof.readUInt32BE(16), 1200, "UNIFIED proof width");
assert.equal(unifiedProof.readUInt32BE(20), 2664, "UNIFIED proof height");

console.log("PASS: portfolio metadata, accessibility landmarks, asset references, build count and social image.");
