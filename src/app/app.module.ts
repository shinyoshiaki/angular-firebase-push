import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { AngularFirestore } from "@angular/fire/firestore";
import { ChatComponent } from "./components/chat/chat.component";
import { PushPermissionService } from "./services/push-permission.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AsyncPipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    AngularFireMessagingModule
  ],
  providers: [AngularFirestore, PushPermissionService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
