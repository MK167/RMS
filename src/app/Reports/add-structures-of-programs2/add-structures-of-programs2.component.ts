import { Component, Inject, OnInit } from '@angular/core';
import { ITeachingAndLearningMethodsItemDTO } from '../../Models/RMS-Models/ITeachingAndLearningMethodsItemDTO';
import { ITeachingAndLearningMethodsDTO } from '../../Models/RMS-Models/ITeachingAndLearningMethodsDTO';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-structures-of-programs2',
  templateUrl: './add-structures-of-programs2.component.html',
  styleUrls: ['./add-structures-of-programs2.component.css']
})
export class AddStructuresOfPrograms2Component implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddTechForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  teachingAndLearningMethodsID: string;
  collegeID: string;
  teachingAndLearningMethodsItemID: string;
  applicable: any;

  //
  ITeachingAndLearningMethodsItemDTO: ITeachingAndLearningMethodsItemDTO;
  College: ICollege;
  ITeachingAndLearningMethodsDTO: ITeachingAndLearningMethodsDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddStructuresOfPrograms2Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ITeachingAndLearningMethodsDTO) {
      if (data == null) {
        this.ITeachingAndLearningMethodsDTO = null;
        this.collegeID = '';
        this.teachingAndLearningMethodsItemID = '';
        this.applicable = '';

      } else {
        this.ITeachingAndLearningMethodsDTO = data;
        this.collegeID = data.collegeID;
        this.teachingAndLearningMethodsItemID = data.teachingAndLearningMethodsItemID;
        this.applicable = data.applicable;
      }

      this.AddTechForm = fb.group({
        College: [this.collegeID, Validators.required],
        teachingAndLearningMethodsItemID: [this.teachingAndLearningMethodsItemID, Validators.required ],
        applicable: [this.applicable, Validators.required ]
      });
     }
     get f() {
       return this.AddTechForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadITeachingAndLearningMethodsItemDTO();
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
       LoadITeachingAndLearningMethodsItemDTO() {
        // tslint:disable-next-line: max-line-length
        this.Academics.GetAllTeachingAndLearningMethodsItem(sessionStorage.getItem('CollegeID')).subscribe((data: ITeachingAndLearningMethodsItemDTO) => {
          this.ITeachingAndLearningMethodsItemDTO = data;
       });
      }
       saveData(): void {
         if (this.ITeachingAndLearningMethodsDTO == null) {
             let NewTech = {
              collegeID : this.AddTechForm.get('College').value,
              teachingAndLearningMethodsItemID : this.AddTechForm.get('teachingAndLearningMethodsItemID').value,
              applicable : this.AddTechForm.get('applicable').value,
             };
             this.Academics.CreateTeachingAndLearningMethods(NewTech)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewTech = {
            teachingAndLearningMethodsID : this.ITeachingAndLearningMethodsDTO.teachingAndLearningMethodsID,
            collegeID : this.AddTechForm.get('College').value,
            teachingAndLearningMethodsItemID : this.AddTechForm.get('teachingAndLearningMethodsItemID').value,
            applicable : this.AddTechForm.get('applicable').value,
          };

          console.log(NewTech);

          this.Academics.UpdateTeachingAndLearningMethods(NewTech)
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
