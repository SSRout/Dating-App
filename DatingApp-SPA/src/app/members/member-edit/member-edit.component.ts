import { AuthService } from './../../_serviceces/auth.service';
import { UserService } from './../../_serviceces/user.service';
import { AlertifyService } from './../../_serviceces/alertify.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user:User
  @ViewChild('editForm',{static:true}) editForm:NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }
  constructor(private route:ActivatedRoute,private alertify:AlertifyService,private userService:UserService,private authServive:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
  }

  updateUser(){
    this.userService.updateUser(this.authServive.decodedToken.nameid,this.user).subscribe(next=>{
      this.alertify.success("Updated Succes!!");
      this.editForm.reset(this.user);
    },error=>{this.alertify.error(error);})
    
  }

}
