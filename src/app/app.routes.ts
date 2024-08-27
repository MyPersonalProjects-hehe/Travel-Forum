import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePost } from './components/posts/create.post/create.post.component';
import { FullViewPostComponent } from './components/posts/full.view.post/full.view.post.component';
import { AllPostsComponent } from './components/posts/all.posts/all.posts.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HomeUnauthenticatedComponent } from './components/home-unauthenticated/home-unauthenticated.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/home-unauthenticated']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

export const routes: Routes = [
  {
    path: 'home-unauthenticated',
    component: HomeUnauthenticatedComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'createPost',
    component: CreatePost,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'allPosts',
    component: AllPostsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'fullViewPost/:id',
    component: FullViewPostComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
