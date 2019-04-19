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
import { NoAdminGuard } from './common/auth/no-admin.guard';
import { AddSessionComponent } from './common/add-session/add-session.component';
import { SessionListComponent } from './common/session-list/session-list.component';
import { TrainerGuard } from './common/auth/trainer.guard';
import { EventSearchComponent } from './common/event-search/event-search.component';
import { EventDetailsComponent } from './common/event-details/event-details.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'to-do', component: ToDoInfoComponent },
  { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'event-list', canActivate: [AuthGuard], component: EventListComponent },
  { path: 'add-event', canActivate: [AuthGuard, NoAdminGuard], component: AddEventComponent },
  { path: 'event-info/:eventId', canActivate: [AuthGuard], component: EventInfoComponent },
  { path: 'sessions', component: SessionListComponent},
  { path: 'sessions/add', canActivate: [AuthGuard, TrainerGuard], component: AddSessionComponent },
  { path: 'sessions/:sessionId', canActivate: [AuthGuard], component: AddSessionComponent },
  { path: 'event-search', canActivate: [AuthGuard], component: EventSearchComponent },
  { path: 'event-details/:eventId', canActivate: [AuthGuard], component: EventDetailsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
