import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const fcmSend = functions.firestore
  .document("chat/{hostId}/{roomId}/{messages}")
  .onCreate((snapshot, context) => {
    const articleInfo = snapshot.data();
    const body = JSON.stringify(articleInfo);
    console.log("body", body);
    const payload = {
      notification: {
        title: "test",
        body,
        clickAction: "",
        icon: ""
      }
    };
    console.log("context", context);
    if (true) {
      admin
        .firestore()
        .collection("fcmTokens")
        .doc(context.params.hostId)
        .get()
        .then(item => {
          console.log("item", item);
          const data = item.data();
          if (data) {
            const token: string = data.token as string;
            console.log("token", token);
            admin
              .messaging()
              .sendToDevice(token, payload)
              .then(res => {
                console.log("Sent Successfully", res.results, payload.notification);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
