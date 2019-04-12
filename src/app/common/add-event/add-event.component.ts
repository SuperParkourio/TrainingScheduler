import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit {

  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;

  constructor(
      private eventService: EventService,
      private router: Router,
  ) { }

  ngOnInit() {}

  signUp(): void {
    const newEvent = {
      name: this.name,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      location: this.location,
    };
    
    if (newEvent.name && newEvent.startTime) {
      this.eventService.createEventForCurrentUser(newEvent).subscribe(
          (response) => this.router.navigateByUrl('/event-list')
      );
      document.getElementsByName("labelError")[0].innerText = '';
    } else {
      console.log('Broken form; not valid');
      document.getElementsByName("labelError")[0].innerText = 'Name and Start Time are required.';
    }
  }

}
