import { Component, OnInit } from '@angular/core';
import { IActivityTypeDTO } from 'app/Models/RMS-Models/IActivityTypeDTO';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { IStudentActivitiesDTO } from '../../Models/RMS-Models/IStudentActivitiesDTO';
import { DialogService } from './../../Shared/dialog.service';
import { StudentsActvitesService } from '../../Services/RMS-Services/students-actvites.service';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { AddStudentsActivties1Component } from '../add-students-activties1/add-students-activties1.component';
import { AddStudentsActivties2Component } from '../add-students-activties2/add-students-activties2.component';
import { AddStudentsActivties3Component } from '../add-students-activties3/add-students-activties3.component';
/**
 * @title Table that uses the recycle view repeater strategy.
 */
@Component({
  selector: 'app-students-activities',
  templateUrl: './students-activities.component.html',
  styleUrls: ['./students-activities.component.css']
})
export class StudentsActivitiesComponent implements OnInit {
  ICollege:   ICollege[] = [];
  IActivityTypeDTO:   IActivityTypeDTO[] = [];
  IStudentActivitiesDTO: IStudentActivitiesDTO[] = [];
  IStudentActivities2DTO: IStudentActivitiesDTO[] = [];
  IStudentActivities3DTO: IStudentActivitiesDTO[] = [];
  constructor(
    private CollegeData: CollegeBasicDataService,
    private StudentsActvitesService: StudentsActvitesService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngOnInit(): void {
    this.LoadCollegeData();
    this.LoadActivityTypeData();
    this.LoadStdActivityTypeData();
    this.LoadStdActivityType2Data();
    this.LoadStdActivityType3Data();
  }

  ////////////////////  Operations About College \\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadCollegeData() {

    this.CollegeData.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe(data => {
      this.ICollege = data;
      console.log(this.ICollege);
    }
    );
  }

  ////////////////////  Operations About Activity Type \\\\\\\\\\\\\\\\\\\\\\\\\\
  LoadActivityTypeData() {
    this.StudentsActvitesService.GetAllActivityType(sessionStorage.getItem('CollegeID')).subscribe(data => {
      this.IActivityTypeDTO = data;
      console.log(this.IActivityTypeDTO);
    }
    );
  }

  ////////////////////  Operations About Activity Type \\\\\\\\\\\\\\\\\\\\\\\\\\
  LoadStdActivityTypeData() {
    this.StudentsActvitesService.GetAllStudentActivities(1, sessionStorage.getItem('CollegeID')).subscribe(data => {
      this.IStudentActivitiesDTO = data;
      console.log(this.IStudentActivitiesDTO);
    }
    );
  }
  onDeleteStdActivityTypeData(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.StudentsActvitesService.DeleteStudentActivities(id).subscribe(res => {
          this.IStudentActivitiesDTO = this.IStudentActivitiesDTO.filter(item => item.studentActivitiesID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditStdActivityTypeData(obj){
    const dialogRef = this.dialog.open(AddStudentsActivties1Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.LoadStdActivityTypeData();
      this.LoadStdActivityType2Data();
      this.LoadStdActivityType3Data();
      this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewStdActivityTypeData() {
    const dialogRef = this.dialog.open(AddStudentsActivties1Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadStdActivityTypeData();
      this.LoadStdActivityType2Data();
      this.LoadStdActivityType3Data();
      this.notificationsService.success('تم التحديث بنجاح');

    });


  }
  ////////////////////  Operations About Activity Type \\\\\\\\\\\\\\\\\\\\\\\\\\
  LoadStdActivityType2Data() {
    this.StudentsActvitesService.GetAllStudentActivities(2, sessionStorage.getItem('CollegeID')).subscribe(data => {
      this.IStudentActivities2DTO = data;
      console.log(this.IStudentActivities2DTO);
    }
    );
  }
  onDeleteStdActivityType2Data(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.StudentsActvitesService.DeleteStudentActivities(id).subscribe(res => {
          this.IStudentActivities2DTO = this.IStudentActivities2DTO.filter(item => item.studentActivitiesID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditStdActivityType2Data(obj){
    const dialogRef = this.dialog.open(AddStudentsActivties2Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.LoadStdActivityTypeData();
      this.LoadStdActivityType2Data();
      // this.LoadStdActivityType3Data();
          this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewStdActivityType2Data() {
    const dialogRef = this.dialog.open(AddStudentsActivties2Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadStdActivityType2Data();
      this.notificationsService.success('تم التحديث بنجاح');

    });


  }
  ////////////////////  Operations About Activity Type \\\\\\\\\\\\\\\\\\\\\\\\\\
  LoadStdActivityType3Data() {
    this.StudentsActvitesService.GetAllStudentActivities(3, sessionStorage.getItem('CollegeID')).subscribe(data => {
      this.IStudentActivities3DTO = data;
      console.log(this.IStudentActivities3DTO);
    }
    );
  }
  onDeleteStdActivityType3Data(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.StudentsActvitesService.DeleteStudentActivities(id).subscribe(res => {
          this.IStudentActivities3DTO = this.IStudentActivities3DTO.filter(item => item.studentActivitiesID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditStdActivityType3Data(obj){
    const dialogRef = this.dialog.open(AddStudentsActivties3Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.LoadStdActivityTypeData();
      // this.LoadStdActivityType2Data();
      this.LoadStdActivityType3Data();
          this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewStdActivityType3Data() {
    const dialogRef = this.dialog.open(AddStudentsActivties3Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadStdActivityType3Data();
      this.notificationsService.success('تم التحديث بنجاح');

    });


  }
}
