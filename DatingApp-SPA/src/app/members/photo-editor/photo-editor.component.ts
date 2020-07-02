import { AlertifyService } from './../../_serviceces/alertify.service';
import { UserService } from './../../_serviceces/user.service';
import { AuthService } from './../../_serviceces/auth.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange=new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl=environment.apiUrl;
  currentMain:Photo;
  constructor(private authService:AuthService,private userSerVice:UserService,private alertify:AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/'+this.authService.decodedToken.nameid+'/photos',
      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:["image"],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;}
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if(response){
        const res:Photo=JSON.parse(response);
        const photo={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          isMain:res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain){
          this.authService.changeMemeberPhoto(photo.url);
          this.authService.currentUser.photoUrl=photo.url;
          localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo:Photo){
    this.userSerVice.setMainPhoto(this.authService.decodedToken.nameid,photo.id).subscribe(()=>{
      //update photo without reload
      this.currentMain=this.photos.filter(p=>p.isMain==true)[0];
      this.currentMain.isMain=false;
      photo.isMain=true;
      this.authService.changeMemeberPhoto(photo.url);
      this.authService.currentUser.photoUrl=photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
      this.alertify.success("Set Main Photo Success");
    },error=>{
      this.alertify.error(error);
    });
  }

  deletePhoto(id:number){
   this.alertify.confirm("Are You Sure Want To Delete This Photo?",()=>{
     this.userSerVice.deletePhoto(this.authService.decodedToken.nameid,id).subscribe(()=>{
       this.photos.splice(this.photos.findIndex(p=>p.id===id),1);
       this.alertify.success("Deletion Success!!");
     },error=>{
       this.alertify.error("Failed To Delete Photo");
     });
   });
  }

}
