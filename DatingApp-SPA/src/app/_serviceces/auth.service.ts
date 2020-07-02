import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken :any;
  baseUrl=environment.apiUrl+'auth/';
  currentUser:User;
  photoUrl=new BehaviorSubject<string>('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-user-image-179582665.jpg');
  currentPhotoUrl=this.photoUrl.asObservable();
  constructor(private http: HttpClient) {}

  changeMemeberPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken=this.jwtHelper.decodeToken(user.token);
          this.currentUser=user.user;
          this.changeMemeberPhoto(this.currentUser.photoUrl);
          //console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  logedIn(){
    const token=localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
