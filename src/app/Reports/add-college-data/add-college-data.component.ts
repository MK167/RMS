import { ICollege } from './../../Models/RMS-Models/ICollege';
import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import * as _moment from 'moment';

declare var $: any;


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-college-data',
  templateUrl: './add-college-data.component.html',
  styleUrls: ['./add-college-data.component.css']
})

export class AddCollegeDataComponent implements OnInit {
  
  matcher = new MyErrorStateMatcher();
  AddCollegeForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;
  College : ICollege;

  _College: string;
  _StartDate: string;
  _RepublicanDecision: string;
  _NumberOfScientificMajor: any;
  _NumberOfCourses: any;
  _StudyStartDate: string;
  _StudyDuration: string;
  _StudyLanguages: string;

  constructor(private CollegeBasicDataService: CollegeBasicDataService,
    private dialogRef: MatDialogRef<AddCollegeDataComponent>, fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICollege) {
      if (data == null) {
        this.College = null;
        this._College = '';
        this._StartDate= '';
        this._RepublicanDecision= '';
        this._NumberOfScientificMajor = '';
        this._NumberOfCourses = '';
        this._StudyStartDate= '';
        this._StudyDuration= '';
        this._StudyLanguages= '';
      } 
      else
      {
        this.College = data;
        console.log(this.College);
        this._College = data.collegeName;
        this._StartDate= data.startDate;
        this._RepublicanDecision= data.republicanDecision;
        this._NumberOfScientificMajor = data.numberOfScientificMajor;
        this._NumberOfCourses = data.numberOfCourses;
        this._StudyStartDate= data.studyStartDate;
        this._StudyDuration= data.studyDuration;
        this._StudyLanguages= data.studyLanguages;
      }

      this.AddCollegeForm = fb.group({
        CollegeName: [this._College, Validators.required],
        cDate: [this._StartDate, Validators.required ],
        CollegeDes: [this._RepublicanDecision, Validators.required ],
        NumberofMajors: [this._NumberOfScientificMajor, Validators.required ],
        NumberofStudyPrograms: [this._NumberOfCourses, Validators.required ],
        StartDate: [this._StudyStartDate, Validators.required ],
        StudyLang: [this._StudyLanguages, Validators.required ],
        StudyDuration:[this._StudyDuration, Validators.required ],
      })
     }
    
    
     get f()
     {
       return this.AddCollegeForm.controls;
     }

       ngOnInit() {
        // this.LoadData();
        // this.LoadCollegeData();
     }


       Cancel() {
         this.dialogRef.close();
       }
       
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
       
      }



       saveData(): void {
         if (this.College == null) {
             let NewCollege = {
            collegeName : this.AddCollegeForm.get('CollegeName').value,
            startDate: this.AddCollegeForm.get('cDate').value,
            republicanDecision: this.AddCollegeForm.get('CollegeDes').value,
            numberOfScientificMajor: this.AddCollegeForm.get('NumberofMajors').value,
            numberOfCourses: this.AddCollegeForm.get('NumberofStudyPrograms').value,
            studyStartDate: this.AddCollegeForm.get('StartDate').value,
            studyDuration: this.AddCollegeForm.get('StudyDuration').value,
            studyLanguages: this.AddCollegeForm.get('StudyLang').value
             };

             this.CollegeBasicDataService.CreateCollege(NewCollege)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } 
         else
         {
          let NewCollege = {
            collegeID : this.College.collegeID,
            collegeName : this.AddCollegeForm.get('CollegeName').value,
            startDate: this.AddCollegeForm.get('cDate').value,
            republicanDecision: this.AddCollegeForm.get('CollegeDes').value,
            numberOfScientificMajor: this.AddCollegeForm.get('NumberofMajors').value,
            numberOfCourses: this.AddCollegeForm.get('NumberofStudyPrograms').value,
            studyStartDate: this.AddCollegeForm.get('StartDate').value,
            studyDuration: this.AddCollegeForm.get('StudyDuration').value,
            studyLanguages: this.AddCollegeForm.get('StudyLang').value
          };

          console.log(NewCollege);

          this.CollegeBasicDataService.UpdateCollege(NewCollege)
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
       