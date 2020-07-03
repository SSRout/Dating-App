import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_serviceces/alertify.service';
import { UserService } from '../../_serviceces/user.service';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  user:User=JSON.parse(localStorage.getItem('user'));
  genderList=[{value:'male',dispaly:'Males'},{value:'female',dispaly:'Females'}];
  userParams:any={};
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUser();
    this.route.data.subscribe((data) => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.gender=this.user.gender==='female'?'male':'female';
    this.userParams.minAge=18;
    this.userParams.maxAge=99;
    this.userParams.orderBy='lastActive';
  }

  resetFilters(){
    this.userParams.gender=this.user.gender==='female'?'male':'female';
    this.userParams.minAge=18;
    this.userParams.maxAge=99;
    this.loadUser();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  //when pagination clicked
  loadUser() {
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage,this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination=res.pagination;
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }
}
