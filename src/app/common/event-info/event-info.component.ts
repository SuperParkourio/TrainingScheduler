import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService, IEvent } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.less']
})
export class EventInfoComponent implements OnInit {

  updateEventForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    location: new FormControl(),
  });
  eventId: number;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('eventId');
    if (id !== 'add') {
      this.eventService.getEventWithId(parseInt(id)).subscribe(
        (events) => {
          console.log(events);
          this.eventId = events.id;
          this.updateEventForm.patchValue(events);
        },
        (error) => {
          console.log('Failed to get info for event with id=' + id);
        }
      );
    }
  }

  save(): void {
    console.log(this.updateEventForm.value);
    if (this.updateEventForm.value.name && this.updateEventForm.value.startTime) {
      this.eventService.updateEventInfo(this.eventId, this.updateEventForm.value).subscribe(
        (response) => this.router.navigateByUrl('/event-list')
      );
    } else {
      document.getElementsByName("labelError")[0].innerText ='Name & Start Time required';
    }
  }
}
