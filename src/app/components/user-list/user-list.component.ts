import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  uid: string;
  users: string[];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(async u => {
      if (!u || !u.uid) this.router.navigate(["login"]);
      else {
        this.uid = u.uid;
        this.addList();
      }
    });
    this.db
      .collection("users")
      .snapshotChanges()
      .subscribe(
        snapshot => (this.users = snapshot.map(item => item.payload.doc.id))
      );
  }

  addList() {
    this.db
      .collection("users")
      .doc(this.uid)
      .set({ login: true });
  }

  openChat(user: string) {
    this.router.navigate(["chat"], { queryParams: { room: user } });
  }

  async logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(["login"]);
  }
}
