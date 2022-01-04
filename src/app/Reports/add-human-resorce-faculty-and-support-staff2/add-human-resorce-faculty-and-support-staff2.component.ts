import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminsPositions } from 'app/Models/RMS-Models/IAdminsPositions';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { HR_TechnicalAndAdmin } from '../../Models/RMS-Models/HR_TechnicalAndAdmin';
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
  selector: 'app-add-human-resorce-faculty-and-support-staff2',
  templateUrl: './add-human-resorce-faculty-and-support-staff2.component.html',
  styleUrls: ['./add-human-resorce-faculty-and-support-staff2.component.css']
})
export class AddHumanResorceFacultyAndSupportStaff2Component implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddHRFormSix: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  
  HR_TechnicalAndAdmin: HR_TechnicalAndAdmin;
  AdminsPositions: AdminsPositions;
  
  College: ICollege;
  collegeID: string;
  adminsPositionID: string;
  // adminsPositionName: string;
  count: number;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService,
    private dialogRef: MatDialogRef<AddHumanResorceFacultyAndSupportStaff2Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_TechnicalAndAdmin) {
      if (data == null) {
        this.HR_TechnicalAndAdmin = null;
        this.collegeID = '';
        this.adminsPositionID = '';
        this.count = 0;
      } else
      {
        this.HR_TechnicalAndAdmin = data;
        this.collegeID = data.collegeID;
        this.adminsPositionID = data.adminsPositionID;
        // this.adminsPositionName = data.adminsPositionID;
        this.count = data.count;
      }

      this.AddHRFormSix = fb.group({
        College: [this.collegeID, Validators.required ],
        AdminsPositions: [this.adminsPositionID, Validators.required],
        // adminsPositionName: [this.adminsPositionName, Validators.required],
        count: [this.count, Validators.required],        
      })
     }
     get f()
     {
       return this.AddHRFormSix.controls;
     }
       ngOnInit() {
        this.LoadCollegeData();
        this.LoadHRService();
     }
       Cancel() {
         this.dialogRef.close();
       }
       LoadHRService() {
        this.HRService.GetAllAdminsPositions().subscribe((data: AdminsPositions) => {
          this.AdminsPositions = data;
          console.log(this.AdminsPositions);
       });
      }
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_TechnicalAndAdmin == null) {
             let NewAdminsPositions = {
              collegeID: this.AddHRFormSix.controls['College'].value,
              adminsPositionID : this.AddHRFormSix.get('AdminsPositions').value,
              count: this.AddHRFormSix.controls['count'].value,
             };
             this.HRService.CreateHR_TechnicalAndAdmin(NewAdminsPositions)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAdminsPositions = {
            hR_TechnicalAndAdminID : this.HR_TechnicalAndAdmin.hR_TechnicalAndAdminID,
            collegeID: this.AddHRFormSix.controls['College'].value,
            adminsPositionID : this.AddHRFormSix.get('AdminsPositions').value,
            count: this.AddHRFormSix.controls['count'].value,
          };

          console.log(NewAdminsPositions);

          this.HRService.UpdateHR_TechnicalAndAdmin(NewAdminsPositions)
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
       