import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IStudyPlanDTO } from '../../Models/RMS-Models/IStudyPlanDTO';
import { IStudyPlanItemDTO } from '../../Models/RMS-Models/IStudyPlanItemDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-academics-program13',
  templateUrl: './add-academics-program13.component.html',
  styleUrls: ['./add-academics-program13.component.css']
})
export class AddAcademicsProgram13Component implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddStudyPlanForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  _studyPlanItemID: string;
  answer: any;
  //
  IStudyPlanItemDTO: IStudyPlanItemDTO;
  College: ICollege;
  IStudyPlanDTO: IStudyPlanDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram13Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IStudyPlanDTO) {
      if (data == null) {
        this.IStudyPlanDTO = null;
        this._collegeID = '';
        this._studyPlanItemID = '';
        this.answer = '';
      } else {
        this.IStudyPlanDTO = data;
        this._collegeID = data.collegeID;
        this._studyPlanItemID = data.studyPlanItemID;
        this.answer = data.answer;
      }

      this.AddStudyPlanForm = fb.group({
        College: [this._collegeID, Validators.required],
        _studyPlanItemID: [this._studyPlanItemID, Validators.required ],
        answer: [this.answer, Validators.required ],
      })
     }
     get f()
{
       return this.AddStudyPlanForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadStudyPlanItemsData();
     }


       Cancel() {
         this.dialogRef.close();
       }

       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          //console.log(this.College);
       });
      }
       LoadStudyPlanItemsData() {
        this.Academics.GetAllStudyPlanItem(sessionStorage.getItem('CollegeID')).subscribe((data: IStudyPlanItemDTO) => {
          this.IStudyPlanItemDTO = data;
          console.log(this.IStudyPlanItemDTO);
       });
      }
       saveData(): void {
         if (this.IStudyPlanDTO == null) {
             let NewStudyPlan = {
              collegeID : this.AddStudyPlanForm.get('College').value,
              studyPlanItemID : this.AddStudyPlanForm.get('_studyPlanItemID').value,
              answer : this.AddStudyPlanForm.get('answer').value,
             };
             this.Academics.CreateStudyPlan(NewStudyPlan)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewStudyPlan = {
            studyPlanID : this.IStudyPlanDTO.studyPlanID,
            collegeID : this.AddStudyPlanForm.get('College').value,
            studyPlanItemID : this.AddStudyPlanForm.get('_studyPlanItemID').value,
            answer : this.AddStudyPlanForm.get('answer').value,
          };

          console.log(NewStudyPlan);

          this.Academics.UpdateStudyPlan(NewStudyPlan)
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
