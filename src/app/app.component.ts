import { Component, OnInit } from "@angular/core";
import { PushPermissionService } from "./services/push-permission.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-push";
  message: any;
  constructor(private pushService: PushPermissionService) {}

  ngOnInit() {
    this.pushService.getPermission();
    this.pushService.receiveMessage();
    this.message = this.pushService.currentMessage;
  }
}
