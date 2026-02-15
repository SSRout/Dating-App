import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl = environment.apiUrl + 'auth/';
  currentUser: User;
  photoUrl = new BehaviorSubject<string>(
    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-user-image-179582665.jpg',
  );
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemeberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user && user.token) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemeberPhoto(this.currentUser?.photoUrl || '');
          return user;
        }
        throw new Error('Invalid login response');
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(
          () => new Error('Login failed. Please check your credentials.'),
        );
      }),
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register', user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(
          () => error.error || new Error('Registration failed'),
        );
      }),
    );
  }

  logedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.changeMemeberPhoto(
      'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-user-image-179582665.jpg',
    );
  }
}
