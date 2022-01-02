import { Component, Inject, OnInit } from '@angular/core';
import { IActivityTypeDTO } from '../../Models/RMS-Models/IActivityTypeDTO';
import { IStudentActivitiesDTO } from '../../Models/RMS-Models/IStudentActivitiesDTO';
import { StudentsActvitesService } from '../../Services/RMS-Services/students-actvites.service';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
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
  selector: 'app-add-students-activties1',
  templateUrl: './add-students-activties1.component.html',
  styleUrls: ['./add-students-activties1.component.css']
})
export class AddStudentsActivties1Component implements OnInit {
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
  constructor(private CollegeBasicDataService: CollegeBasicDataService, private StudentsActvitesService: StudentsActvitesService,
    private dialogRef: MatDialogRef<AddStudentsActivties1Component>, fb: FormBuilder,
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
              activityTypeID :  'ba3ba29b-d98f-4a23-0934-08d9cdd5e903',
              flagType : 1,
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
            activityTypeID :  'ba3ba29b-d98f-4a23-0934-08d9cdd5e903',
            flagType : 1,
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
