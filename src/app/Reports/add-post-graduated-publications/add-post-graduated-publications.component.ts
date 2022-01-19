import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { IScientificResearchDTO } from 'app/Models/RMS-Models/IScientificResearchDTO';
import { PGServicesService } from 'app/Services/RMS-Services/pg-services.service';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { AddPostGraduatedProgram3Component } from '../add-post-graduated-program3/add-post-graduated-program3.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-post-graduated-publications',
  templateUrl: './add-post-graduated-publications.component.html',
  styleUrls: ['./add-post-graduated-publications.component.css']
})
export class AddPostGraduatedPublicationsComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddSRForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IPGStructure: string;
  collegeID: string;
  programID: string;
  numberOfResearches: number;
  impactFactorJournal: string;
  filePath: string; 
  //
  Program: ICPrograms;
  College: ICollege;
  IScientificResearchDTO: IScientificResearchDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private PG: PGServicesService,
    private dialogRef: MatDialogRef<AddPostGraduatedProgram3Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IScientificResearchDTO) {
      if (data == null) {
        this.IScientificResearchDTO = null;
        this.collegeID = '';
        this.programID = '';
        this.impactFactorJournal = '';
        this.numberOfResearches = 0;
        this.filePath = '';
      } else {
        this.IScientificResearchDTO = data;
        this.collegeID = data.collegeID;
        this.impactFactorJournal = data.impactFactorJournal;
        this.numberOfResearches = data.numberOfResearches;
        this.filePath = data.filePath;
     
      }

      this.AddSRForm = fb.group({
        College: [this.collegeID, Validators.required],
        // Program: [this.programID, Validators.required ],
        impactFactorJournal: [this.impactFactorJournal, Validators.required ],
        numberOfResearches: [this.numberOfResearches, Validators.required ],
        filePath: [this.filePath, Validators.required]
      })
     }
     get f()
{
       return this.AddSRForm.controls;
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
          // //console.log(this.College);
       });
      }
       LoadProgramData() {
        this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
          this.Program = data;
          // console.log(this.Program);
       });
      }
       saveData(): void {
         if (this.IScientificResearchDTO == null) {
             let NewPGStructure = {
              collegeID : this.AddSRForm.get('College').value,
              // programID : this.AddSRForm.get('Program').value,
              impactFactorJournal : this.AddSRForm.get('impactFactorJournal').value,
              numberOfResearches : this.AddSRForm.get('numberOfResearches').value,
              filePath : this.AddSRForm.get('filePath').value,
             };
             this.PG.CreateScientificResearch(NewPGStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewPGStructure = {
            scientificResearchID : this.IScientificResearchDTO.scientificResearchID,
            collegeID : this.AddSRForm.get('College').value,
            // programID : this.AddSRForm.get('Program').value,
            impactFactorJournal : this.AddSRForm.get('impactFactorJournal').value,
            numberOfResearches : this.AddSRForm.get('numberOfResearches').value,
            filePath : this.AddSRForm.get('filePath').value,

          };

          console.log(NewPGStructure);

          this.PG.UpdateScientificResearch(NewPGStructure)
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
