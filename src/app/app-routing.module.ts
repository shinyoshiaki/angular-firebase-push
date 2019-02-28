import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/pages/login/login.component";
import { MainComponent } from "./components/pages/main/main.component";
import { UserListComponent } from "./components/pages/user-list/user-list.component";
import { ChatComponent } from "./components/pages/chat/chat.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "list", component: UserListComponent },
  { path: "chat", component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
