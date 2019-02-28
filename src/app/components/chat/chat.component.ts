import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { ChatService } from "../../services/chat.service";
import { Message } from "../../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  room: string;
  text: string;
  uid: string;
  myMessages: Message[];
  targetMessages: Message[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private chat: ChatService
  ) {}

  ngOnInit() {
    this.room = this.route.snapshot.queryParamMap.get("room");
    this.angularFireAuth.authState.subscribe(async u => {
      if (!u || !u.uid) this.router.navigate(["login"]);
      else {
        this.uid = u.uid;
        this.chat
          .listenMyMessage(this.room)
          .subscribe((messages: Message[]) => {
            console.log({ messages }, "my");
            this.myMessages = messages;
          });
        this.chat
          .listenTargetMessage(this.room)
          .subscribe((messages: Message[]) => {
            console.log({ messages }, "target");
            this.targetMessages = messages;
          });
      }
    });
  }

  send() {
    this.chat.sendMessage(this.room, this.text);
    this.text = "";
  }
}
