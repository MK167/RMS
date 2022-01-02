import { UniversityService } from './../../Services/Admin-Services/University/university.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUniversityDTO } from 'app/Models/IUniversityDTO';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {

  
  matcher = new MyErrorStateMatcher();
  AddUniversityForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _University: string;
  University: IUniversityDTO;

  constructor(
    private UniversityService: UniversityService,
    private dialogRef: MatDialogRef<AddUniversityComponent>,
    @Inject(MAT_DIALOG_DATA) data: IUniversityDTO ) {
      if (data == null) {
        this.University = null;
        this._University = '';
      } else
      {
        this.University = data;
        this._University = data.universityName;
      }
     }

     get f()
     {
       return this.AddUniversityForm.controls;
     }

       ngOnInit() {
         this.AddUniversityForm = new FormGroup({
          universityName: new FormControl(this._University, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.University == null) {
             let NewUniversity = {
              universityName : this.AddUniversityForm.get('universityName').value
             };
             this.UniversityService.CreateUniversity(NewUniversity)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewUniversity = {
            universityID : this.University.universityID,
            universityName : this.AddUniversityForm.get('universityName').value
         };

          this.UniversityService.UpdateUniversity(NewUniversity)
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
       
