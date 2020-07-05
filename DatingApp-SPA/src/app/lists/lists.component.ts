import { AlertifyService } from './../_serviceces/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_serviceces/auth.service';
import { UserService } from './../_serviceces/user.service';
import { Pagination, PaginatedResult } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users:User[];
  pagination:Pagination;
  likesParam:string;

  constructor(private userService:UserService,private authService:AuthService,private route:ActivatedRoute,private alertify:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users=data['users'].result;
      this.pagination=data['users'].pagination;
    });
    this.likesParam="Likers";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage,null,this.likesParam).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination=res.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

}
