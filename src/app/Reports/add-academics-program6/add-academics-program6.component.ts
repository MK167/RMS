import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAdvisorDTO } from 'app/Models/RMS-Models/IAdvisorDTO';
import { IAdvisorItemsDTO } from 'app/Models/RMS-Models/IAdvisorItemsDTO';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { AcademicStructureService } from 'app/Services/RMS-Services/academic-structure.service';
import { AddAcademicsProgram4Component } from '../add-academics-program4/add-academics-program4.component';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-academics-program6',
  templateUrl: './add-academics-program6.component.html',
  styleUrls: ['./add-academics-program6.component.css']
})
export class AddAcademicsProgram6Component implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddAdvisorForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  _collegeID: string;
  _advisorItemID: string;
  _numberOfStd: any;
  _percentage: any;
  _collegeActions: string

  //
  AdvisorItems: IAdvisorItemsDTO;
  _AdvisorItems: any;
  College: ICollege;
  _college: any;
  IAdvisorDTO: IAdvisorDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Academics: AcademicStructureService,
    private dialogRef: MatDialogRef<AddAcademicsProgram4Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IAdvisorDTO) {
      if (data == null) {
        this.IAdvisorDTO = null;
        this._collegeID = '';
        this._advisorItemID = '';
        this._numberOfStd = '';
        this._percentage = '';
        this._collegeActions = '';
      } else {
        this.IAdvisorDTO = data;
        this._collegeID = data.collegeID;
        this._advisorItemID = data.advisorItemID;
        this._numberOfStd = data.numberOfStd;
        this._percentage = data.percentage;
        this._collegeActions = data.collegeActions;
      }

      this.AddAdvisorForm = fb.group({
        College: [this._collegeID, Validators.required],
        AdvisorItems: [this._advisorItemID, Validators.required ],
        numberOfStd: [this._numberOfStd, Validators.required ],
        percentage: [this._percentage, Validators.required ],
        collegeActions: [this._collegeActions, Validators.required ],
      })
     }
     get f()
{
       return this.AddAdvisorForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadAdvisorItems();
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
       LoadAdvisorItems() {
        this.Academics.GetAllAdvisorItems().subscribe((data: IAdvisorItemsDTO) => {
          this.AdvisorItems = data;
          console.log(this.AdvisorItems);
          console.log(this.IAdvisorDTO);
       });
      }
       saveData(): void {
         if (this.IAdvisorDTO == null) {
             let NewAdvisor = {
              collegeID : this.AddAdvisorForm.get('College').value,
              advisorItemID : this.AddAdvisorForm.get('AdvisorItems').value,
              numberOfStd : this.AddAdvisorForm.get('numberOfStd').value,
              percentage : this.AddAdvisorForm.get('percentage').value,
              collegeActions : this.AddAdvisorForm.get('collegeActions').value,
             };
             this.Academics.CreateAdvisor(NewAdvisor)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewAdvisor = {
            advisorID : this.IAdvisorDTO.advisorID,
            collegeID : this.AddAdvisorForm.get('College').value,
            advisorItemID : this.AddAdvisorForm.get('AdvisorItems').value,
            numberOfStd : this.AddAdvisorForm.get('numberOfStd').value,
            percentage : this.AddAdvisorForm.get('percentage').value,
            collegeActions : this.AddAdvisorForm.get('collegeActions').value,
          };

          console.log(NewAdvisor);

          this.Academics.UpdateAdvisor(NewAdvisor)
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
