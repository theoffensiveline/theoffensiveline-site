// Adds matchers like .toBeInTheDocument() used by LeagueWeeklyRecap tests.
import "@testing-library/jest-dom";

// Jest runs in jsdom, which lacks several web globals that firebase (via
// undici) needs at import time. Node has native implementations of all of
// them — copy them onto the jsdom global.
const { TextEncoder, TextDecoder } = require("util");
const { ReadableStream, WritableStream, TransformStream } = require("stream/web");
const { MessageChannel, MessagePort } = require("worker_threads");
const { Blob } = require("buffer");

// jsdom has no matchMedia; ThemeContext calls it for prefers-color-scheme.
if (typeof window !== "undefined" && typeof window.matchMedia === "undefined") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

for (const [name, impl] of Object.entries({
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
  MessageChannel,
  MessagePort,
  Blob,
})) {
  if (typeof global[name] === "undefined") {
    global[name] = impl;
  }
}
