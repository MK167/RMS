import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICMajors } from 'app/Models/RMS-Models/ICMajors';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { MajorsOfCollegeComponent } from '../majors-of-college/majors-of-college.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-majors-of-college',
  templateUrl: './add-majors-of-college.component.html',
  styleUrls: ['./add-majors-of-college.component.css']
})
export class AddMajorsOfCollegeComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddCMajorsForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;
  _Major: string;
  _CollegeID: string; 
  Major: ICMajors;
  College : ICollege;

  constructor(private CollegeBasicDataService: CollegeBasicDataService,
    private dialogRef: MatDialogRef<AddMajorsOfCollegeComponent>, fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICMajors) {
    
      if (data == null) {
        this.Major = null;
        this._Major = '';
        this._CollegeID = '';
      } else
      {
        this.Major = data;
        this._Major = data.majorName;
        this._CollegeID = data.collegeID;
      }

      this.AddCMajorsForm = fb.group({
        CMajorName: [this._Major, Validators.required],
        College: [this._CollegeID, Validators.required ]
      })
     }
    
    
     get f()
     {
       return this.AddCMajorsForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
     }


       Cancel() {
         this.dialogRef.close();
       }

       
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.Major);
       });
       
      }



       saveData(): void {
         if (this.Major == null) {
             let NewMajor = {
              majorName : this.AddCMajorsForm.get('CMajorName').value,
              collegeID: this.AddCMajorsForm.controls['College'].value,
             };
             this.CollegeBasicDataService.CreateMajor(NewMajor)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewMajor = {
            majorID : this.Major.majorID,
            majorName : this.AddCMajorsForm.get('CMajorName').value,
            collegeID : this.AddCMajorsForm.get('College').value
          };

          console.log(NewMajor);

          this.CollegeBasicDataService.UpdateMajor(NewMajor)
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
       