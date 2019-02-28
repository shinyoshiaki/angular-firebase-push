import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import "firebase/firestore";
import { Message } from "../../interface/push";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  uid: string;
  collection: AngularFirestoreCollection;

  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe(async u => {
      if (u && u.uid) {
        this.uid = u.uid;
      }
    });
    this.collection = this.db.collection("chat");
  }

  sendMessage(target: string, text: string) {
    if (this.uid) {
      const id = this.db.createId();
      const sender = this.uid;
      const time = firebase.firestore.FieldValue.serverTimestamp();
      this.collection
        .doc(target)
        .collection(this.uid)
        .doc(id)
        .set({ text, sender, time });
    }
  }

  listenMyMessage(target: string) {
    return this.collection
      .doc(target)
      .collection<Message>(this.uid)
      .valueChanges();
  }

  listenTargetMessage(target: string) {
    return this.collection
      .doc(this.uid)
      .collection<Message>(target)
      .valueChanges();
  }
}
