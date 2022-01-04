import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { InActivePorgramProfessionalDiplomaDTO } from 'app/Models/RMS-Models/InActivePorgramProfessionalDiplomaDTO';
import { PGServicesService } from 'app/Services/RMS-Services/pg-services.service';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-post-graduated-deploma',
  templateUrl: './add-post-graduated-deploma.component.html',
  styleUrls: ['./add-post-graduated-deploma.component.css']
})
export class AddPostGraduatedDeplomaComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddDiplomaForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IPGStructure: string;
  collegeID: string;
  programID: string;
  name: string;
  flagType: number;
  
  //
  Program: ICPrograms;
  College: ICollege;
  InActivePorgramProfessionalDiplomaDTO: InActivePorgramProfessionalDiplomaDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private PG: PGServicesService,
    private dialogRef: MatDialogRef<AddPostGraduatedDeplomaComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: InActivePorgramProfessionalDiplomaDTO) {
      if (data == null) {
        this.InActivePorgramProfessionalDiplomaDTO = null;
        this.collegeID = '';
        this.programID = '';
        this.name = '';
        this.flagType = 0;
      } else {
        this.InActivePorgramProfessionalDiplomaDTO = data;
        this.collegeID = data.collegeID;
        this.programID = data.programID;
        this.name = data.name;
        this.flagType = data.flagType;
     
      }

      this.AddDiplomaForm = fb.group({
        College: [this.collegeID, Validators.required],
        Program: [this.programID, Validators.required ],
        name: [this.name, Validators.required ],
        // flagType: [this.flagType, Validators.required ],
     
      })
     }
     get f()
{
       return this.AddDiplomaForm.controls;
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
         if (this.InActivePorgramProfessionalDiplomaDTO == null) {
             let NewPGStructure = {
              collegeID : this.AddDiplomaForm.get('College').value,
              programID : this.AddDiplomaForm.get('Program').value,
              name : this.AddDiplomaForm.get('name').value,
              flagType : 1
             
             };
             this.PG.CreateInActivePorgramProfessionalDiploma(NewPGStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewPGStructure = {
            inActivePorgramProfessionalDiplomaID : this.InActivePorgramProfessionalDiplomaDTO.inActivePorgramProfessionalDiplomaID,
            collegeID : this.AddDiplomaForm.get('College').value,
            programID : this.AddDiplomaForm.get('Program').value,
            name : this.AddDiplomaForm.get('name').value,
            flagType : 1
     
          };

          console.log(NewPGStructure);

          this.PG.UpdateInActivePorgramProfessionalDiploma(NewPGStructure)
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
