import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { HR_ResearchUnits } from '../../Models/RMS-Models/HR_ResearchUnits';
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
  selector: 'app-add-human-resorce-research-units',
  templateUrl: './add-human-resorce-research-units.component.html',
  styleUrls: ['./add-human-resorce-research-units.component.css']
})
export class AddHumanResorceResearchUnitsComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddHRFormThree: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  HR_ResearchUnits: HR_ResearchUnits;  
  College: ICollege;
  collegeID: string;
  unitName: string;
  headName: string;
  headJobNumber: string;
  headPhone: string;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService ,
    private dialogRef: MatDialogRef<AddHumanResorceResearchUnitsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_ResearchUnits) {
      if (data == null) {
        this.HR_ResearchUnits = null;
        this.collegeID = '';
        this.unitName = '';
        this.headName = '';
        this.headJobNumber = '';
        this.headPhone = '';
      } else
      {
        this.HR_ResearchUnits = data;
        this.collegeID = data.collegeID;
        this.unitName = data.unitName;
        this.headName = data.headName;
        this.headJobNumber = data.headJobNumber;
        this.headPhone = data.headPhone;
      }

      this.AddHRFormThree = fb.group({
        College: [this.collegeID, Validators.required ],
        unitName: [this.unitName, Validators.required],
        headName: [this.headName, Validators.required],
        headJobNumber: [this.headJobNumber, Validators.required],        
        headPhone: [this.headPhone, Validators.required],        
      })
     }
     get f()
     {
       return this.AddHRFormThree.controls;
     }
       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadHRService();
     }
       Cancel() {
         this.dialogRef.close();
       }
      //  LoadHRService() {
      //   this.HRService.GetAllAdminsPositions().subscribe((data: AdminsPositions) => {
      //     this.AdminsPositions = data;
      //     console.log(this.AdminsPositions);
      //  });
      // }
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_ResearchUnits == null) {
             let NewAdminsPositions = {
              collegeID: this.AddHRFormThree.controls['College'].value,
              unitName : this.AddHRFormThree.get('unitName').value,
              headName: this.AddHRFormThree.controls['headName'].value,
              headJobNumber: this.AddHRFormThree.controls['headJobNumber'].value,
              headPhone: this.AddHRFormThree.controls['headPhone'].value,
             };
             this.HRService.CreateHR_ResearchUnits(NewAdminsPositions)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAdminsPositions = {
            hR_ResearchUnitsID : this.HR_ResearchUnits.hR_ResearchUnitsID,
            collegeID: this.AddHRFormThree.controls['College'].value,
              unitName : this.AddHRFormThree.get('unitName').value,
              headName: this.AddHRFormThree.controls['headName'].value,
              headJobNumber: this.AddHRFormThree.controls['headJobNumber'].value,
              headPhone: this.AddHRFormThree.controls['headPhone'].value,
          };

          console.log(NewAdminsPositions);

          this.HRService.UpdateHR_ResearchUnits(NewAdminsPositions)
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
       