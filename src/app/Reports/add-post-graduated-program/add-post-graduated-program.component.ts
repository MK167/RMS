import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { IActiveProgram } from '../../Models/RMS-Models/IActiveProgram';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { PGServicesService } from '../../Services/RMS-Services/pg-services.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-post-graduated-program',
  templateUrl: './add-post-graduated-program.component.html',
  styleUrls: ['./add-post-graduated-program.component.css']
})
export class AddPostGraduatedProgramComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddActiveProgramForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IPGStructure: string;
  collegeID: string;
  programID: string;
  numberOfRegisteredMasters: number;
  numberOfRegisteredDoctrate: number;
  numberOfRegisteredMastersForAlumni: number;
  numberOfRegisteredDoctrateForAlumni: number;
  //
  Program: ICPrograms;
  College: ICollege;
  IActiveProgram: IActiveProgram;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private PG: PGServicesService,
    private dialogRef: MatDialogRef<AddPostGraduatedProgramComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IActiveProgram) {
      if (data == null) {
        this.IActiveProgram = null;
        this.collegeID = '';
        this.programID = '';
        this.numberOfRegisteredMasters = 0;
        this.numberOfRegisteredDoctrate = 0;
        this.numberOfRegisteredMastersForAlumni = 0;
        this.numberOfRegisteredDoctrateForAlumni = 0;
      } else {
        this.IActiveProgram = data;
        this.collegeID = data.collegeID;
        this.programID = data.programID;
        this.numberOfRegisteredMasters = data.numberOfRegisteredMasters;
        this.numberOfRegisteredDoctrate = data.numberOfRegisteredDoctrate;
        this.numberOfRegisteredMastersForAlumni = data.numberOfRegisteredMastersForAlumni;
        this.numberOfRegisteredDoctrateForAlumni = data.numberOfRegisteredDoctrateForAlumni;
      }

      this.AddActiveProgramForm = fb.group({
        College: [this.collegeID, Validators.required],
        Program: [this.programID, Validators.required ],
        numberOfRegisteredMasters: [this.numberOfRegisteredMasters, Validators.required ],
        numberOfRegisteredDoctrate: [this.numberOfRegisteredDoctrate, Validators.required ],
        numberOfRegisteredMastersForAlumni: [this.numberOfRegisteredMastersForAlumni, Validators.required ],
        numberOfRegisteredDoctrateForAlumni: [this.numberOfRegisteredDoctrateForAlumni, Validators.required ],
      })
     }
     get f()
{
       return this.AddActiveProgramForm.controls;
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
          //console.log(this.College);
       });
      }
       LoadProgramData() {
        this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
          this.Program = data;
          console.log(this.Program);
       });
      }
       saveData(): void {
         if (this.IActiveProgram == null) {
             let NewPGStructure = {
              collegeID : this.AddActiveProgramForm.get('College').value,
              programID : this.AddActiveProgramForm.get('Program').value,
              numberOfRegisteredMasters : this.AddActiveProgramForm.get('numberOfRegisteredMasters').value,
              numberOfRegisteredDoctrate : this.AddActiveProgramForm.get('numberOfRegisteredDoctrate').value,
              numberOfRegisteredMastersForAlumni : this.AddActiveProgramForm.get('numberOfRegisteredMastersForAlumni').value,
              numberOfRegisteredDoctrateForAlumni : this.AddActiveProgramForm.get('numberOfRegisteredDoctrateForAlumni').value,
             };
             this.PG.CreateActiveProgram(NewPGStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewPGStructure = {
            activeProgramID : this.IActiveProgram.activeProgramID,
            collegeID : this.AddActiveProgramForm.get('College').value,
            programID : this.AddActiveProgramForm.get('Program').value,
            numberOfRegisteredMasters : this.AddActiveProgramForm.get('numberOfRegisteredMasters').value,
            numberOfRegisteredDoctrate : this.AddActiveProgramForm.get('numberOfRegisteredDoctrate').value,
            numberOfRegisteredMastersForAlumni : this.AddActiveProgramForm.get('numberOfRegisteredMastersForAlumni').value,
            numberOfRegisteredDoctrateForAlumni : this.AddActiveProgramForm.get('numberOfRegisteredDoctrateForAlumni').value,
          };

          console.log(NewPGStructure);

          this.PG.UpdateActiveProgram(NewPGStructure)
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
