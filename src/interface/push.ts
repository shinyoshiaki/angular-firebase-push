export interface pushMessage {
  notification: { body: string };
}

export interface Message {
  sender: string;
  text: string;
  time: { seconds: number };
}
