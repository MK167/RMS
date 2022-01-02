import { GenderService } from './../../Services/Admin-Services/Gender/gender.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGenderDTO } from 'app/Models/IGenderDTO';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-gender',
  templateUrl: './add-gender.component.html',
  styleUrls: ['./add-gender.component.css']
})
export class AddGenderComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddGenderForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Gender: string;
  Gender: IGenderDTO;

  constructor(
    private GenderService: GenderService,
    private dialogRef: MatDialogRef<AddGenderComponent>,
    @Inject(MAT_DIALOG_DATA) data: IGenderDTO ) {
      if (data == null) {
        this.Gender = null;
        this._Gender = '';
      } else
      {
        this.Gender = data;
        this._Gender = data.genderName;
      }
     }

     get f()
     {
       return this.AddGenderForm.controls;
     }

       ngOnInit() {
         this.AddGenderForm = new FormGroup({
          genderName: new FormControl(this._Gender, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Gender == null) {
             let NewGender = {
              genderName : this.AddGenderForm.get('genderName').value
             };
             this.GenderService.CreateGender(NewGender)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewGender = {
            genderID : this.Gender.genderID,
            genderName : this.AddGenderForm.get('genderName').value
         };

          this.GenderService.UpdateGender(NewGender)
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
       
