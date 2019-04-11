import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  searchForm = new FormGroup({
    query: new FormControl('')
  });

  events = ['a','b','c'];
  query = '';

  constructor(
    private eventService: EventService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
