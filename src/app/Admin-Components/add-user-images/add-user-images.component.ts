import { UserImageService } from './../../Services/Admin-Services/UserImage/user-image.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserImageDTO } from 'app/Models/IUserImageDTO';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user-images',
  templateUrl: './add-user-images.component.html',
  styleUrls: ['./add-user-images.component.css']
})
export class AddUserImagesComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddUserImageForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _UserImage: string;
  UserImage: IUserImageDTO;
  fileToUpload: File | null = null;

  constructor(
    private UserImageService: UserImageService,
    private dialogRef: MatDialogRef<AddUserImagesComponent>,
    @Inject(MAT_DIALOG_DATA) data: IUserImageDTO ) {
      if (data == null) {
        this.UserImage = null;
        this._UserImage = '';
      } else
      {
        this.UserImage = data;
        this._UserImage = data.imgPathName;
      }
     }

     get f()
     {
       return this.AddUserImageForm.controls;
     }

       ngOnInit() {
         this.AddUserImageForm = new FormGroup({
          imgPathName: new FormControl(this._UserImage, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         this.UserImageService.postFile(this.fileToUpload).subscribe(data => {
          if (this.UserImage == null) {
            let NewUserImage = {
             imgPathName : this.AddUserImageForm.get('imgPathName').value
            };
            this.UserImageService.CreateUserImage(NewUserImage)
                .subscribe(
                  response => {
                    this.dialogRef.close();
                  },
                  error => {
                    console.log(error);
                  });
                  this.UserImageService.postFile(this.fileToUpload).subscribe(data => {
                    
                  })
        } else{
         let NewUserImage = {
           userImageID : this.UserImage.userImageID,
           imgPathName : this.AddUserImageForm.get('imgPathName').value
        };

         this.UserImageService.UpdateUserImage(NewUserImage)
            .subscribe(
              response => {
                this.dialogRef.close();
              },
              error => {
                console.log(error);
              });
         }
         }, error =>{
           console.log(error);
         });
        }
      

         closeDialog(){
            this.dialogRef.close(false);
          }

          handleFileInput(files: FileList) {
            this.fileToUpload = files.item(0);
        }
}
       
