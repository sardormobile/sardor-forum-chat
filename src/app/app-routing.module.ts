import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { CommentComponent } from './pages/comment/comment.component';
import { HomeRouterComponent } from './pages/routers/home-router/home-router.component';
import { AuthRouterComponent } from './pages/routers/auth-router/auth-router.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: "posts/:postId",
    component: CommentComponent
  },
  {
    path: "",
    component: HomeRouterComponent, children: [
        {
          path: '',
          component: HomeComponent,
          pathMatch: 'full'
        },
        {
          path: 'home/*',
          component: HomeComponent,
          pathMatch: 'full'
        },
        {
          path: 'home/:pageArg',
          component: HomeComponent
        },
        /* {
          path: 'home/:pageArg',
          component: NavbarPagesComponent
        }, */
    ]
  },
  {
    path: "register", component: AuthRouterComponent, children: [
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
