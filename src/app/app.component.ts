import { Component, OnInit } from "@angular/core";
import { PushPermissionService } from "./services/push-permission.service";
import { MatSnackBar } from "@angular/material";
import { push } from "../interface/push";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-push";
  message: any;
  constructor(
    private pushService: PushPermissionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.pushService.getPermission();
    this.pushService.receiveMessage();
    this.message = this.pushService.currentMessage;

    this.pushService.currentMessage.subscribe((msg: push) => {
      console.log({ msg });
      if (msg) {
        const { sender, text } = msg.notification.body;
        this.snackBar.open(`message "${text}" from ${sender}`, "close", {
          duration: 2000
        });
      }
    });
  }
}
