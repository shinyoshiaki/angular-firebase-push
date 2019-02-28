import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatTabsModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { PushPermissionService } from "./services/push-permission.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AsyncPipe } from "@angular/common";
import { LoginComponent } from "./components/pages/login/login.component";
import { UserListComponent } from "./components/pages/user-list/user-list.component";
import { ChatComponent } from "./components/pages/chat/chat.component";
import { MainComponent } from "./components/pages/main/main.component";
import { SettingsComponent } from "./components/pages/settings/settings.component";
import { StoryComponent } from "./components/debug/story/story.component";
import { ChatMessageComponent } from "./components/atoms/chat-message/chat-message.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    ChatComponent,
    MainComponent,
    SettingsComponent,
    StoryComponent,
    ChatMessageComponent
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
    MatSnackBarModule,
    MatTabsModule,
    AngularFireMessagingModule
  ],
  providers: [AngularFirestore, PushPermissionService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
