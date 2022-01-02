import { UserTypeService } from './../../Services/Admin-Services/UserType/user-type.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserTypeDTO } from 'app/Models/IUserTypeDTO';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user-type',
  templateUrl: './add-user-type.component.html',
  styleUrls: ['./add-user-type.component.css']
})
export class AddUserTypeComponent implements OnInit {

  
  matcher = new MyErrorStateMatcher();
  AddUserTypeForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _UserType: string;
  UserType: IUserTypeDTO;

  constructor(
    private UserTypeService: UserTypeService,
    private dialogRef: MatDialogRef<AddUserTypeComponent>,
    @Inject(MAT_DIALOG_DATA) data: IUserTypeDTO ) {
      if (data == null) {
        this.UserType = null;
        this._UserType = '';
      } else
      {
        this.UserType = data;
        this._UserType = data.userTypeName;
      }
     }

     get f()
     {
       return this.AddUserTypeForm.controls;
     }

       ngOnInit() {
         this.AddUserTypeForm = new FormGroup({
          userTypeName: new FormControl(this._UserType, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.UserType == null) {
             let NewUserType = {
              userTypeName : this.AddUserTypeForm.get('userTypeName').value
             };
             this.UserTypeService.CreateUserType(NewUserType)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewUserType = {
            UserTypeID : this.UserType.userTypeID,
            userTypeName : this.AddUserTypeForm.get('userTypeName').value
         };

          this.UserTypeService.UpdateUserType(NewUserType)
             .subscribe(
               response => {
                 this.dialogRef.close();
               },
               error => {
                 console.log(error);
               });
         }
         }

         closeDialog(){
            this.dialogRef.close(false);
          }
}
       
