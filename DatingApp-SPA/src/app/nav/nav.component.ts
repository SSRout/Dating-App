import { AlertifyService } from './../_serviceces/alertify.service';
import { AuthService } from './../_serviceces/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={}
  constructor(private authservice:AuthService,private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login(){
    this.authservice.login(this.model).subscribe(next=>{
      this.alertifyService.success("Login Success!");
      console.log("login sucess..");
    },error=>{
      this.alertifyService.error(error);
      console.log(error);
    });
  }

  logedin(){
    return this.authservice.logedIn();
  }

  logout(){
    localStorage.removeItem("token");
    this.alertifyService.message("Logout Success!!");
    console.log("Logout Success!!");
  }

}
