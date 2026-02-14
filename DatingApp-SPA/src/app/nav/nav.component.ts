import { AlertifyService } from './../_serviceces/alertify.service';
import { AuthService } from './../_serviceces/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(
    private authservice: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl),
    );
    // Initialize profile on page load/refresh
    const user = localStorage.getItem('user');
    if (user) {
      this.authservice.currentUser = JSON.parse(user);
      const token = localStorage.getItem('token');
      if (token) {
        this.authservice.decodedToken =
          this.authservice.jwtHelper.decodeToken(token);
        if (
          this.authservice.currentUser &&
          this.authservice.currentUser.photoUrl
        ) {
          this.photoUrl = this.authservice.currentUser.photoUrl;
        }
      }
    }
  }

  hasLocalUser(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUsername(): string {
    if (this.authservice.decodedToken?.unique_name) {
      return this.authservice.decodedToken.unique_name;
    }
    if (this.authservice.currentUser?.username) {
      return this.authservice.currentUser.username;
    }
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.username || parsedUser.knownAs || 'User';
      } catch {
        return 'User';
      }
    }
    return 'User';
  }

  login() {
    this.authservice.login(this.model).subscribe(
      (next) => {
        this.alertifyService.success('Login Success!');
        console.log('login sucess..');
      },
      (error) => {
        this.alertifyService.error(error);
        console.log(error);
      },
      () => {
        this.router.navigate(['/members']);
      },
    );
  }

  logedin() {
    return this.authservice.logedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authservice.decodedToken = null;
    this.authservice.currentUser = null;
    this.alertifyService.message('Logout Success!!');
    console.log('Logout Success!!');
    this.router.navigate(['/home']);
  }
}
