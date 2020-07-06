import { UserService } from './../../_serviceces/user.service';
import { AuthService } from './../../_serviceces/auth.service';
import { AlertifyService } from './../../_serviceces/alertify.service';
import { Message } from './../../_models/message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() recipientId:number;
messages:Message[];
  constructor(private alertify:AlertifyService,private authService:AuthService,private userService:UserService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.userService.getMessageThread(this.authService.decodedToken.nameid,this.recipientId).subscribe(messages=>{
      this.messages=messages;
    },error=>{
      this.alertify.error(error);
    });
    
  }

}
