import { AuthService } from './../_serviceces/auth.service';
import { Message } from './../_models/message';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_serviceces/alertify.service';
import { UserService } from './../_serviceces/user.service';
import { Injectable } from '@angular/core';
import{Resolve, Router, ActivatedRouteSnapshot} from '@angular/router'
@Injectable()

export class MessagesResolver implements Resolve<Message[]>{
    pageNumber=1;
    pageSize=5;
    messageContainer="Unread";
    constructor(private userService:UserService,private alertify:AlertifyService,private route:Router,private authService:AuthService){}
    resolve(route:ActivatedRouteSnapshot):Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid,this.pageNumber,this.pageSize,this.messageContainer).pipe(catchError(
            err=>{
                this.alertify.error("Problem Retrieving Message!!");
                this.route.navigate(['/home']);
                return of(null);
            })
            );
    }
}