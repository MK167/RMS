import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccreditationRequirementsDTO } from 'app/Models/RMS-Models/IAccreditationRequirementsDTO';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { AddAcademicsProgram4Component } from '../add-academics-program4/add-academics-program4.component';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-academics-program5',
  templateUrl: './add-academics-program5.component.html',
  styleUrls: ['./add-academics-program5.component.css']
})

export class AddAcademicsProgram5Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddAccreditationRequirementsForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  _programID: string;
  _strategicPlanStatus: any;
  _report: any;
  _studyPlan: any;
  _programsDescribe: any;
  _programReport: any;
  _norms: any;
  _annualReport: any;
  //
  Program: ICPrograms;
  _program: any;
  College: ICollege;
  _college: any;
  IAccreditationRequirementsDTO: IAccreditationRequirementsDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram4Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IAccreditationRequirementsDTO) {
      if (data == null) {
        this.IAccreditationRequirementsDTO = null;
        this._collegeID = '';
        this._programID = '';
        this._strategicPlanStatus = '';
        this._report = '';
        this._studyPlan = '';
        this._programsDescribe = '';
        this._programReport = '';
        this._norms = '';
        this._annualReport = '';
      } else {
        this.IAccreditationRequirementsDTO = data;
        this._collegeID = data.collegeID;
        this._programID = data.programID;
        this._strategicPlanStatus = data.strategicPlanStatus;
        this._report = data.report;
        this._studyPlan = data.studyPlan;
        this._programsDescribe = data.programsDescribe;
        this._programReport = data.programReport;
        this._norms = data.norms;
        this._annualReport = data.annualReport;
      }

      this.AddAccreditationRequirementsForm = fb.group({
        College: [this._collegeID, Validators.required],
        Program: [this._programID, Validators.required ],
        strategicPlanStatus: [this._strategicPlanStatus, Validators.required ],
        report: [this._report, Validators.required ],
        studyPlan: [this._studyPlan, Validators.required ],
        programsDescribe: [this._programsDescribe, Validators.required ],
        programReport: [this._programReport, Validators.required ],
        norms: [this._norms, Validators.required ],
        annualReport: [this._annualReport, Validators.required ],
      })
     }
     get f()
{
       return this.AddAccreditationRequirementsForm.controls;
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
         if (this.IAccreditationRequirementsDTO == null) {
             let NewAccreditationRequirements = {
              collegeID : this.AddAccreditationRequirementsForm.get('College').value,
              programID : this.AddAccreditationRequirementsForm.get('Program').value,
              strategicPlanStatus : this.AddAccreditationRequirementsForm.get('strategicPlanStatus').value,
              report : this.AddAccreditationRequirementsForm.get('report').value,
              studyPlan : this.AddAccreditationRequirementsForm.get('studyPlan').value,
              programsDescribe : this.AddAccreditationRequirementsForm.get('programsDescribe').value,
              programReport : this.AddAccreditationRequirementsForm.get('programReport').value,
              norms : this.AddAccreditationRequirementsForm.get('norms').value,
              annualReport : this.AddAccreditationRequirementsForm.get('annualReport').value,
             };
             this.Academics.CreateAccreditationRequirements(NewAccreditationRequirements)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAccreditationRequirements = {
            accreditationRequirementsID : this.IAccreditationRequirementsDTO.accreditationRequirementsID,
            collegeID : this.AddAccreditationRequirementsForm.get('College').value,
            programID : this.AddAccreditationRequirementsForm.get('Program').value,
            strategicPlanStatus : this.AddAccreditationRequirementsForm.get('strategicPlanStatus').value,
            report : this.AddAccreditationRequirementsForm.get('report').value,
            studyPlan : this.AddAccreditationRequirementsForm.get('studyPlan').value,
            programsDescribe : this.AddAccreditationRequirementsForm.get('programsDescribe').value,
            programReport : this.AddAccreditationRequirementsForm.get('programReport').value,
            norms : this.AddAccreditationRequirementsForm.get('norms').value,
            annualReport : this.AddAccreditationRequirementsForm.get('annualReport').value,
          };

          console.log(NewAccreditationRequirements);

          this.Academics.UpdateAccreditationRequirements(NewAccreditationRequirements)
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
