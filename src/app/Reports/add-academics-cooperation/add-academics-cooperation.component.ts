import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IFieldTrainingDTO } from '../../Models/RMS-Models/IFieldTrainingDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-academics-cooperation',
  templateUrl: './add-academics-cooperation.component.html',
  styleUrls: ['./add-academics-cooperation.component.css']
})
export class AddAcademicsCooperationComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddFieldTrainingForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  collegeID: string;
  trainingName: any;
  //
  College: ICollege;
  IFieldTrainingDTO: IFieldTrainingDTO;
  //

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsCooperationComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IFieldTrainingDTO) {
      if (data == null) {
        this.IFieldTrainingDTO = null;
        this.collegeID = '';
        this.trainingName = '';
      } else {
        this.IFieldTrainingDTO = data;
        this.collegeID = data.collegeID;
        this.trainingName = data.trainingName;

      }

      this.AddFieldTrainingForm = fb.group({
        College: [this.collegeID, Validators.required],
        trainingName: [this.trainingName, Validators.required ],
      })
     }
     get f()
{
       return this.AddFieldTrainingForm.controls;
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
         if (this.IFieldTrainingDTO == null) {
             let NewInter = {
              collegeID : this.AddFieldTrainingForm.get('College').value,
              trainingName : this.AddFieldTrainingForm.get('trainingName').value,
             };
             this.Academics.CreateFieldTraining(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            fieldTrainingID : this.IFieldTrainingDTO.fieldTrainingID,
            collegeID : this.AddFieldTrainingForm.get('College').value,
            trainingName : this.AddFieldTrainingForm.get('trainingName').value,
          };

          console.log(NewInter);

          this.Academics.UpdateFieldTraining(NewInter)
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
