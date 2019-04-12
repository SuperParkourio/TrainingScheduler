import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IEvent {
  id: number,
  name: string,
  description: string,
  startTime: string,
  endTime: string,
  userId: number,
  location: string,
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEventsForCurrentUser(query = ''): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('http://localhost:3000/getEvents' + (query ? '?name=' + query : ''));
  }

  createEventForCurrentUser(eventInfo:any): Observable<any> {
    return this.http.post('http://localhost:3000/events', eventInfo);
  }

  getEventWithId(eventId: number): Observable<IEvent> {
    return this.http.get<IEvent>('http://localhost:3000/events?id=' + eventId);
  }

  updateEventInfo(eventId: number, event: IEvent): Observable<any> {
    return this.http.put('http://localhost:3000/events?id=' + eventId, event);
  }
}
