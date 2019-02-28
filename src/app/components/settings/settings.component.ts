import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  uid: string;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe(async u => {
      if (!u || !u.uid) {
      } else {
        this.uid = u.uid;
      }
    });
  }

  ngOnInit() {}

  async logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(["login"]);
  }
}
