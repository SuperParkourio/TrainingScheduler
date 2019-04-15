import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './common/auth/login.component';
import { SignUpComponent } from './common/auth/sign-up.component';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { EventListComponent } from './common/event-list/event-list.component';
import { AddEventComponent } from './common/add-event/add-event.component';
import { EventInfoComponent } from './common/event-info/event-info.component';
import { AuthGuard } from './common/auth/auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'to-do', component: ToDoInfoComponent },
  { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'event-list', canActivate: [AuthGuard], component: EventListComponent },
  { path: 'add-event', canActivate: [AuthGuard], component: AddEventComponent },
  { path: 'event-info/:eventId', canActivate: [AuthGuard], component: EventInfoComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
