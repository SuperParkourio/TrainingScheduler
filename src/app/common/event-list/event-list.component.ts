import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService, IEvent } from '../event.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  searchForm = new FormGroup({
    query: new FormControl('')
  });

  events: IEvent[];
  query = '';

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvents();
    this.searchForm.controls.query.valueChanges.pipe(debounceTime(350)).subscribe(
      (value) => {
        // console.log(value);
        this.query = value;
        this.getEvents();
      }
    )
  }

  getEvents() {
    this.eventService.getEventsForCurrentUser(this.query).subscribe(
      (events) => {
        // console.log(events);
        this.events = events;
      }
    );
  }
}
