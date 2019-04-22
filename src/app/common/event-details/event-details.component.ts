import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, ISession } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.less']
})
export class EventDetailsComponent implements OnInit {

  viewEventForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    location: new FormControl(),
  });
  sessions: ISession[];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.viewEventForm.disable();
    const id = parseInt(this.activeRoute.snapshot.paramMap.get('eventId'));
    this.eventService.getEventWithId(id).subscribe(
      (event) => {
        console.log(event);
        this.viewEventForm.patchValue(event);
        this.eventService.getSessionsWithTrainerInfo(id).subscribe(
          (sessions) => {
            this.sessions = sessions;
          }
        );
      },
      (error) => {
        console.log('Failed to get details for event with id=' + id);
      }
    );
  }
}
