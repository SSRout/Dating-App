import { Component, OnInit } from '@angular/core';
import { AuthService } from './_serviceces/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  constructor(private aService:AuthService) {}

  ngOnInit(){
    const token=localStorage.getItem("token");
    if(token){
      this.aService.decodedToken=this.jwtHelper.decodeToken(token);
    }
  }

}
