import { NationalityService } from './../../Services/Admin-Services/Nationality/nationality.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INationalityDTO } from 'app/Models/INationalityDTO';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-nationality',
  templateUrl: './add-nationality.component.html',
  styleUrls: ['./add-nationality.component.css']
})
export class AddNationalityComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddNationalityForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Nationality: string;
  Nationality: INationalityDTO;

  constructor(
    private NationalityService: NationalityService,
    private dialogRef: MatDialogRef<AddNationalityComponent>,
    @Inject(MAT_DIALOG_DATA) data: INationalityDTO ) {
      if (data == null) {
        this.Nationality = null;
        this._Nationality = '';
      } else
      {
        this.Nationality = data;
        this._Nationality = data.nationalityName;
      }
     }

     get f()
     {
       return this.AddNationalityForm.controls;
     }

       ngOnInit() {
         this.AddNationalityForm = new FormGroup({
          NationalityName: new FormControl(this._Nationality, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Nationality == null) {
             let NewNationality = {
              NationalityName : this.AddNationalityForm.get('NationalityName').value
             };
             this.NationalityService.CreateNationality(NewNationality)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewNationality = {
            NationalityID : this.Nationality.nationalityID,
            NationalityName : this.AddNationalityForm.get('NationalityName').value
         };

          this.NationalityService.UpdateNationality(NewNationality)
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
       
