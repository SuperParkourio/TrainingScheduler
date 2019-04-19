import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './auth/auth.service';

export interface IEvent {
  id: number,
  name: string,
  description: string,
  startTime: string,
  endTime: string,
  userId: number,
  location: string,
}

export interface ISession {
  id: number,
  name: string,
  location: string,
  startTime: string,
  endTime: string,
  description: string,
  trainerId: number,
  User?: IUser,
  eventId: IEvent
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

  createEventForCurrentUser(eventInfo: any): Observable<any> {
    return this.http.post('http://localhost:3000/events', eventInfo);
  }

  getEventWithId(eventId: number): Observable<IEvent> {
    return this.http.get<IEvent>('http://localhost:3000/events?id=' + eventId);
  }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('http://localhost:3000/events');
  }

  updateEventInfo(eventId: number, event: IEvent): Observable<any> {
    return this.http.put('http://localhost:3000/events?id=' + eventId, event);
  }

  createSessionForCurrentUser(session: ISession): Observable<ISession> {
    return this.http.post<ISession>('http://localhost:3000/sessions', session);
  }

  getSessions(query = ''): Observable<ISession[]> {
    return this.http.get<ISession[]>('http://localhost:3000/sessions' + (query ? '?name=' + query : ''));
  }

  getSessionsWithTrainerInfo(eventId: number): Observable<ISession[]> {
    return this.http.get<ISession[]>('http://localhost:3000/getSessionsWithTrainerInfo?eventId=' + eventId);
  }

  getSessionWithId(id: number): Observable<ISession> {
    return this.http.get<ISession>('http://localhost:3000/sessions?id=' + id);
  }

  updateSessionInfo(sessionId: number, session: ISession): Observable<ISession> {
    return this.http.put<ISession>('http://localhost:3000/sessions?id=' + sessionId, session);
  }

  getEventsWithNameAndTrainer(queryName: string, queryTrainerId: number): Observable<IEvent[]> {
    console.log('http://localhost:3000/getEventsUpcoming'
    + (queryName ? '?name=' + queryName : '') + (queryTrainerId ? '?trainerId=' + queryTrainerId : ''));
    return this.http.get<IEvent[]>('http://localhost:3000/getEventsUpcoming'
      + (queryName ? '?name=' + queryName : '') + (queryTrainerId ? '?trainerId=' + queryTrainerId : ''));
  }
}
