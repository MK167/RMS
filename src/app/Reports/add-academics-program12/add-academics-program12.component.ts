import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { ICoursesCommitmentDTO } from '../../Models/RMS-Models/ICoursesCommitmentDTO';
import { AddAcademicsProgram11Component } from '../add-academics-program11/add-academics-program11.component';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program12',
  templateUrl: './add-academics-program12.component.html',
  styleUrls: ['./add-academics-program12.component.css']
})
export class AddAcademicsProgram12Component implements OnInit {
 matcher = new MyErrorStateMatcher();
  AddNumberofCoursesCommitForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  courseCommit: any;
  //
  College: ICollege;
  ICoursesCommitmentDTO: ICoursesCommitmentDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram11Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICoursesCommitmentDTO) {
      if (data == null) {
        this.ICoursesCommitmentDTO = null;
        this._collegeID = '';
        this.courseCommit = '';
      } else {
        this.ICoursesCommitmentDTO = data;
        this._collegeID = data.collegeID;
        this.courseCommit = data.courseCommit;

      }

      this.AddNumberofCoursesCommitForm = fb.group({
        College: [this._collegeID, Validators.required],
        courseCommit: [this.courseCommit, Validators.required ],
      })
     }
     get f()
{
       return this.AddNumberofCoursesCommitForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
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
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.ICoursesCommitmentDTO == null) {
             let NewInter = {
              collegeID : this.AddNumberofCoursesCommitForm.get('College').value,
              courseCommit : this.AddNumberofCoursesCommitForm.get('courseCommit').value,
             };
             this.Academics.CreateCoursesCommitment(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            coursesCommitmentID : this.ICoursesCommitmentDTO.coursesCommitmentID,
            collegeID : this.AddNumberofCoursesCommitForm.get('College').value,
            courseCommit : this.AddNumberofCoursesCommitForm.get('courseCommit').value,
          };

          console.log(NewInter);

          this.Academics.UpdateCoursesCommitment(NewInter)
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
