import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { INumberOfCoursesDTO } from '../../Models/RMS-Models/INumberOfCoursesDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program11',
  templateUrl: './add-academics-program11.component.html',
  styleUrls: ['./add-academics-program11.component.css']
})
export class AddAcademicsProgram11Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddNumberofCoursesForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  numberofCourses: any;
  //
  College: ICollege;
  INumberOfCoursesDTO: INumberOfCoursesDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram11Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: INumberOfCoursesDTO) {
      if (data == null) {
        this.INumberOfCoursesDTO = null;
        this._collegeID = '';
        this.numberofCourses = '';
      } else {
        this.INumberOfCoursesDTO = data;
        this._collegeID = data.collegeID;
        this.numberofCourses = data.numberofCourses;

      }

      this.AddNumberofCoursesForm = fb.group({
        College: [this._collegeID, Validators.required],
        numberofCourses: [this.numberofCourses, Validators.required ],
      })
     }
     get f()
{
       return this.AddNumberofCoursesForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
     }


       Cancel() {
         this.dialogRef.close();
       }

       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
      }
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.INumberOfCoursesDTO == null) {
             let NewInter = {
              collegeID : this.AddNumberofCoursesForm.get('College').value,
              numberofCourses : this.AddNumberofCoursesForm.get('numberofCourses').value,
             };
             this.Academics.CreateNumberOfCoursesDTO(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            numberOfCoursesID : this.INumberOfCoursesDTO.numberOfCoursesID,
            collegeID : this.AddNumberofCoursesForm.get('College').value,
            numberofCourses : this.AddNumberofCoursesForm.get('numberofCourses').value,
          };

          console.log(NewInter);

          this.Academics.UpdateNumberOfCoursesDTO(NewInter)
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
