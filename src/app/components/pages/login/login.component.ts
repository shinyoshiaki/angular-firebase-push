import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;

  email: string;
  password: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.angularFireAuth.authState;
    this.user.subscribe(u => {
      console.log({ u });
      if (u) {
        this.router.navigate(["main"]);
      }
    });
  }

  // ログアウト
  async logout() {
    this.angularFireAuth.auth.signOut();
  }

  // Google認証によるログイン
  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.auth.signInWithPopup(
      provider
    );
    console.log({ credential });
  }

  async loginAnonymously() {
    const credential = await this.angularFireAuth.auth.signInAnonymously();
    console.log({ credential });
  }

  async loginWithEmailAndPassword() {
    try {
      const credential = await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log({ credential });
    } catch (error) {
      if ((error.code = "auth/email-already-in-use")) {
        await this.angularFireAuth.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
      }
      console.log(error);
    } finally {
      this.email = "";
      this.password = "";
    }
  }

  async upgradeAnonymouosWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.auth.currentUser.linkWithPopup(
      provider
    );
    console.log({ credential });
  }
}
