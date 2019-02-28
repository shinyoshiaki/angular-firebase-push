import { Component, OnInit } from "@angular/core";
import { Message } from "../../../../interface/push";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent implements OnInit {
  message: Message = {
    sender: Math.random().toString(),
    text: "text",
    time: { seconds: 1551347099 }
  };
  self = true;

  constructor() {}

  ngOnInit() {}
}
