import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService, ISession } from '../event.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.less']
})
export class SessionListComponent implements OnInit {

  searchForm = new FormGroup({
    query: new FormControl('')
  });

  sessions: ISession[];
  query = '';

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getSessions();
    this.searchForm.controls.query.valueChanges.pipe(debounceTime(350)).subscribe(
      (value) => {
        console.log(value);
        this.query = value;
        this.getSessions();
      }
    )
  }

  getSessions() {
    this.eventService.getSessions(this.query).subscribe(
      (sessions) => {
        console.log(sessions);
        this.sessions = sessions;
      }
    );
  }
}
