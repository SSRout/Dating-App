import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_serviceces/alertify.service';
import { UserService } from './../_serviceces/user.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import{Resolve, Router, ActivatedRouteSnapshot} from '@angular/router'
@Injectable()

export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService:UserService,private alertify:AlertifyService,private route:Router){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(catchError(
            err=>{
                this.alertify.error("Problem Retrieving Data!!");
                this.route.navigate(['/memebers']);
                return of(null);
            })
            );
    }
}