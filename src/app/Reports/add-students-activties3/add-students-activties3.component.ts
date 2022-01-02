import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IActivityTypeDTO } from 'app/Models/RMS-Models/IActivityTypeDTO';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { IStudentActivitiesDTO } from 'app/Models/RMS-Models/IStudentActivitiesDTO';
import { AddStudentsActivties1Component } from '../add-students-activties1/add-students-activties1.component';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { StudentsActvitesService } from '../../Services/RMS-Services/students-actvites.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-students-activties3',
  templateUrl: './add-students-activties3.component.html',
  styleUrls: ['./add-students-activties3.component.css']
})
export class AddStudentsActivties3Component implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddActivityForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IAcademicsStructure: string;
  collegeID: string;
  activityTypeID: string;
  flagType: any;
  studentCount: any;
  //
  College: ICollege;
  IActivityTypeDTO: IActivityTypeDTO;
  IStudentActivitiesDTO: IStudentActivitiesDTO;
  //

  /*
  studentActivitiesID: string;
  collegeID: string;
  activityTypeID: string;
  flagType: boolean;
  studentCount: number;
  */
  constructor(private CollegeBasicDataService: CollegeBasicDataService, private StudentsActvitesService: StudentsActvitesService ,
    private dialogRef: MatDialogRef<AddStudentsActivties3Component>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IStudentActivitiesDTO) {
      if (data == null) {
        this.IStudentActivitiesDTO = null;
        this.collegeID = '';
        this.activityTypeID = '';
        this.flagType =  '';
        this.studentCount =  '';
      } else {
        this.IStudentActivitiesDTO = data;
        this.collegeID = data.collegeID;
        this.activityTypeID = data.activityTypeID;
        this.flagType =  data.flagType;
        this.studentCount =  data.studentCount;

      }

      this.AddActivityForm = fb.group({
        College: [this.collegeID, Validators.required],
        // activityTypeID: [this.activityTypeID, Validators.required ],
        // flagType: [this.flagType, Validators.required ],
        studentCount: [this.studentCount, Validators.required ],
      })
     }
     get f()
{
       return this.AddActivityForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        this.LoadActivityTypeData();
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
       LoadActivityTypeData() {
        this.StudentsActvitesService.GetAllActivityType().subscribe((data: IActivityTypeDTO) => {
          this.IActivityTypeDTO = data;
          console.log(this.IActivityTypeDTO);
       });
      }
       saveData(): void {
         if (this.IStudentActivitiesDTO == null) {
             let NewInter = {
              collegeID : this.AddActivityForm.get('College').value,
              activityTypeID : '7b023c59-bcbc-43ad-0935-08d9cdd5e903',
              flagType : 3,
              studentCount : this.AddActivityForm.get('studentCount').value,
             };
             this.StudentsActvitesService.CreateStudentActivities(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            studentActivitiesID : this.IStudentActivitiesDTO.studentActivitiesID,
            collegeID : this.AddActivityForm.get('College').value,
            activityTypeID : '7b023c59-bcbc-43ad-0935-08d9cdd5e903',
            flagType : 3,
            studentCount : this.AddActivityForm.get('studentCount').value,
          };

          console.log(NewInter);

          this.StudentsActvitesService.UpdateStudentActivities(NewInter)
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
