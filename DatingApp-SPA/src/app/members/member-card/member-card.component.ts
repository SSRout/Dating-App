import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { AuthService } from './../../_serviceces/auth.service';
import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user:User;
  constructor(private authService:AuthService,private userService:UserService,private alertify:AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id:number){
    this.userService.sendLike(this.authService.decodedToken.nameid,id).subscribe(data=>{
      this.alertify.success("You Have Liked : "+this.user.knownAs);
    },error=>{
      this.alertify.error(error);
    });
  }

}
