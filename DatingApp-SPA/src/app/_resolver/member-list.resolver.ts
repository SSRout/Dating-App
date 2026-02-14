import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_serviceces/alertify.service';
import { UserService } from './../_serviceces/user.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
@Injectable()
export class MemberListResolver implements Resolve<any> {
  pageNumber = 1;
  pageSize = 5;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
      catchError((err) => {
        this.alertify.error('Problem Retrieving Data!!');
        this.route.navigate(['/home']);
        return of(null);
      }),
    );
  }
}
