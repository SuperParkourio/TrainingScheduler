import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IEvent, EventService } from '../event.service';
import { debounceTime } from 'rxjs/operators';
import { IUser, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.less']
})
export class EventSearchComponent implements OnInit {
  searchForm = new FormGroup({
    queryName: new FormControl(''),
    queryTrainerId: new FormControl(null)
  });

  events: IEvent[];
  trainers: IUser[];
  queryName = '';
  queryTrainerId: number;

  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getTrainers();
    this.getEvents();
    this.searchForm.controls.queryName.valueChanges.pipe(debounceTime(350)).subscribe(
      (value) => {
        this.queryName = value;
        this.getEvents();
      }
    );
    this.searchForm.controls.queryTrainerId.valueChanges.pipe(debounceTime(350)).subscribe(
      (value) => {
        this.queryTrainerId = value;
        this.getEvents();
      }
    );
  }

  getTrainers() {
    this.authService.getTrainers().subscribe(
      (trainers) => {
        this.trainers = trainers;
      }
    );
  }

  getEvents() {
    this.eventService.getEventsWithNameAndTrainer(this.queryName, this.queryTrainerId).subscribe(
      (events) => {
        // console.log(this.queryName + ' ' + this.queryTrainerId);
        // console.log(events);
        this.events = events;
      },
      (error) => {
        console.log('Could not get the events');
      }
    );
  }
}
