import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { ICo_opDTO } from '../../Models/RMS-Models/ICo_opDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program9',
  templateUrl: './add-academics-program9.component.html',
  styleUrls: ['./add-academics-program9.component.css']
})
export class AddAcademicsProgram9Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddCo_OPForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  _programID: string;
  _internationalUniversityName: string;
  _co_opType: string;
  _currentSituation: string;
  //
  Program: ICPrograms;
  College: ICollege;
  ICo_opDTO: ICo_opDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram9Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICo_opDTO) {
      if (data == null) {
        this.ICo_opDTO = null;
        this._collegeID = '';
        this._programID = '';
        this._internationalUniversityName = '';
        this._co_opType = '';
      } else {
        this.ICo_opDTO = data;
        this._collegeID = data.collegeID;
        this._programID = data.programID;
        this._internationalUniversityName = data.internationalUniversityName;
        this._co_opType = data.co_opType;
        this._currentSituation = data.currentSituation;
      }

      this.AddCo_OPForm = fb.group({
        College: [this._collegeID, Validators.required],
        Program: [this._programID, Validators.required ],
        _internationalUniversityName: [this._internationalUniversityName, Validators.required ],
        _co_opType: [this._co_opType, Validators.required ],
        _currentSituation: [this._currentSituation, Validators.required ],
      })
     }
     get f()
{
       return this.AddCo_OPForm.controls;
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
         if (this.ICo_opDTO == null) {
             let NewCo_OP = {
              collegeID : this.AddCo_OPForm.get('College').value,
              programID : this.AddCo_OPForm.get('Program').value,
              internationalUniversityName : this.AddCo_OPForm.get('_internationalUniversityName').value,
              co_opType : this.AddCo_OPForm.get('_co_opType').value,
              currentSituation : this.AddCo_OPForm.get('_currentSituation').value,
             };
             this.Academics.CreateCo_op(NewCo_OP)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewCo_OP = {
            co_opID : this.ICo_opDTO.co_opID,
            collegeID : this.AddCo_OPForm.get('College').value,
            programID : this.AddCo_OPForm.get('Program').value,
            internationalUniversityName : this.AddCo_OPForm.get('_internationalUniversityName').value,
            co_opType : this.AddCo_OPForm.get('_co_opType').value,
            currentSituation : this.AddCo_OPForm.get('_currentSituation').value,
          };

          console.log(NewCo_OP);

          this.Academics.UpdateCo_op(NewCo_OP)
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
