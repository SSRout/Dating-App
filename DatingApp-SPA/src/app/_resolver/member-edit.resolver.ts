import { AuthService } from './../_serviceces/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_serviceces/alertify.service';
import { UserService } from './../_serviceces/user.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import{Resolve, Router, ActivatedRouteSnapshot} from '@angular/router'
@Injectable()

export class MemberEditResolver implements Resolve<User>{
    constructor(private userService:UserService,private alertify:AlertifyService,private route:Router,private authService:AuthService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(
            err=>{
                this.alertify.error("Problem Retrieving Data!!");
                this.route.navigate(['/memebers']);
                return of(null);
            })
            );
    }
}