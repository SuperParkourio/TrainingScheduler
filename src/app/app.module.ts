import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './common/auth/auth.service';
import { AuthGuard } from './common/auth/auth.guard';
import { LoginComponent } from './common/auth/login.component';
import { TokenInterceptor } from './common/auth/token.interceptor';
import { SignUpComponent } from './common/auth/sign-up.component';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { EventListComponent } from './common/event-list/event-list.component';
import { AddEventComponent } from './common/add-event/add-event.component';
import { EventInfoComponent } from './common/event-info/event-info.component';
import { NoAdminGuard } from './common/auth/no-admin.guard';
import { AddSessionComponent } from './common/add-session/add-session.component';
import { SessionListComponent } from './common/session-list/session-list.component';
import { TrainerGuard } from './common/auth/trainer.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ToDoInfoComponent,
    UserProfileComponent,
    EventListComponent,
    AddEventComponent,
    EventInfoComponent,
    AddSessionComponent,
    SessionListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    NoAdminGuard,
    TrainerGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
