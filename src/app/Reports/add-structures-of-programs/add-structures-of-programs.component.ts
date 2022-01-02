import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { ICPrograms } from '../../Models/RMS-Models/ICPrograms';
import { IMoodleDTO } from '../../Models/RMS-Models/IMoodleDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-structures-of-programs',
  templateUrl: './add-structures-of-programs.component.html',
  styleUrls: ['./add-structures-of-programs.component.css']
})
export class AddStructuresOfProgramsComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddMoodleForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  collegeID: string;
  programID: string;
  numberOfCourses: any;
  numberOfActiveCourses: any;
  percentage: any;
  collegeDecisions: string;
  Program: ICPrograms;
  College: ICollege;
  IMoodleDTO: IMoodleDTO;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddStructuresOfProgramsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IMoodleDTO) {
      if (data == null) {
        this.IMoodleDTO = null;
        this.collegeID  = '';
        this.programID  = '';
        this.numberOfCourses  = '';
        this.numberOfActiveCourses  = '';
        this.percentage  = '';
        this.collegeDecisions  = '';
      } else {
        this.IMoodleDTO = data;
        this.collegeID = data.collegeID;
        this.programID = data.programID;
        this.numberOfCourses = data.numberOfCourses;
        this.numberOfActiveCourses = data.numberOfActiveCourses;
        this.percentage = data.percentage;
        this.collegeDecisions = data.collegeDecisions;
      }

      this.AddMoodleForm = fb.group({
        College: [this.collegeID, Validators.required],
        Program: [this.programID, Validators.required ],
        numberOfCourses: [this.numberOfCourses, Validators.required ],
        numberOfActiveCourses: [this.numberOfActiveCourses, Validators.required ],
        percentage: [this.percentage, Validators.required ],
        collegeDecisions: [this.collegeDecisions, Validators.required ]
      });
     }
     get f() {
       return this.AddMoodleForm.controls;
     }
      ngOnInit() {
        this.LoadCollegeData();
        this.LoadProgram();
      }
       Cancel() {
         this.dialogRef.close();
      }
       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
       });
      }
       LoadProgram() {
        this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
          this.Program = data;
       });
      }
       saveData(): void {
         if (this.IMoodleDTO == null) {
             let NewMoodle = {
              collegeID : this.AddMoodleForm.get('College').value,
              programID : this.AddMoodleForm.get('Program').value,
              numberOfCourses : this.AddMoodleForm.get('numberOfCourses').value,
              numberOfActiveCourses : this.AddMoodleForm.get('numberOfActiveCourses').value,
              percentage : this.AddMoodleForm.get('percentage').value,
              collegeDecisions : this.AddMoodleForm.get('collegeDecisions').value,
             };
             this.Academics.CreateMoodle(NewMoodle)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewMoodle = {
            moodleID : this.IMoodleDTO.moodleID,
            collegeID : this.AddMoodleForm.get('College').value,
            programID : this.AddMoodleForm.get('Program').value,
            numberOfCourses : this.AddMoodleForm.get('numberOfCourses').value,
            numberOfActiveCourses : this.AddMoodleForm.get('numberOfActiveCourses').value,
            percentage : this.AddMoodleForm.get('percentage').value,
            collegeDecisions : this.AddMoodleForm.get('collegeDecisions').value
          };

          console.log(NewMoodle);

          this.Academics.UpdateMoodle(NewMoodle)
             .subscribe(
               response => {
                 this.dialogRef.close();
               },
               error => {
                 console.log(error);
               });
         }
      }
        closeDialog() {
            this.dialogRef.close(false);
      }
}
