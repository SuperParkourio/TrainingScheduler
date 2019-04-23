import { Component, OnInit } from '@angular/core';
import { IEvent, EventService } from '../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.less']
})
export class AddSessionComponent implements OnInit {

  addSessionForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    location: new FormControl(),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(),
    description: new FormControl(),
    eventId: new FormControl(null, Validators.required),
  });
  isCorrectUser = true;
  events: IEvent[];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      (events) => {
        this.events = events;
      }
    );
    const id = this.activeRoute.snapshot.paramMap.get('sessionId');
    if (id && id != 'add') {
      this.eventService.getSessionWithId(parseInt(id)).subscribe(
        (session) => {
          // console.log(session);
          this.addSessionForm.patchValue(session);
          this.authService.getCurrentUser().subscribe(
            (user) => {
              this.isCorrectUser = session.trainerId == user.id;
              if (!this.isCorrectUser) {
                this.addSessionForm.disable();
              }
            }
          );
        },
        (error) => {
          console.log('Failed to get info for session with id=' + id);
        }
      );
    }
  }

  save(): void {
    const id = this.activeRoute.snapshot.paramMap.get('sessionId');
    if (!this.addSessionForm.controls.name.errors
      && !this.addSessionForm.controls.startTime.errors
      && !this.addSessionForm.controls.eventId.errors) {
      if (!id || id == 'add') {
        this.eventService.createSessionForCurrentUser(this.addSessionForm.value).subscribe(
          (session) => this.router.navigateByUrl('/sessions'),
          (error) => console.log('could not create session')
        );
      } else {
        this.eventService.updateSessionInfo(parseInt(id), this.addSessionForm.value).subscribe(
          (session) => this.router.navigateByUrl('/sessions'),
          (error) => console.log('could not update session')
        );
      }
      // console.log(this.addSessionForm.value);
    } else {
      console.log('Broken form, missing information');
    }
  }
}
