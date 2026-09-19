/* One shared <audio> element. The intro splash starts it (inside the
   click handler, so the browser treats it as a real user gesture and
   allows autoplay); the floating player takes over control of that same
   element afterward instead of creating a second, out-of-sync one. */
export const audioEl = typeof Audio !== "undefined" ? new Audio() : null;
if (audioEl) {
  audioEl.preload = "metadata";
  audioEl.loop = true;
}
