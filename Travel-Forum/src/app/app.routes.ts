import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard, notAuthGuard } from './services/auth.guard';
import { CreatePost } from './components/posts/create.post/create.post.component';
import { AllPostsComponent } from './components/posts/all-posts/all.posts.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'createPost',
    component: CreatePost,
    canActivate: [authGuard],
  },
  {
    path: 'allPosts',
    component: AllPostsComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
