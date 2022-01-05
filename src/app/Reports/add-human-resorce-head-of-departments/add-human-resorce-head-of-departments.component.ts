import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HR_HeadOfDepartments } from 'app/Models/RMS-Models/HR_HeadOfDepartments';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICMajors } from '../../Models/RMS-Models/ICMajors';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { HRService } from '../../Services/RMS-Services/hr.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-human-resorce-head-of-departments',
  templateUrl: './add-human-resorce-head-of-departments.component.html',
  styleUrls: ['./add-human-resorce-head-of-departments.component.css']
})
export class AddHumanResorceHeadOfDepartmentsComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddHRFormTwo: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  
  HR_HeadOfDepartments: HR_HeadOfDepartments;
  ICMajors: ICMajors;
  College: ICollege;
  collegeID: string;
  cMajorsID: string;
  hR_HeadOfDepartmentName: string;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService,
    private dialogRef: MatDialogRef<AddHumanResorceHeadOfDepartmentsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_HeadOfDepartments) {
      if (data == null) {
        this.HR_HeadOfDepartments = null;
        this.collegeID = '';
        this.cMajorsID = '';
        this.hR_HeadOfDepartmentName = '';
      } else
      {
        this.HR_HeadOfDepartments = data;
        this.collegeID = data.collegeID;
        this.cMajorsID = data.cMajorsID;
        // this.adminsPositionName = data.cMajorsID;
        this.hR_HeadOfDepartmentName = data.hR_HeadOfDepartmentName;
      }

      this.AddHRFormTwo = fb.group({
        College: [this.collegeID, Validators.required ],
        ICMajors: [this.cMajorsID, Validators.required],
        // adminsPositionName: [this.adminsPositionName, Validators.required],
        hR_HeadOfDepartmentName: [this.hR_HeadOfDepartmentName, Validators.required],        
      })
     }
     get f()
     {
       return this.AddHRFormTwo.controls;
     }
       ngOnInit() {
        this.LoadCollegeData();
        this.LoadMajorData();
     }
       Cancel() {
         this.dialogRef.close();
       }
       LoadMajorData() {
        this.CollegeBasicDataService.GetAllMajor(sessionStorage.getItem('CollegeID')).subscribe((data: ICMajors) => {
          this.ICMajors = data;
          console.log(this.ICMajors);
       });
      }
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_HeadOfDepartments == null) {
             let HR_HeadOfDepartments = {
              collegeID: this.AddHRFormTwo.controls['College'].value,
              cMajorsID : this.AddHRFormTwo.get('ICMajors').value,
              hR_HeadOfDepartmentName: this.AddHRFormTwo.controls['hR_HeadOfDepartmentName'].value,
             };
             this.HRService.CreateHR_HeadOfDepartments(HR_HeadOfDepartments)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let HR_HeadOfDepartments = {
            hR_HeadOfDepartmentsID : this.HR_HeadOfDepartments.hR_HeadOfDepartmentsID,
            collegeID: this.AddHRFormTwo.controls['College'].value,
            cMajorsID : this.AddHRFormTwo.get('ICMajors').value,
            hR_HeadOfDepartmentName: this.AddHRFormTwo.controls['hR_HeadOfDepartmentName'].value,
          };

          console.log(HR_HeadOfDepartments);

          this.HRService.UpdateHR_HeadOfDepartments(HR_HeadOfDepartments)
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
       