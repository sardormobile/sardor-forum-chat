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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommentComponent } from './pages/comment/comment.component';
import { CommentItemComponent } from './pages/comment-item/comment-item.component';
import { tokenInterceptor } from './helpers/token.interceptor';
import { HomeRouterComponent } from './pages/routers/home-router/home-router.component';
import { AuthRouterComponent } from './pages/routers/auth-router/auth-router.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ChatItemComponent,
    SigninComponent,
    CommentComponent,
    CommentItemComponent,
    HomeRouterComponent,
    AuthRouterComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,/* ngModel */
    HttpClientModule,
    CommonModule,
    MaterialModule,
  ],
  providers: [
    provideClientHydration(),
    HomeService,
    /* HttpClient, */
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
