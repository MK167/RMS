import { Component, Inject, OnInit } from '@angular/core';
import { AdminsPositions } from '../../Models/RMS-Models/IAdminsPositions';
import { HR_CollegeAdmins } from '../../Models/RMS-Models/HR_CollegeAdmins';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { HRService } from '../../Services/RMS-Services/hr.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-human-resorce-faculty-admin',
  templateUrl: './add-human-resorce-faculty-admin.component.html',
  styleUrls: ['./add-human-resorce-faculty-admin.component.css']
})
export class AddHumanResorceFacultyAdminComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddHRFormOne: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  
  HR_CollegeAdmins: HR_CollegeAdmins;
  AdminsPositions: AdminsPositions;
  
  College: ICollege;
  collegeID: string;
  adminsPositionID: string;
  adminsPositionName: string;
  hR_CollegeAdminName: string;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService,
    private dialogRef: MatDialogRef<AddHumanResorceFacultyAdminComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_CollegeAdmins) {
      if (data == null) {
        this.HR_CollegeAdmins = null;
        this.collegeID = '';
        this.adminsPositionID = '';
        this.hR_CollegeAdminName = '';
      } else
      {
        this.HR_CollegeAdmins = data;
        this.collegeID = data.collegeID;
        this.adminsPositionID = data.adminsPositionID;
        // this.adminsPositionName = data.adminsPositionID;
        this.hR_CollegeAdminName = data.hR_CollegeAdminName;
      }

      this.AddHRFormOne = fb.group({
        College: [this.collegeID, Validators.required ],
        AdminsPositions: [this.adminsPositionID, Validators.required],
        // adminsPositionName: [this.adminsPositionName, Validators.required],
        hR_CollegeAdminName: [this.hR_CollegeAdminName, Validators.required],        
      })
     }
     get f()
     {
       return this.AddHRFormOne.controls;
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
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          //console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_CollegeAdmins == null) {
             let NewAdminsPositions = {
              collegeID: this.AddHRFormOne.controls['College'].value,
              adminsPositionID : this.AddHRFormOne.get('AdminsPositions').value,
              hR_CollegeAdminName: this.AddHRFormOne.controls['hR_CollegeAdminName'].value,
             };
             this.HRService.CreateHR_CollegeAdmins(NewAdminsPositions)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAdminsPositions = {
            hR_CollegeAdminsID : this.HR_CollegeAdmins.hR_CollegeAdminsID,
            collegeID: this.AddHRFormOne.controls['College'].value,
            adminsPositionID : this.AddHRFormOne.get('AdminsPositions').value,
            hR_CollegeAdminName: this.AddHRFormOne.controls['hR_CollegeAdminName'].value,
          };

          console.log(NewAdminsPositions);

          this.HRService.UpdateHR_CollegeAdmins(NewAdminsPositions)
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
       