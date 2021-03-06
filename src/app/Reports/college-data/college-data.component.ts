import { AddSDComponent } from './../add-sd/add-sd.component';
import { AcademicStructureService } from './../../Services/RMS-Services/academic-structure.service';
import { IScientificDegreesDTO } from './../../Models/RMS-Models/IScientificDegreesDTO';
import { AddCollegeProgramsComponent } from './../add-college-programs/add-college-programs.component';
import { AddMajorsOfCollegeComponent } from './../add-majors-of-college/add-majors-of-college.component';
import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { ICPrograms } from './../../Models/RMS-Models/ICPrograms';
import { ICMajors } from './../../Models/RMS-Models/ICMajors';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { DialogService } from './../../Shared/dialog.service';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AddCollegeDataComponent } from 'app/Reports/add-college-data/add-college-data.component';

/**
 * @title Table that uses the recycle view repeater strategy.
 */
@Component({
  selector: 'app-college-data',
  templateUrl: './college-data.component.html',
  styleUrls: ['./college-data.component.css']
})
export class CollegeDataComponent implements OnInit {

  // Define Variables
  dtTrigger: Subject<any> = new Subject();
  ICollege :   ICollege[] = [];
  ICMajors :   ICMajors[] = [];
  ICPrograms : ICPrograms[] = [];
  IScientificDegreesDTO : IScientificDegreesDTO[] = [];

  //Define Display Coulmns Headers in Angular Material 
  displayedColumns: string[] = ['CollegeName','CDate', 'RepublicanDecision','CNumberOfMajors','CNumberOfPrograms', 'CAcademicDate', 'CTimeAcademic', 'CStudyLang','Cactions'];
  displayedColumnss: string[] = ['MajorID', 'MajorName','CollegeOfMajor','Mactions']
  displayedColumnsss: string[] = ['ProgramID', 'ProgramName','renewCollegeDate','CollegeName','Pactions']
  displayedColumnssss: string[] = ['scientificDegreesID', 'scientificDegreesName','collegeName','Sactions']

  //Define DataSource 
  dataSource = new MatTableDataSource<ICollege>(this.ICollege);
  dataSourceMajors = new MatTableDataSource<ICMajors>(this.ICMajors);
  dataSourcePrograms = new MatTableDataSource<ICPrograms>(this.ICPrograms);
  dataSourceScientificDegrees = new MatTableDataSource<IScientificDegreesDTO>(this.IScientificDegreesDTO);
  
  // Constructor 
  constructor(
    private CollegeData: CollegeBasicDataService,
    private AcademicStructureService: AcademicStructureService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }


  ngOnInit(): void {
    this.LoadCollegeData();
    this.LoadMajorsData();
    this.LoadProgramsData();
  }
//////////////////// CRUD Operations About College \\\\\\\\\\\\\\\\\\\\\\\\\\\

    LoadCollegeData(){
      this.CollegeData.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe(data => {
        this.ICollege = data; 
        console.log(this.ICollege);}
        
      );

    }

    onDeleteCollege(id){
      this.DialogService.OpenConfirmationDialog('???? ?????? ?????????? ???? ?????? ?????? ??????????????')
      .afterClosed().subscribe(res =>{
        if(res){
          this.CollegeData.DeleteCollege(id).subscribe(res => {
            this.ICollege = this.ICollege.filter(item => item.collegeID !== id);
            // console.log('College deleted successfully!');
          });
          this.notificationsService.warn('???? ?????????? ??????????');
        }
      });
    }

    EditCollegeData(obj){
      const dialogRef = this.dialog.open(AddCollegeDataComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },
        data : obj
      });
      dialogRef.afterClosed().subscribe(result => {
      this.LoadCollegeData();
      this.notificationsService.success('???? ?????????????? ??????????');
      });

    }

    AddNewCollege() {
      const dialogRef = this.dialog.open(AddCollegeDataComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },

      });

      dialogRef.afterClosed().subscribe(result => {
        this.LoadCollegeData();
        this.notificationsService.success('???? ?????????? ???????????????? ??????????');

      });


    }

//////////////////// CRUD Operations About Majors \\\\\\\\\\\\\\\\\\\\\\\\\\\

    LoadMajorsData(){
      this.CollegeData.GetAllMajor(sessionStorage.getItem('CollegeID')).subscribe(data => {
        var count = 0;
        data.forEach(element => {
          count+=1;
          element.autoID = count;
        });
        this.ICMajors = data; 
      });
    }

    onDeleteMajor(id){
      this.DialogService.OpenConfirmationDialog('???? ?????? ?????????? ???? ?????? ?????? ??????????????')
      .afterClosed().subscribe(res =>{
        if(res){
          this.CollegeData.DeleteMajor(id).subscribe(res => {
            this.ICMajors = this.ICMajors.filter(item => item.majorID !== id);
            // console.log('Major deleted successfully!');
          });
          this.notificationsService.warn('???? ?????????? ??????????');
        }
      });
    }

    EditMajorData(obj){
      const dialogRef = this.dialog.open(AddMajorsOfCollegeComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },
        data : obj
      });
      dialogRef.afterClosed().subscribe(result => {
      this.LoadMajorsData();
      this.notificationsService.success('???? ?????????????? ??????????');
      });

    }

    AddNewMajor() {
      const dialogRef = this.dialog.open(AddMajorsOfCollegeComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },

      });

      dialogRef.afterClosed().subscribe(result => {
        this.LoadMajorsData();
        this.notificationsService.success('???? ?????????? ???????????????? ??????????');

      });


    }

//////////////////// CRUD Operations About Programs \\\\\\\\\\\\\\\\\\\\\\\\\\\

    LoadProgramsData(){
      this.CollegeData.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe(data => {
        var count = 0;
        data.forEach(element => {
          count+=1;
          element.autoID = count;
        });
        this.ICPrograms = data; 
      });
    }

    onDeleteProgram(id){
      this.DialogService.OpenConfirmationDialog('???? ?????? ?????????? ???? ?????? ?????? ??????????????')
      .afterClosed().subscribe(res =>{
        if(res){
          this.CollegeData.DeleteProgram(id).subscribe(res => {
            this.ICPrograms = this.ICPrograms.filter(item => item.programID !== id);
            // console.log('Program deleted successfully!');
          });
          this.notificationsService.warn('???? ?????????? ??????????');
        }
      });
    }

    EditProgramData(obj){
      const dialogRef = this.dialog.open(AddCollegeProgramsComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },
        data : obj
      });
      dialogRef.afterClosed().subscribe(result => {
      this.LoadProgramsData();
      this.notificationsService.success('???? ?????????? ???????????????? ??????????');
      });

    }

    AddNewProgram() {
      const dialogRef = this.dialog.open(AddCollegeProgramsComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },

      });

      dialogRef.afterClosed().subscribe(result => {
        this.LoadProgramsData();
        this.notificationsService.success('???? ?????????? ???????????????? ??????????');

      });

    }

    //////////////////// CRUD Operations About SD \\\\\\\\\\\\\\\\\\\\\\\\\\\

    LoadSDData(){
      this.AcademicStructureService.GetAllScientificDegrees(sessionStorage.getItem('CollegeID')).subscribe(data => {
        var count = 0;
        data.forEach(element => {
          count+=1;
          element.autoID = count;
        });
        this.IScientificDegreesDTO = data; 
      });
    }

    onDeleteSD(id){
      this.DialogService.OpenConfirmationDialog('???? ?????? ?????????? ???? ?????? ?????? ??????????????')
      .afterClosed().subscribe(res =>{
        if(res){
          this.AcademicStructureService.DeleteScientificDegrees(id).subscribe(res => {
            this.IScientificDegreesDTO = this.IScientificDegreesDTO.filter(item => item.scientificDegreesID !== id);
            // console.log('College deleted successfully!');
          });
          this.notificationsService.warn('???? ?????????? ??????????');
        }
      });
    }

    EditSDData(obj){
      const dialogRef = this.dialog.open(AddSDComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },
        data : obj
      });
      dialogRef.afterClosed().subscribe(result => {
      this.LoadSDData();
      this.notificationsService.success('???? ?????????????? ??????????');
      });

    }

    AddNewSD() {
      const dialogRef = this.dialog.open(AddSDComponent, {
        disableClose : true,
        autoFocus : true,
        width : '600px',
        height : '450px',
        position: { top: "90px" },

      });

      dialogRef.afterClosed().subscribe(result => {
        this.LoadSDData();
        this.notificationsService.success('???? ?????????? ???????????????? ??????????');

      });


    }

}