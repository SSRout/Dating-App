import { AlertifyService } from './../_serviceces/alertify.service';
import { AuthService } from './../_serviceces/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={}
  constructor(private authservice:AuthService,private alertifyService: AlertifyService,private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.authservice.login(this.model).subscribe(next=>{
      this.alertifyService.success("Login Success!");
      console.log("login sucess..");
    },error=>{
      this.alertifyService.error(error);
      console.log(error);
    },()=>{
      this.router.navigate(['/members']);
    });
  }

  logedin(){
    return this.authservice.logedIn();
  }

  logout(){
    localStorage.removeItem("token");
    this.alertifyService.message("Logout Success!!");
    console.log("Logout Success!!");
    this.router.navigate(['/home']);
  }

}
