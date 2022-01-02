import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { IStudentsNumberDTO } from 'app/Models/RMS-Models/IStudentsNumberDTO';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IScientificDegreesDTO } from '../../Models/RMS-Models/IScientificDegreesDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program7',
  templateUrl: './add-academics-program7.component.html',
  styleUrls: ['./add-academics-program7.component.css']
})
export class AddAcademicsProgram7Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddStudentNumberForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

_collegeID: string;
_programID: string;
_scientificDegreeID: string;
_numOfStd1: number;
_numOfStd2: number;
_numOfStd3: number;
_numOfStd4: number;
_numOfStd5: number;
_numOfStd6: number;
_sumOfStd: number;

  //
  Program: ICPrograms;
  scientificDegree: IScientificDegreesDTO;
  College: ICollege;
  IStudentsNumberDTO: IStudentsNumberDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram7Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IStudentsNumberDTO) {
      if (data == null) {
        this.IStudentsNumberDTO = null;
        this._collegeID = '';
        this._programID = '';
        this._scientificDegreeID = '';
        this._numOfStd1 =0;
        this._numOfStd2 =0;
        this._numOfStd3 =0;
        this._numOfStd4 =0;
        this._numOfStd5 =0;
        this._numOfStd6 =0;
        this._sumOfStd = this._numOfStd1 + this._numOfStd2 + this._numOfStd3 + 
        this._numOfStd4 + this._numOfStd5 + this._numOfStd6;
      } else {
        this.IStudentsNumberDTO = data;
        this._collegeID = data.collegeID;
        this._programID = data.programID;
        this._scientificDegreeID = data.scientificDegreeID;
        this._numOfStd1 = data.numOfStd1;
        this._numOfStd2 = data.numOfStd2;
        this._numOfStd3 = data.numOfStd3;
        this._numOfStd4 = data.numOfStd4;
        this._numOfStd5 = data.numOfStd5;
        this._numOfStd6 = data.numOfStd6;
        this._sumOfStd  = data.sumOfStd + data.numOfStd1 + data.numOfStd2 + data.numOfStd3 + data.numOfStd4 + data.numOfStd5 + data.numOfStd6;
      }

      this.AddStudentNumberForm = fb.group({
        College: [this._collegeID, Validators.required],
        Program: [this._programID, Validators.required ],
        scientificDegree: [this._scientificDegreeID, Validators.required ],
        Std_One: [this._numOfStd1, Validators.required ],
        Std_Two: [this._numOfStd2, Validators.required ],
        Std_Three: [this._numOfStd3, Validators.required ],
        Std_Four: [this._numOfStd4, Validators.required ],
        Std_Five: [this._numOfStd5, Validators.required ],
        Std_Six: [this._numOfStd6, Validators.required ],
        Sum: [this._sumOfStd, Validators.required ]
      })
     }
     get f()
{
       return this.AddStudentNumberForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadProgramData();
        this.LoadScientificDegree();
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
      LoadScientificDegree() {
        this.Academics.GetAllScientificDegrees().subscribe((data: IScientificDegreesDTO) => {
          this.scientificDegree = data;
          console.log(this.scientificDegree);
       });
      }
       LoadProgramData() {
        this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
          this.Program = data;
          console.log(this.Program);
       });
      }
       saveData(): void {
         if (this.IStudentsNumberDTO == null) {
             let NewStdNumber = {
              collegeID : this.AddStudentNumberForm.get('College').value,
              programID : this.AddStudentNumberForm.get('Program').value,
              scientificDegreeID : this.AddStudentNumberForm.get('scientificDegree').value,
              numOfStd1 : this.AddStudentNumberForm.get('Std_One').value,
              numOfStd2 : this.AddStudentNumberForm.get('Std_Two').value,
              numOfStd3 : this.AddStudentNumberForm.get('Std_Three').value,
              numOfStd4 : this.AddStudentNumberForm.get('Std_Four').value,
              numOfStd5 : this.AddStudentNumberForm.get('Std_Five').value,
              numOfStd6 : this.AddStudentNumberForm.get('Std_Six').value,
              sumOfStd : this.AddStudentNumberForm.get('Sum').value + this.AddStudentNumberForm.get('Std_Six').value + this.AddStudentNumberForm.get('Std_One').value + this.AddStudentNumberForm.get('Std_Two').value + this.AddStudentNumberForm.get('Std_Three').value + this.AddStudentNumberForm.get('Std_Four').value + this.AddStudentNumberForm.get('Std_Five').value,
             };
             this.Academics.CreateStudentsNumber(NewStdNumber)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewStdNumber = {
            studentsNumberID : this.IStudentsNumberDTO.studentsNumberID,
            collegeID : this.AddStudentNumberForm.get('College').value,
            programID : this.AddStudentNumberForm.get('Program').value,
            scientificDegreeID : this.AddStudentNumberForm.get('scientificDegree').value,
            numOfStd1 : this.AddStudentNumberForm.get('Std_One').value,
            numOfStd2 : this.AddStudentNumberForm.get('Std_Two').value,
            numOfStd3 : this.AddStudentNumberForm.get('Std_Three').value,
            numOfStd4 : this.AddStudentNumberForm.get('Std_Four').value,
            numOfStd5 : this.AddStudentNumberForm.get('Std_Five').value,
            numOfStd6 : this.AddStudentNumberForm.get('Std_Six').value,
            sumOfStd : this.AddStudentNumberForm.get('Sum').value
          };

          console.log(NewStdNumber);

          this.Academics.UpdateStudentsNumber(NewStdNumber)
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
