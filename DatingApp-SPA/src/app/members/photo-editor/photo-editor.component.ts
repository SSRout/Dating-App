import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { AuthService } from './../../_serviceces/auth.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  files: File[] = [];
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  constructor(
    private authService: AuthService,
    private userSerVice: UserService,
    private alertify: AlertifyService,
    private http: HttpClient,
  ) {}

  ngOnInit() {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onFilesSelected(event: any) {
    const selected: FileList = event.target.files;
    for (let i = 0; i < selected.length; i++) {
      const f = selected.item(i);
      if (f) this.files.push(f);
    }
  }

  uploadAll() {
    const userId = this.authService.decodedToken.nameid;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    this.files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http
        .post(this.baseUrl + 'users/' + userId + '/photos', formData, {
          headers,
        })
        .subscribe(
          (res: any) => {
            if (res) {
              const photo: Photo = res as Photo;
              this.photos.push(photo);
              if (photo.isMain) {
                this.authService.changeMemeberPhoto(photo.url);
                this.authService.currentUser.photoUrl = photo.url;
                localStorage.setItem(
                  'user',
                  JSON.stringify(this.authService.currentUser),
                );
              }
            }
          },
          (err) => this.alertify.error('Upload failed'),
        );
    });
    this.files = [];
  }

  clearFiles() {
    this.files = [];
  }

  setMainPhoto(photo: Photo) {
    this.userSerVice
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          //update photo without reload
          this.currentMain = this.photos.filter((p) => p.isMain == true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemeberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser),
          );
          this.alertify.success('Set Main Photo Success');
        },
        (error) => {
          this.alertify.error(error);
        },
      );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are You Sure Want To Delete This Photo?', () => {
      this.userSerVice
        .deletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(
          () => {
            this.photos.splice(
              this.photos.findIndex((p) => p.id === id),
              1,
            );
            this.alertify.success('Deletion Success!!');
          },
          (error) => {
            this.alertify.error('Failed To Delete Photo');
          },
        );
    });
  }
}
