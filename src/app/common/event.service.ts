import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IEvent {
  id: Number,
  name: string,
  description: string,
  startTime: string,
  endTime: string,
  userId: Number,
  location: string,
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEventsForCurrentUser(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('http://localhost:3000/getEvents');
  }
}
