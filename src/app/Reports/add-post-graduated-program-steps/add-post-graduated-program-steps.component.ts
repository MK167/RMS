import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { PGServicesService } from 'app/Services/RMS-Services/pg-services.service';
import { ISummitionProgramDTO } from '../../Models/RMS-Models/ISummitionProgramDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-post-graduated-program-steps',
  templateUrl: './add-post-graduated-program-steps.component.html',
  styleUrls: ['./add-post-graduated-program-steps.component.css']
})
export class AddPostGraduatedProgramStepsComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddSumbitionForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IPGStructure: string;
  collegeID: string;
  programID: string;
  prepareStatements: any;
  highestApplicationForUniversities: any;
  sectorAgreement: any;
  agreementOfHighestUniversitie: any;
  agreementPrivateUniversity: any;
  //
  Program: ICPrograms;
  College: ICollege;
  ISummitionProgramDTO: ISummitionProgramDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private PG: PGServicesService,
    private dialogRef: MatDialogRef<AddPostGraduatedProgramStepsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ISummitionProgramDTO) {
      if (data == null) {
        this.ISummitionProgramDTO = null;
        this.collegeID = '';
        this.programID = '';
        this.prepareStatements = '';
        this.highestApplicationForUniversities = '';
        this.sectorAgreement = '';
        this.agreementOfHighestUniversitie = '';
        this.agreementPrivateUniversity = '';
      } else {
        this.ISummitionProgramDTO = data;
        this.collegeID = data.collegeID;
        this.programID = data.programID;
        this.prepareStatements = data.prepareStatements;
        this.highestApplicationForUniversities = data.highestApplicationForUniversities;
        this.sectorAgreement = data.sectorAgreement;
        this.agreementOfHighestUniversitie = data.agreementOfHighestUniversitie;
        this.agreementPrivateUniversity = data.agreementPrivateUniversity;
      }
      this.AddSumbitionForm = fb.group({
        College: [this.collegeID, Validators.required],
        Program: [this.programID, Validators.required ],
        prepareStatements: [this.prepareStatements, Validators.required ],
        highestApplicationForUniversities: [ this.highestApplicationForUniversities, Validators.required ],
        sectorAgreement: [ this.sectorAgreement, Validators.required ],
        agreementOfHighestUniversitie: [ this.agreementOfHighestUniversitie, Validators.required ],
        agreementPrivateUniversity: [ this.agreementPrivateUniversity, Validators.required ],
      });
     }
     get f()
{
       return this.AddSumbitionForm.controls;
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
         if (this.ISummitionProgramDTO == null) {
             let NewPGStructure = {
              collegeID : this.AddSumbitionForm.get('College').value,
              programID : this.AddSumbitionForm.get('Program').value,
              prepareStatements : this.AddSumbitionForm.get('prepareStatements').value,
              highestApplicationForUniversities : this.AddSumbitionForm.get('highestApplicationForUniversities').value,
              sectorAgreement : this.AddSumbitionForm.get('sectorAgreement').value,
              agreementOfHighestUniversitie : this.AddSumbitionForm.get('agreementOfHighestUniversitie').value,
              agreementPrivateUniversity : this.AddSumbitionForm.get('agreementPrivateUniversity').value,
             
             };
             this.PG.CreateSummitionProgram(NewPGStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewPGStructure = {
            summitionProgramID : this.ISummitionProgramDTO.summitionProgramID,
            collegeID : this.AddSumbitionForm.get('College').value,
            programID : this.AddSumbitionForm.get('Program').value,
            prepareStatements : this.AddSumbitionForm.get('prepareStatements').value,
            highestApplicationForUniversities : this.AddSumbitionForm.get('highestApplicationForUniversities').value,
            sectorAgreement : this.AddSumbitionForm.get('sectorAgreement').value,
            agreementOfHighestUniversitie : this.AddSumbitionForm.get('agreementOfHighestUniversitie').value,
            agreementPrivateUniversity : this.AddSumbitionForm.get('agreementPrivateUniversity').value,
          };

          console.log(NewPGStructure);

          this.PG.UpdateSummitionProgram(NewPGStructure)
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
