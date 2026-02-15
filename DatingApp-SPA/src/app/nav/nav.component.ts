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
  username: string = '';
  isNavbarCollapsed = true;
  isDropdownOpen = false;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl),
    );

    // Initialize profile on page load/refresh
    const user = localStorage.getItem('user');
    if (user) {
      try {
        this.authService.currentUser = JSON.parse(user);
        const token = localStorage.getItem('token');
        if (token) {
          this.authService.decodedToken =
            this.authService.jwtHelper.decodeToken(token);
          this.updateUsername();
          if (this.authService.currentUser?.photoUrl) {
            this.photoUrl = this.authService.currentUser.photoUrl;
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  private updateUsername(): void {
    if (this.authService.currentUser?.knownAs) {
      this.username = this.authService.currentUser.knownAs;
    } else if (this.authService.currentUser?.username) {
      this.username = this.authService.currentUser.username;
    } else if (this.authService.decodedToken?.unique_name) {
      this.username = this.authService.decodedToken.unique_name;
    }
  }

  hasLocalUser(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  getCurrentUsername(): string {
    return this.username || 'User';
  }

  login() {
    if (!this.model.username || !this.model.password) {
      this.alertifyService.error('Please enter username and password');
      return;
    }

    this.authService.login(this.model).subscribe(
      (next) => {
        this.updateUsername();
        this.alertifyService.success('Login Successful!');
      },
      (error) => {
        this.alertifyService.error(error || 'Login failed. Please try again.');
        console.error('Login error:', error);
      },
      () => {
        this.model = {}; // Clear form
        this.router.navigate(['/members']);
      },
    );
  }

  isLoggedIn(): boolean {
    return this.authService.logedIn();
  }

  logout() {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.username = '';
    this.photoUrl =
      'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-user-image-179582665.jpg';
    this.authService.changeMemeberPhoto(this.photoUrl);

    this.alertifyService.message('You have been logged out successfully');
    this.router.navigate(['/home']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
