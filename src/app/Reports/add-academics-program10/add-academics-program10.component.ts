import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IStudentTransferDTO } from '../../Models/RMS-Models/IStudentTransferDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program10',
  templateUrl: './add-academics-program10.component.html',
  styleUrls: ['./add-academics-program10.component.css']
})
export class AddAcademicsProgram10Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddStudentTransfer: FormGroup;
  IsFormValid = true;
  isSubmitted = false;
  
  // _IAcademicsStructure: string;
  _collegeID: string;
  studentNumber: any;
  //
  College: ICollege;
  IStudentTransferDTO: IStudentTransferDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram10Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IStudentTransferDTO) {
      if (data == null) {
        this.IStudentTransferDTO = null;
        this._collegeID = '';
        this.studentNumber = '';
      } else {
        this.IStudentTransferDTO = data;
        this._collegeID = data.collegeID;
        this.studentNumber = data.studentNumber;

      }

      this.AddStudentTransfer = fb.group({
        College: [this._collegeID, Validators.required],
        studentNumber: [this.studentNumber, Validators.required ],
      })
     }
     get f()
{
       return this.AddStudentTransfer.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
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
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.IStudentTransferDTO == null) {
             let NewInter = {
              collegeID : this.AddStudentTransfer.get('College').value,
              studentNumber : this.AddStudentTransfer.get('studentNumber').value,
             };
             this.Academics.CreateStudentTransfer(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            studentTransferID : this.IStudentTransferDTO.studentTransferID,
            collegeID : this.AddStudentTransfer.get('College').value,
            studentNumber : this.AddStudentTransfer.get('studentNumber').value,
          };

          console.log(NewInter);

          this.Academics.UpdateStudentTransfer(NewInter)
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
