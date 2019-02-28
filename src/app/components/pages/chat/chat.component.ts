import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Message, ChatService } from "../../../services/chat.service";

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
  messages: Message[];

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
            this.myMessages = messages;
            this.getMessages();
          });
        this.chat
          .listenTargetMessage(this.room)
          .subscribe((messages: Message[]) => {
            this.targetMessages = messages;
            this.getMessages();
          });
      }
    });
  }

  getMessages() {
    const messages = [this.myMessages, this.targetMessages].reduce(
      (acc, item) => acc.concat(item)
    );
    this.messages = messages;
    console.log({ messages });
  }

  send() {
    this.chat.sendMessage(this.room, this.text);
    this.text = "";
  }
}