import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateCoachPageComponent } from './pages/create-coach-page/create-coach-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'create-coach',
    component: CreateCoachPageComponent,
  },
];
