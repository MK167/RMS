import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { ICorrectiveActionDTO } from '../../Models/RMS-Models/ICorrectiveActionDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-academics-program8',
  templateUrl: './add-academics-program8.component.html',
  styleUrls: ['./add-academics-program8.component.css']
})
export class AddAcademicsProgram8Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddCorrectiveActionForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  _programID: string;
  _correctActions: string;
  //
  Program: ICPrograms;
  College: ICollege;
  ICorrectiveActionDTO: ICorrectiveActionDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram8Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICorrectiveActionDTO) {
      if (data == null) {
        this.ICorrectiveActionDTO = null;
        this._collegeID = '';
        this._programID = '';
        this._correctActions = '';
      } else {
        this.ICorrectiveActionDTO = data;
        this._collegeID = data.collegeID;
        this._programID = data.programID;
        this._correctActions = data.correctActions;
      }

      this.AddCorrectiveActionForm = fb.group({
        College: [this._collegeID, Validators.required],
        Program: [this._programID, Validators.required ],
        Action: [this._correctActions, Validators.required ],
      })
     }
     get f()
{
       return this.AddCorrectiveActionForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadProgramData();
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
       LoadProgramData() {
        this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
          this.Program = data;
          console.log(this.Program);
       });
      }
       saveData(): void {
         if (this.ICorrectiveActionDTO == null) {
             let NewCorrectiveAction = {
              collegeID : this.AddCorrectiveActionForm.get('College').value,
              programID : this.AddCorrectiveActionForm.get('Program').value,
              correctActions : this.AddCorrectiveActionForm.get('Action').value,
             };
             this.Academics.CreateCorrectiveAction(NewCorrectiveAction)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewCorrectiveAction = {
            correctiveActionID : this.ICorrectiveActionDTO.correctiveActionID,
            collegeID : this.AddCorrectiveActionForm.get('College').value,
            programID : this.AddCorrectiveActionForm.get('Program').value,
            correctActions : this.AddCorrectiveActionForm.get('Action').value,
          };

          console.log(NewCorrectiveAction);

          this.Academics.UpdateCorrectiveAction(NewCorrectiveAction)
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
