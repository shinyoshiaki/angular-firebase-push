// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "16031298346"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log("serviceworker recieved", payload);

  const notificationTitle = "notification";
  const { sender, text } = JSON.parse(payload.notification.body);
  const notificationOptions = {
    body: `message "${text}" from ${sender}`,
    icon: payload.notification.icon
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("install", function(event) {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function(event) {
  console.log("Service Worker activating.");
});
