const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

function makeElement() {
  const listeners = {};
  const attributes = {};
  const classes = new Set();
  return {
    listeners,
    attributes,
    classList: {
      contains(name) { return classes.has(name); },
      toggle(name, force) {
        const add = force === undefined ? !classes.has(name) : force;
        if (add) classes.add(name); else classes.delete(name);
        return add;
      }
    },
    addEventListener(name, fn) { listeners[name] = fn; },
    setAttribute(name, value) { attributes[name] = value; }
  };
}

function setup(withForm = false) {
  const nav = makeElement();
  const button = makeElement();
  const form = makeElement();
  form.reportValidity = () => true;
  const feedback = { textContent: "" };
  const fields = {
    name: { value: " Ada Lovelace " },
    email: { value: " ada@example.com " },
    message: { value: " Hello & thank you! " }
  };
  const document = {
    listeners: {},
    querySelector(selector) {
      return selector === ".nav ul" ? nav : selector === ".menu-toggle" ? button : null;
    },
    getElementById(id) {
      if (id === "contactForm") return withForm ? form : null;
      if (id === "contactFeedback") return feedback;
      return fields[id] || null;
    },
    addEventListener(name, fn) { this.listeners[name] = fn; }
  };
  const window = { location: { href: "" } };
  vm.runInNewContext(source, { window, document });
  document.listeners.DOMContentLoaded();
  return { window, document, nav, button, form, feedback, fields };
}

test("script.js is executable JavaScript and defines the menu handler", () => {
  const app = setup();
  assert.equal(typeof app.window.toggleMenu, "function");
});

test("mobile menu opens and closes with accessible state", () => {
  const app = setup();
  app.window.toggleMenu();
  assert.equal(app.nav.classList.contains("show"), true);
  assert.equal(app.button.attributes["aria-expanded"], "true");
  assert.equal(app.button.attributes["aria-label"], "Close menu");
  app.window.toggleMenu();
  assert.equal(app.nav.classList.contains("show"), false);
  assert.equal(app.button.attributes["aria-expanded"], "false");
});

test("Escape and navigation link selection close the mobile menu", () => {
  const app = setup();
  app.window.toggleMenu();
  app.document.listeners.keydown({ key: "Escape" });
  assert.equal(app.nav.classList.contains("show"), false);
  app.window.toggleMenu();
  app.nav.listeners.click({ target: { closest: () => ({}) } });
  assert.equal(app.nav.classList.contains("show"), false);
});

test("contact form prepares an encoded email draft without claiming it was sent", () => {
  const app = setup(true);
  let prevented = false;
  app.form.listeners.submit({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(app.window.location.href, /^mailto:pakizegurel@hotmail\.com\?/);
  assert.match(app.window.location.href, /Ada%20Lovelace/);
  assert.match(app.window.location.href, /Hello%20%26%20thank%20you!/);
  assert.match(app.feedback.textContent, /not been sent automatically/);
});

test("invalid contact form does not open an email draft", () => {
  const app = setup(true);
  app.form.reportValidity = () => false;
  app.form.listeners.submit({ preventDefault() {} });
  assert.equal(app.window.location.href, "");
});

test("blank required values do not open an email draft", () => {
  const app = setup(true);
  app.fields.message.value = "   ";
  app.form.listeners.submit({ preventDefault() {} });
  assert.equal(app.window.location.href, "");
  assert.match(app.feedback.textContent, /complete all fields/);
});
