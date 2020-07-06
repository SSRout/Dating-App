import { ActivatedRoute } from '@angular/router';
import { UserService } from './../_serviceces/user.service';
import { AlertifyService } from './../_serviceces/alertify.service';
import { AuthService } from './../_serviceces/auth.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Message } from './../_models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private UserService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  loadMessages() {
    this.UserService.getMessages(
      this.authService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer
    ).subscribe(
      (res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
