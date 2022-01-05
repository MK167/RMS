import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { InternationalAccreditationDTO } from '../../Models/RMS-Models/InternationalAccreditationDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-academics-program15',
  templateUrl: './add-academics-program15.component.html',
  styleUrls: ['./add-academics-program15.component.css']
})
export class AddAcademicsProgram15Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddInternationalAccreditationForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  _collegeID: string;
  internationalAccreditationName: string;
  //
  College: ICollege;
  InternationalAccreditationDTO: InternationalAccreditationDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram15Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: InternationalAccreditationDTO) {
      if (data == null) {
        this.InternationalAccreditationDTO = null;
        this._collegeID = '';
        this.internationalAccreditationName = '';
      } else {
        this.InternationalAccreditationDTO = data;
        this._collegeID = data.collegeID;
        this.internationalAccreditationName = data.internationalAccreditationName;

      }

      this.AddInternationalAccreditationForm = fb.group({
        College: [this._collegeID, Validators.required],
        internationalAccreditationName: [this.internationalAccreditationName, Validators.required ],
      })
     }
     get f()
{
       return this.AddInternationalAccreditationForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
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
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.InternationalAccreditationDTO == null) {
             let NewInter = {
              collegeID : this.AddInternationalAccreditationForm.get('College').value,
              internationalAccreditationName : this.AddInternationalAccreditationForm.get('internationalAccreditationName').value,
             };
             this.Academics.CreateInternationalAccreditation(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            internationalAccreditationID : this.InternationalAccreditationDTO.internationalAccreditationID,
            collegeID : this.AddInternationalAccreditationForm.get('College').value,
            internationalAccreditationName : this.AddInternationalAccreditationForm.get('internationalAccreditationName').value,
          };

          console.log(NewInter);

          this.Academics.UpdateInternationalAccreditation(NewInter)
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
