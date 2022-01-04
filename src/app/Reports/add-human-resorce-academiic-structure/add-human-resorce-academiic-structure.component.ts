import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICMajors } from 'app/Models/RMS-Models/ICMajors';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { HR_AcademicStaffAll } from '../../Models/RMS-Models/HR_AcademicStaffAll';
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
  selector: 'app-add-human-resorce-academiic-structure',
  templateUrl: './add-human-resorce-academiic-structure.component.html',
  styleUrls: ['./add-human-resorce-academiic-structure.component.css']
})
export class AddHumanResorceAcademiicStructureComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddHRFormFour: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  HR_AcademicStaffAll: HR_AcademicStaffAll;
  ICMajors: ICMajors;
  College: ICollege;
  collegeID: string;
  cMajorsID: string;  
  numberOfProf: number;
  numberOfProf_Loaned: number;
  numberOfProfDelegated: number;
  sumOfPro: number;
  numberOfAss_Prof: number;
  numberOfAss_Prof_Loaned: number;
  numberOfAss_Prof_Delegated: number;
  sumOfAss_Pro: number;
  numberOfTeasher: number;
  numberOfTeasher_Loaned: number;
  numberOfTeasher_Delegated: number;
  sumOfTeashers: number;
  totalOnJob: number;
  totalOnVacation: number;
  totalOppointess: number;
  totalDelegtes: number;
  total: number;

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private HRService: HRService,
    private dialogRef: MatDialogRef<AddHumanResorceAcademiicStructureComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: HR_AcademicStaffAll) {
      if (data == null) {
        this.HR_AcademicStaffAll = null;
        this.collegeID = '';
        this.cMajorsID = '';
      
        this.numberOfProf = 0;
        this.numberOfProf_Loaned = 0;
        this.numberOfProfDelegated = 0;
        this.sumOfPro = 0;
        this.numberOfAss_Prof = 0;
        this.numberOfAss_Prof_Loaned = 0;
        this.numberOfAss_Prof_Delegated = 0;
        this.sumOfAss_Pro = 0;
        this.numberOfTeasher = 0;
        this.numberOfTeasher_Loaned = 0;
        this.numberOfTeasher_Delegated = 0;
        this.sumOfTeashers = 0;
        this.totalOnJob = 0;
        this.totalOnVacation = 0;
        this.totalOppointess = 0;
        this.totalDelegtes = 0;
        this.total = 0;

      } else
      {
        this.HR_AcademicStaffAll = data;
        this.collegeID = data.collegeID;
        this.cMajorsID = data.cMajorsID;
        this.numberOfProf = data.numberOfProf;
        this.numberOfProf_Loaned = data.numberOfProf_Loaned;
        this.numberOfProfDelegated = data.numberOfProfDelegated;
        this.sumOfPro = data.sumOfPro;
        this.numberOfAss_Prof = data.numberOfAss_Prof;
        this.numberOfAss_Prof_Loaned = data.numberOfAss_Prof_Loaned;
        this.numberOfAss_Prof_Delegated = data.numberOfAss_Prof_Delegated;
        this.sumOfAss_Pro = data.sumOfAss_Pro;
        this.numberOfTeasher = data.numberOfTeasher;
        this.numberOfTeasher_Loaned = data.numberOfTeasher_Loaned;
        this.numberOfTeasher_Delegated = data.numberOfTeasher_Delegated;
        this.sumOfTeashers = data.sumOfTeashers;
        this.totalOnJob = data.totalOnJob;
        this.totalOnVacation = data.totalOnVacation;
        this.totalOppointess = data.totalOppointess;
        this.totalDelegtes = data.totalDelegtes;
        this.total = data.total;

      }

      this.AddHRFormFour = fb.group({
        College: [this.collegeID, Validators.required ],
        ICMajors: [this.cMajorsID, Validators.required],
        numberOfProf: [this.numberOfProf ,Validators.required],
        numberOfProf_Loaned:[this.numberOfProf_Loaned ,Validators.required],
        numberOfProfDelegated:[this.numberOfProfDelegated ,Validators.required],
        sumOfPro:[this.sumOfPro ,Validators.required],
        numberOfAss_Prof:[this.numberOfAss_Prof ,Validators.required],
        numberOfAss_Prof_Loaned:[this.numberOfAss_Prof_Loaned ,Validators.required],
        numberOfAss_Prof_Delegated:[this.numberOfAss_Prof_Delegated ,Validators.required],
        sumOfAss_Pro:[this.sumOfAss_Pro ,Validators.required],
        numberOfTeasher:[this.numberOfTeasher ,Validators.required],
        numberOfTeasher_Loaned:[this.numberOfTeasher_Loaned ,Validators.required],
        numberOfTeasher_Delegated:[this.numberOfTeasher_Delegated ,Validators.required],
        sumOfTeashers:[this.sumOfTeashers ,Validators.required],
        totalOnJob:[this.totalOnJob ,Validators.required],
        totalOnVacation:[this.totalOnVacation ,Validators.required],
        totalOppointess:[this.totalOppointess ,Validators.required],
        totalDelegtes:[this.totalDelegtes ,Validators.required],
        total:[this.total ,Validators.required],
             
      })
     }
     get f()
     {
       return this.AddHRFormFour.controls;
     }
       ngOnInit() {
        this.LoadCollegeData();
        this.LoadMajorData();
     }
       Cancel() {
         this.dialogRef.close();
       }
       LoadMajorData() {
        this.CollegeBasicDataService.GetAllMajor().subscribe((data: ICMajors) => {
          this.ICMajors = data;
          console.log(this.ICMajors);
       });
      }
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
       
      }
       saveData(): void {
         if (this.HR_AcademicStaffAll == null) {
             let HR_AcademicStaffAll = {
              collegeID: this.AddHRFormFour.controls['College'].value,
              cMajorsID : this.AddHRFormFour.get('ICMajors').value,
              numberOfProf :this.AddHRFormFour.get('numberOfProf').value,
              numberOfProf_Loaned :this.AddHRFormFour.get('numberOfProf_Loaned').value,
              numberOfProfDelegated :this.AddHRFormFour.get('numberOfProfDelegated').value,
              sumOfPro :this.AddHRFormFour.get('sumOfPro').value,
              numberOfAss_Prof :this.AddHRFormFour.get('numberOfAss_Prof').value,
              numberOfAss_Prof_Loaned :this.AddHRFormFour.get('numberOfAss_Prof_Loaned').value,
              numberOfAss_Prof_Delegated :this.AddHRFormFour.get('numberOfAss_Prof_Delegated').value,
              sumOfAss_Pro :this.AddHRFormFour.get('sumOfAss_Pro').value,
              numberOfTeasher :this.AddHRFormFour.get('numberOfTeasher').value,
              numberOfTeasher_Loaned :this.AddHRFormFour.get('numberOfTeasher_Loaned').value,
              numberOfTeasher_Delegated :this.AddHRFormFour.get('numberOfTeasher_Delegated').value,
              sumOfTeashers :this.AddHRFormFour.get('sumOfTeashers').value,
              totalOnJob :this.AddHRFormFour.get('totalOnJob').value,
              totalOnVacation :this.AddHRFormFour.get('totalOnVacation').value,
              totalOppointess :this.AddHRFormFour.get('totalOppointess').value,
              totalDelegtes :this.AddHRFormFour.get('totalDelegtes').value,
              total :this.AddHRFormFour.get('total').value,
             };
             this.HRService.CreateHR_AcademicStaffAll(HR_AcademicStaffAll)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let HR_AcademicStaffAll = {
            hR_AcademicStaffAllID : this.HR_AcademicStaffAll.hR_AcademicStaffAllID,
            collegeID: this.AddHRFormFour.controls['College'].value,
            cMajorsID : this.AddHRFormFour.get('ICMajors').value,
            numberOfProf :this.AddHRFormFour.get('numberOfProf').value,
            numberOfProf_Loaned :this.AddHRFormFour.get('numberOfProf_Loaned').value,
            numberOfProfDelegated :this.AddHRFormFour.get('numberOfProfDelegated').value,
            sumOfPro :this.AddHRFormFour.get('sumOfPro').value,
            numberOfAss_Prof :this.AddHRFormFour.get('numberOfAss_Prof').value,
            numberOfAss_Prof_Loaned :this.AddHRFormFour.get('numberOfAss_Prof_Loaned').value,
            numberOfAss_Prof_Delegated :this.AddHRFormFour.get('numberOfAss_Prof_Delegated').value,
            sumOfAss_Pro :this.AddHRFormFour.get('sumOfAss_Pro').value,
            numberOfTeasher :this.AddHRFormFour.get('numberOfTeasher').value,
            numberOfTeasher_Loaned :this.AddHRFormFour.get('numberOfTeasher_Loaned').value,
            numberOfTeasher_Delegated :this.AddHRFormFour.get('numberOfTeasher_Delegated').value,
            sumOfTeashers :this.AddHRFormFour.get('sumOfTeashers').value,
            totalOnJob :this.AddHRFormFour.get('totalOnJob').value,
            totalOnVacation :this.AddHRFormFour.get('totalOnVacation').value,
            totalOppointess :this.AddHRFormFour.get('totalOppointess').value,
            totalDelegtes :this.AddHRFormFour.get('totalDelegtes').value,
            total :this.AddHRFormFour.get('total').value,
          };

          console.log(HR_AcademicStaffAll);

          this.HRService.UpdateHR_AcademicStaffAll(HR_AcademicStaffAll)
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
       