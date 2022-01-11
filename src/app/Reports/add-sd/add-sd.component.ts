import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { IScientificDegreesDTO } from './../../Models/RMS-Models/IScientificDegreesDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-sd',
  templateUrl: './add-sd.component.html',
  styleUrls: ['./add-sd.component.css']
})
export class AddSDComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddSDForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;
  scientificDegreesName: string;
  _CollegeID: string; 
  IScientificDegreesDTO: IScientificDegreesDTO;
  College : ICollege;

  constructor(private CollegeBasicDataService: CollegeBasicDataService,
    private AcademicStructureService: AcademicStructureService,
    private dialogRef: MatDialogRef<AddSDComponent>, fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IScientificDegreesDTO) {
    
      if (data == null) {
        this.IScientificDegreesDTO = null;
        this.scientificDegreesName = '';
        this._CollegeID = '';
      } else
      {
        this.IScientificDegreesDTO = data;
        this.scientificDegreesName = data.scientificDegreesName;
        this._CollegeID = data.collegeID;
      }

      this.AddSDForm = fb.group({
        scientificDegreesName: [this.scientificDegreesName, Validators.required],
        College: [this._CollegeID, Validators.required ]
      })
     }
    
    
     get f()
     {
       return this.AddSDForm.controls;
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
          // console.log(this.IScientificDegreesDTO);
       });
       
      }



       saveData(): void {
         if (this.IScientificDegreesDTO == null) {
             let NewIScientificDegreesDTO = {
              scientificDegreesName : this.AddSDForm.get('scientificDegreesName').value,
              collegeID: this.AddSDForm.controls['College'].value,
             };
             this.AcademicStructureService.CreateScientificDegrees(NewIScientificDegreesDTO)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewIScientificDegreesDTO = {
            scientificDegreesID : this.IScientificDegreesDTO.scientificDegreesID,
            scientificDegreesName : this.AddSDForm.get('scientificDegreesName').value,
            collegeID: this.AddSDForm.controls['College'].value,
          };

          console.log(NewIScientificDegreesDTO);

          this.AcademicStructureService.UpdateScientificDegrees(NewIScientificDegreesDTO)
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
       