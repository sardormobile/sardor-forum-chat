import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ChatItemComponent } from './pages/chat-item/chat-item.component';
import { HomeService } from './services/home.service';
import { SigninComponent } from './pages/signin/signin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './pages/comment/comment.component';
import { CommentItemComponent } from './pages/comment-item/comment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ChatItemComponent,
    SigninComponent,
    CommentComponent,
    CommentItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,/* ngModel */
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    HomeService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
