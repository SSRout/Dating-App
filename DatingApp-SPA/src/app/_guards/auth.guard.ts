import { AlertifyService } from './../_serviceces/alertify.service';
import { AuthService } from './../_serviceces/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private alerttify:AlertifyService){}
  canActivate():boolean {
    if(this.authService.logedIn()){
      return true;
    }
    this.alerttify.warning("Please Check Your Role!!");
    this.router.navigate(['/home']);
    return false;
  }
  
}
