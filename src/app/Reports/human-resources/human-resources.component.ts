import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { DialogService } from './../../Shared/dialog.service';
import { HRService } from '../../Services/RMS-Services/hr.service';
import { HR_CollegeAdmins } from '../../Models/RMS-Models/HR_CollegeAdmins';
import { AddHumanResorceFacultyAdminComponent } from '../add-human-resorce-faculty-admin/add-human-resorce-faculty-admin.component';
import { HR_HeadOfDepartments } from '../../Models/RMS-Models/HR_HeadOfDepartments';
import { AddHumanResorceHeadOfDepartmentsComponent } from '../add-human-resorce-head-of-departments/add-human-resorce-head-of-departments.component';
import { HR_ResearchUnits } from './../../Models/RMS-Models/HR_ResearchUnits';
import { AddHumanResorceResearchUnitsComponent } from 'app/Reports/add-human-resorce-research-units/add-human-resorce-research-units.component';
import { HR_TechnicalAndAdmin } from '../../Models/RMS-Models/HR_TechnicalAndAdmin';
import { AddHumanResorceFacultyAndSupportStaff2Component } from '../add-human-resorce-faculty-and-support-staff2/add-human-resorce-faculty-and-support-staff2.component';
import { HR_AcademicStaff } from '../../Models/RMS-Models/HR_AcademicStaff';
import { HR_AcademicStaffAll } from '../../Models/RMS-Models/HR_AcademicStaffAll';
import { AddHumanResorceAcademiicStructureComponent } from 'app/Reports/add-human-resorce-academiic-structure/add-human-resorce-academiic-structure.component';
import { AddStudentsOfProgramsComponent } from '../add-students-of-programs/add-students-of-programs.component';

/**
 * @title Table that uses the recycle view repeater strategy.
 */

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.css']
})
export class HumanResourcesComponent implements OnInit {
HR_CollegeAdmins: HR_CollegeAdmins[];
HR_HeadOfDepartments: HR_HeadOfDepartments[];
HR_ResearchUnits: HR_ResearchUnits[];
HR_TechnicalAndAdmin: HR_TechnicalAndAdmin[];
HR_AcademicStaff: HR_AcademicStaff[];
HR_AcademicStaffAll: HR_AcademicStaffAll[];
constructor(
    private HRService: HRService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngOnInit(): void {
    this.LoadHRData();
    this.LoadMajorsData();
    this.LoadSUData();
    this.LoadTAData();
    this.LoadASAData();
    this.LoadASData();
  }

  //////////////////// CRUD Operations About HR \\\\\\\\\\\\\\\\\\\\\\\\\\\ 

  LoadHRData(){
    this.HRService.GetAllHR_CollegeAdmins(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_CollegeAdmins = data;
    });
  }
  onDeleteHR(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_CollegeAdmins(id).subscribe(res => {
          this.HR_CollegeAdmins = this.HR_CollegeAdmins.filter(item => item.hR_CollegeAdminsID !== id);
          // console.log('HR deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditHRData(obj){
    const dialogRef = this.dialog.open(AddHumanResorceFacultyAdminComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadHRData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

//////////////////// CRUD Operations About ASA \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadASAData(){
    this.HRService.GetAllHR_AcademicStaffAll(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_AcademicStaffAll = data;
    });
  }

  onDeleteASA(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_AcademicStaffAll(id).subscribe(res => {
          this.HR_AcademicStaffAll = this.HR_AcademicStaffAll.filter(item => item.hR_AcademicStaffAllID !== id);
          // console.log('SU deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditASAData(obj){
    const dialogRef = this.dialog.open(AddHumanResorceAcademiicStructureComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadASAData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewASA() {
    const dialogRef = this.dialog.open(AddHumanResorceAcademiicStructureComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadASAData();
      this.notificationsService.success('تم إضافة البيانات بنجاح ');

    });
  }
  // AS
  LoadASData(){
    this.HRService.GetAllHR_AcademicStaff(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_AcademicStaff = data;
    });
  }

  onDeleteAS(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_AcademicStaff(id).subscribe(res => {
          this.HR_AcademicStaff = this.HR_AcademicStaff.filter(item => item.hR_AcademicStaffID !== id);
          // console.log('SU deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditASData(obj){
    const dialogRef = this.dialog.open(AddStudentsOfProgramsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadASData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewAS() {
    const dialogRef = this.dialog.open(AddStudentsOfProgramsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadASData();
      this.notificationsService.success('تم إضافة البيانات بنجاح ');

    });
  }
//////////////////// CRUD Operations About SU \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadSUData(){
    this.HRService.GetAllHR_ResearchUnits(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_ResearchUnits = data;
    });
  }

  onDeleteSU(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_ResearchUnits(id).subscribe(res => {
          this.HR_ResearchUnits = this.HR_ResearchUnits.filter(item => item.hR_ResearchUnitsID !== id);
          // console.log('SU deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditSUData(obj){
    const dialogRef = this.dialog.open(AddHumanResorceResearchUnitsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadSUData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewSU() {
    const dialogRef = this.dialog.open(AddHumanResorceResearchUnitsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadSUData();
      this.notificationsService.success('تم إضافة البيانات بنجاح ');

    });
  }

//////////////////// CRUD Operations About TA \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadTAData(){
    this.HRService.GetAllHR_TechnicalAndAdmin(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_TechnicalAndAdmin = data; 
    });
  }

  onDeleteTA(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_TechnicalAndAdmin(id).subscribe(res => {
          this.HR_TechnicalAndAdmin = this.HR_TechnicalAndAdmin.filter(item => item.hR_TechnicalAndAdminID !== id);
          // console.log('TA deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditTAData(obj){
    const dialogRef = this.dialog.open(AddHumanResorceFacultyAndSupportStaff2Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadTAData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewTA() {
    const dialogRef = this.dialog.open(AddHumanResorceFacultyAndSupportStaff2Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadTAData();
      this.notificationsService.success('تم إضافة البيانات بنجاح ');

    });
  }
//////////////////// CRUD Operations About Majors \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadMajorsData(){
    this.HRService.GetAllHR_HeadOfDepartments(localStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.HR_HeadOfDepartments = data; 
    });
  }

  onDeleteMajor(id){
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.HRService.DeleteHR_HeadOfDepartments(id).subscribe(res => {
          this.HR_HeadOfDepartments = this.HR_HeadOfDepartments.filter(item => item.hR_HeadOfDepartmentsID !== id);
          // console.log('Major deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditMajorData(obj){
    const dialogRef = this.dialog.open(AddHumanResorceHeadOfDepartmentsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadMajorsData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewMajor() {
    const dialogRef = this.dialog.open(AddHumanResorceHeadOfDepartmentsComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadMajorsData();
      this.notificationsService.success('تم إضافة البيانات بنجاح ');

    });
  }

}
