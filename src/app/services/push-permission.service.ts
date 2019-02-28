import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import * as firebase from "firebase/app";
import "firebase/messaging";

@Injectable({
  providedIn: "root"
})
export class PushPermissionService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  updateToken(token: any) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.db
        .collection("fcmTokens")
        .doc(user.uid)
        .set({ token });
    });
  }

  async getPermission() {
    const sw = await navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .catch(error => console.log("sw", error));
    if (!sw) return undefined;
    console.log({ sw });
    this.messaging.useServiceWorker(sw);
    this.messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        return this.messaging.getToken();
      })
      .then(token => {
        console.log("This ia a token", token);
        this.updateToken(token);
      })
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload);
    });
  }
}
