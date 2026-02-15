import { User } from './../../_models/user';
import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  activeTab = 0;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe((params) => {
      const selectedTab = params['tab'];
      this.activeTab = selectedTab > 0 ? selectedTab : 0;
    });
  }

  selectTab(tabId: number) {
    this.activeTab = tabId;
  }
}
