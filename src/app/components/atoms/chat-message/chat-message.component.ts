import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../../../../interface/push";
import Identicon from "identicon.js";
import sha1 from "sha1";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.css"]
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() self: boolean;

  avatar: string;
  name: string;
  constructor() {}

  ngOnInit() {
    const avatar = new Identicon(sha1(this.message.sender), {
      margin: 0,
      size: 40
    }).toString();
    console.log("avatar", this.avatar);
    this.avatar = `data:image/png;base64,${avatar}`;
    this.name = this.self ? "me" : this.message.sender;
  }

  getTime() {
    const date = new Date();
    date.setSeconds(this.message.time.seconds);
    return date.toISOString().substr(11, 8);
  }
}
