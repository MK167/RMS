import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICMajors } from 'app/Models/RMS-Models/ICMajors';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { HR_AcademicStaff } from '../../Models/RMS-Models/HR_AcademicStaff';
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
  selector: 'app-add-students-of-programs',
  templateUrl: './add-students-of-programs.component.html',
  styleUrls: ['./add-students-of-programs.component.css']
})
export class AddStudentsOfProgramsComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddHRFormFive: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  HR_AcademicStaff: HR_AcademicStaff;
  ICMajors: ICMajors;
  College: ICollege;

  collegeID: string;
  cMajorsID: string;  
  
  numberOfAss_Prof: number;
  numberOfAss_Prof_DelegatedDayOne: number;
  numberOfAss_Prof_DelegatedDayTwo: number;
  sumOfAss_Pro: number;

  numberOfTeasher: number;
  numberOfTeasher_DelegatedDayOne: number;
  numberOfTeasher_DelegatedDayTwo: number;
  sumOfTeashers: number;

  totalOnVacation: number;
  totalOnChildCareVacation: number;
  totalOnJob: number;
  totalDelegtesOnJob: number;
  total: number;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService,
    private dialogRef: MatDialogRef<AddStudentsOfProgramsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_AcademicStaff) {
      if (data == null) {
        this.HR_AcademicStaff = null;
        this.collegeID = '';
        this.cMajorsID = '';
        this.numberOfAss_Prof= 0;
        this.numberOfAss_Prof_DelegatedDayOne= 0;
        this.numberOfAss_Prof_DelegatedDayTwo= 0;
        this.sumOfAss_Pro= 0;
        this.numberOfTeasher= 0;
        this.numberOfTeasher_DelegatedDayOne= 0;
        this.numberOfTeasher_DelegatedDayTwo= 0;
        this.sumOfTeashers= 0;
        this.totalOnVacation= 0;
        this.totalOnChildCareVacation= 0;
        this.totalOnJob= 0;
        this.totalDelegtesOnJob= 0;
        this.total= 0;
      } else
      {
        this.HR_AcademicStaff = data;
        this.collegeID = data.collegeID;
        this.cMajorsID = data.cMajorsID;
        this.numberOfAss_Prof= data.numberOfAss_Prof;
        this.numberOfAss_Prof_DelegatedDayOne= data.numberOfAss_Prof_DelegatedDayOne;
        this.numberOfAss_Prof_DelegatedDayTwo= data.numberOfAss_Prof_DelegatedDayTwo;
        this.sumOfAss_Pro= data.sumOfAss_Pro;
        this.numberOfTeasher= data.numberOfTeasher;
        this.numberOfTeasher_DelegatedDayOne= data.numberOfTeasher_DelegatedDayOne;
        this.numberOfTeasher_DelegatedDayTwo= data.numberOfTeasher_DelegatedDayTwo;
        this.sumOfTeashers= data.sumOfTeashers;
        this.totalOnVacation= data.totalOnVacation;
        this.totalOnChildCareVacation= data.totalOnChildCareVacation;
        this.totalOnJob= data.totalOnJob;
        this.totalDelegtesOnJob= data.totalDelegtesOnJob;
        this.total= data.total;
      

      }

      this.AddHRFormFive = fb.group({
        College: [this.collegeID, Validators.required ],
        ICMajors: [this.cMajorsID, Validators.required],

        numberOfAss_Prof:[this.numberOfAss_Prof, Validators.required],
        numberOfAss_Prof_DelegatedDayOne:[this.numberOfAss_Prof_DelegatedDayOne, Validators.required],
        numberOfAss_Prof_DelegatedDayTwo:[this.numberOfAss_Prof_DelegatedDayTwo, Validators.required],
        sumOfAss_Pro:[this.sumOfAss_Pro, Validators.required],
        numberOfTeasher:[this.numberOfTeasher, Validators.required],
        numberOfTeasher_DelegatedDayOne:[this.numberOfTeasher_DelegatedDayOne, Validators.required],
        numberOfTeasher_DelegatedDayTwo:[this.numberOfTeasher_DelegatedDayTwo, Validators.required],
        sumOfTeashers:[this.sumOfTeashers, Validators.required],
        totalOnVacation:[this.totalOnVacation, Validators.required],
        totalOnChildCareVacation:[this.totalOnChildCareVacation, Validators.required],
        totalOnJob:[this.totalOnJob, Validators.required],
        totalDelegtesOnJob:[this.totalDelegtesOnJob, Validators.required],
        total:[this.total, Validators.required],
             
      })
     }
     get f()
     {
       return this.AddHRFormFive.controls;
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
          //console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_AcademicStaff == null) {
             let HR_AcademicStaff = {
              collegeID: this.AddHRFormFive.controls['College'].value,
              cMajorsID : this.AddHRFormFive.get('ICMajors').value,
              numberOfAss_Prof:this.AddHRFormFive.get('numberOfAss_Prof').value,

              numberOfAss_Prof_DelegatedDayOne:this.AddHRFormFive.get('numberOfAss_Prof_DelegatedDayOne').value,  
              numberOfAss_Prof_DelegatedDayTwo:this.AddHRFormFive.get('numberOfAss_Prof_DelegatedDayTwo').value, 

              sumOfAss_Pro:this.AddHRFormFive.get('sumOfAss_Pro').value,
              numberOfTeasher:this.AddHRFormFive.get('numberOfTeasher').value,

              numberOfTeasher_DelegatedDayOne:this.AddHRFormFive.get('numberOfTeasher_DelegatedDayOne').value,
              numberOfTeasher_DelegatedDayTwo:this.AddHRFormFive.get('numberOfTeasher_DelegatedDayTwo').value,

              sumOfTeashers:this.AddHRFormFive.get('sumOfTeashers').value,
              totalOnVacation:this.AddHRFormFive.get('totalOnVacation').value,
              totalOnChildCareVacation:this.AddHRFormFive.get('totalOnChildCareVacation').value,
              totalOnJob:this.AddHRFormFive.get('totalOnJob').value,
              totalDelegtesOnJob:this.AddHRFormFive.get('totalDelegtesOnJob').value,
              total:this.AddHRFormFive.get('total').value,
             };
             this.HRService.CreateHR_AcademicStaff(HR_AcademicStaff)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let HR_AcademicStaff = {
            hR_AcademicStaffID : this.HR_AcademicStaff.hR_AcademicStaffID,
            collegeID: this.AddHRFormFive.controls['College'].value,
            cMajorsID : this.AddHRFormFive.get('ICMajors').value,
            numberOfAss_Prof:this.AddHRFormFive.get('numberOfAss_Prof').value,

            numberOfAss_Prof_DelegatedDayOne:this.AddHRFormFive.get('numberOfAss_Prof_DelegatedDayOne').value,
            numberOfAss_Prof_DelegatedDayTwo:this.AddHRFormFive.get('numberOfAss_Prof_DelegatedDayTwo').value,

            sumOfAss_Pro:this.AddHRFormFive.get('sumOfAss_Pro').value,
            numberOfTeasher:this.AddHRFormFive.get('numberOfTeasher').value,

            numberOfTeasher_DelegatedDayOne:this.AddHRFormFive.get('numberOfTeasher_DelegatedDayOne').value,
            numberOfTeasher_DelegatedDayTwo:this.AddHRFormFive.get('numberOfTeasher_DelegatedDayTwo').value,
            
            sumOfTeashers:this.AddHRFormFive.get('sumOfTeashers').value,
            totalOnVacation:this.AddHRFormFive.get('totalOnVacation').value,
            totalOnChildCareVacation:this.AddHRFormFive.get('totalOnChildCareVacation').value,
            totalOnJob:this.AddHRFormFive.get('totalOnJob').value,
            totalDelegtesOnJob:this.AddHRFormFive.get('totalDelegtesOnJob').value,
            total:this.AddHRFormFive.get('total').value,
          };

          console.log(HR_AcademicStaff);

          this.HRService.UpdateHR_AcademicStaff(HR_AcademicStaff)
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
       