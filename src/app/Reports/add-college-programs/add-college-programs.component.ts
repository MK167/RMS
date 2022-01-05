import { ICollege } from './../../Models/RMS-Models/ICollege';
import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { ICPrograms } from './../../Models/RMS-Models/ICPrograms';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-college-programs',
  templateUrl: './add-college-programs.component.html',
  styleUrls: ['./add-college-programs.component.css']
})
export class AddCollegeProgramsComponent implements OnInit { 
  matcher = new MyErrorStateMatcher();
  AddCProgramsForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  _Program: string;
  _CollegeID: string;
  Program: ICPrograms;
  College: ICollege;

  constructor(private CollegeBasicDataService: CollegeBasicDataService,
    private dialogRef: MatDialogRef<AddCollegeProgramsComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ICPrograms) {
      if (data == null) {
        this.Program = null;
        this._Program = '';
        this._CollegeID = '';
      } else
      {
        this.Program = data;
        this._Program = data.programName;
        this._CollegeID = data.collegeID;
      }

      this.AddCProgramsForm = fb.group({
        CProgramName: [this._Program, Validators.required],
        College: [this._CollegeID, Validators.required ]
      })
     }
     get f()
     {
       return this.AddCProgramsForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
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



       saveData(): void {
         if (this.Program == null) {
             let NewProgram = {
              programName : this.AddCProgramsForm.get('CProgramName').value,
              collegeID: this.AddCProgramsForm.controls['College'].value,
             };
             this.CollegeBasicDataService.CreateProgram(NewProgram)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewProgram = {
            programID : this.Program.programID,
            programName : this.AddCProgramsForm.get('CProgramName').value,
            collegeID : this.AddCProgramsForm.get('College').value
          };

          console.log(NewProgram);

          this.CollegeBasicDataService.UpdateProgram(NewProgram)
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
       