import { User } from './../../_models/user';
import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memeberTabs:TabsetComponent
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params=>{
        const selectedTab=params['tab'];
        this.memeberTabs.tabs[selectedTab>0?selectedTab:0].active=true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url,
        description:photo.description

      });
    }
    return imageUrls;

  }

 selectTab(tabId:number){
    this.memeberTabs.tabs[tabId].active=true;
 }

}
