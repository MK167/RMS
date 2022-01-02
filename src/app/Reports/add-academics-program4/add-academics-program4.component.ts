import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IAcademicsStructureDTO } from 'app/Models/RMS-Models/IAcademicsStructureDTO';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program4',
  templateUrl: './add-academics-program4.component.html',
  styleUrls: ['./add-academics-program4.component.css']
})
export class AddAcademicsProgram4Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddAcademicStructureForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  _programID: string;
  _creditHours: any;
  _academicStandardsOfNationalAuthority: any;
  _academicRefferance: any;
  //
  Program: ICPrograms;
  _program: any;
  College: ICollege;
  _college: any;
  IAcademicsStructureDTO: IAcademicsStructureDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram4Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IAcademicsStructureDTO) {
      if (data == null) {
        this.IAcademicsStructureDTO = null;
        this._collegeID = '';
        this._programID = '';
        this._creditHours = '';
        this._academicStandardsOfNationalAuthority = '';
        this._academicRefferance = '';
      } else {
        this.IAcademicsStructureDTO = data;
        this._collegeID = data.collegeID;
        this._programID = data.programID;
        this._creditHours = data.creditHours;
        this._academicStandardsOfNationalAuthority = data.academicStandardsOfNationalAuthority;
        this._academicRefferance = data.academicRefferance;
      }

      this.AddAcademicStructureForm = fb.group({
        College: [this._collegeID, Validators.required],
        Program: [this._programID, Validators.required ],
        CreditHours: [this._creditHours, Validators.required ],
        AcademicStandardsOfNationalAuthority: [this._academicStandardsOfNationalAuthority, Validators.required ],
        AcademicRefferance: [this._academicRefferance, Validators.required ],
      })
     }
     get f()
{
       return this.AddAcademicStructureForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadProgramData();
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
       LoadProgramData() {
        this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
          this.Program = data;
          console.log(this.Program);
       });
      }
       saveData(): void {
         if (this.IAcademicsStructureDTO == null) {
             let NewAcademicsStructure = {
              collegeID : this.AddAcademicStructureForm.get('College').value,
              programID : this.AddAcademicStructureForm.get('Program').value,
              creditHours : this.AddAcademicStructureForm.get('CreditHours').value,
              academicStandardsOfNationalAuthority : this.AddAcademicStructureForm.get('AcademicStandardsOfNationalAuthority').value,
              academicRefferance : this.AddAcademicStructureForm.get('AcademicRefferance').value,
             };
             this.Academics.CreateAcademicsStructure(NewAcademicsStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAcademicsStructure = {
            academicsStructureID : this.IAcademicsStructureDTO.academicsStructureID,
            collegeID : this.AddAcademicStructureForm.get('College').value,
            programID : this.AddAcademicStructureForm.get('Program').value,
            creditHours : this.AddAcademicStructureForm.get('CreditHours').value,
            academicStandardsOfNationalAuthority : this.AddAcademicStructureForm.get('AcademicStandardsOfNationalAuthority').value,
            academicRefferance : this.AddAcademicStructureForm.get('AcademicRefferance').value,
          };

          console.log(NewAcademicsStructure);

          this.Academics.UpdateAcademicsStructure(NewAcademicsStructure)
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
