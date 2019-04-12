import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';

export interface ILoginResponse {
    success: boolean;
    token?: string;
}

export interface IUser {
    id: number,
    first: string,
    last: string,
    email: string,
    phone: string,
    userRoleId: number,
    aboutMe: string,
    password: string,
}

@Injectable()
export class AuthService {

    token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private http: HttpClient,
    ) { }

    isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    login(email: string, password: string): Observable<ILoginResponse> {
        const data = {
            email: email,
            password: password,
        };
        return this.http.post<ILoginResponse>('http://localhost:3000/login', data)
            .do((response) => {
                this.token.next(response && response.success && response.token || null);
            });
    }

    logout(): void {
        this.token.next(null);
    }

    signUp(firstName: string, lastName: string, phoneNumber: string, email: string, password: string): Observable<any> {
        const data = {
            first: firstName,
            last: lastName,
            phone: phoneNumber,
            email: email,
            password: password,
            userRoleId: 2,
            aboutMe: null,
        };
        if (!data.phone) data.phone = null;
        return this.http.post('http://localhost:3000/users', data);
    }

    updateUserInfo(userId: number, userInfo: any): Observable<any> {
        return this.http.put('http://localhost:3000/users?id=' + userId, userInfo);
    }

    getCurrentUser(): Observable<IUser> {
        return this.http.get<IUser>('http://localhost:3000/getUser');
    }
}
