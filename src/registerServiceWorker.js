import { Workbox } from "workbox-window";

let wb;

if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);

  // Assuming the user accepted the update, the listener
  // will reload the page as soon as the previously waiting
  // service worker is activated and has taken control.
  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  wb.addEventListener('activated', (event) => {
  if (!event.isUpdate) {
    // notify the user the very first time that service worker is active
    console.log('Service worker activated for the first time!');
  }
});
  // Register the service worker after event listeners have been added.
  wb.register();
} else {
  wb = null;
}

export default wb;