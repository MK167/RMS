import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { ICPrograms } from 'app/Models/RMS-Models/ICPrograms';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { IElectronicResourcesDTO } from '../../Models/RMS-Models/IElectronicResourcesDTO';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-academics-program14',
  templateUrl: './add-academics-program14.component.html',
  styleUrls: ['./add-academics-program14.component.css']
})
export class AddAcademicsProgram14Component implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddERForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  collegeID: string;
  programID: string;
  ebsco: any;
  mcGrawHill: any;
  elsevier: any;
  ekb: any;
  others: string;
  //
  Program: ICPrograms;
  College: ICollege;
  IElectronicResourcesDTO: IElectronicResourcesDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram14Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IElectronicResourcesDTO) {
      if (data == null) {
        this.IElectronicResourcesDTO = null;
        this.collegeID = '';
        this.programID = '';
        this.ebsco = '';
        this.mcGrawHill = '';
        this.elsevier = '';
        this.ekb = '';
        this.others = '';
      } else {
        this.IElectronicResourcesDTO = data;
        this.collegeID = data.collegeID;
        this.programID = data.programID;
        this.ebsco = data.ebsco;
        this.mcGrawHill = data.mcGrawHill;
        this.elsevier = data.elsevier;
        this.ekb = data.ekb;
        this.others = data.others;
      }

      this.AddERForm = fb.group({
        College: [this.collegeID, Validators.required],
        Program: [this.programID, Validators.required ],
        ebsco: [this.ebsco, Validators.required ],
        mcGrawHill: [this.mcGrawHill, Validators.required ],
        elsevier: [this.elsevier, Validators.required ],
        ekb: [this.ekb, Validators.required ],
        others: [this.others, Validators.required ],
      })
     }
     get f()
{
       return this.AddERForm.controls;
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
         if (this.IElectronicResourcesDTO == null) {
             let NewAcademicsStructure = {
              collegeID : this.AddERForm.get('College').value,
              programID : this.AddERForm.get('Program').value,
              ebsco: this.AddERForm.get('ebsco').value,
              mcGrawHill: this.AddERForm.get('mcGrawHill').value,
              elsevier: this.AddERForm.get('elsevier').value,
              ekb: this.AddERForm.get('ekb').value,
              others: this.AddERForm.get('others').value
             };
             this.Academics.CreateElectronicResources(NewAcademicsStructure)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAcademicsStructure = {
            electronicResourcesID : this.IElectronicResourcesDTO.electronicResourcesID,
            collegeID : this.AddERForm.get('College').value,
            programID : this.AddERForm.get('Program').value,
            ebsco: this.AddERForm.get('ebsco').value,
            mcGrawHill: this.AddERForm.get('mcGrawHill').value,
            elsevier: this.AddERForm.get('elsevier').value,
            ekb: this.AddERForm.get('ekb').value,
            others: this.AddERForm.get('others').value
          };

          console.log(NewAcademicsStructure);

          this.Academics.UpdateElectronicResources(NewAcademicsStructure)
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
