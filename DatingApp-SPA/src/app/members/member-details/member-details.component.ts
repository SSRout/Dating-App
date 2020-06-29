import { User } from './../../_models/user';
import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUser();
    this.route.data.subscribe((data) => {
      this.user = data['user'];
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

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user:User)=>{
  //     this.user=user;
  //   },error=>{
  //     this.alertify.error(error);
  //   });
  // }
}
