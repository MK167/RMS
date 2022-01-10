import { Component, OnInit } from '@angular/core';
import { IActiveProgram } from '../../Models/RMS-Models/IActiveProgram';
import {InActivePorgramProfessionalDiplomaDTO } from '../../Models/RMS-Models/InActivePorgramProfessionalDiplomaDTO';
import { ISummitionProgramDTO } from '../../Models/RMS-Models/ISummitionProgramDTO';
import { PGServicesService } from '../../Services/RMS-Services/pg-services.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { DialogService } from './../../Shared/dialog.service';
import { AddPostGraduatedProgramComponent } from '../add-post-graduated-program/add-post-graduated-program.component';
import { AddPostGraduatedDeplomaComponent } from '../add-post-graduated-deploma/add-post-graduated-deploma.component';
import { AddPostGraduatedProgram3Component } from '../add-post-graduated-program3/add-post-graduated-program3.component';
import { IScientificResearchDTO } from '../../Models/RMS-Models/IScientificResearchDTO';
import { AddPostGraduatedPublicationsComponent } from '../add-post-graduated-publications/add-post-graduated-publications.component';
import { AddPostGraduatedProgramStepsComponent } from '../add-post-graduated-program-steps/add-post-graduated-program-steps.component';


@Component({
  selector: 'app-postgraduate',
  templateUrl: './postgraduate.component.html',
  styleUrls: ['./postgraduate.component.css']
})
export class PostgraduateComponent implements OnInit {
// Declarations Model
    IActiveProgram: IActiveProgram[];
    InActivePorgramProfessionalDiplomaDTO: InActivePorgramProfessionalDiplomaDTO[];
    InActivePorgramProfessionalDiploma2DTO: InActivePorgramProfessionalDiplomaDTO[];
    ISummitionProgramDTO: ISummitionProgramDTO[];
    IScientificResearchDTO: IScientificResearchDTO[];

  constructor(
    private PGServicesService: PGServicesService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.LoadActiveProgram();
    this.LoadInActivePorgramProfessionalDiplomaData();
    this.LoadInActivePorgramProfessionalDiploma2Data();
    this.LoadIScientificResearch();
    this.LoadISummitionProgramData();
  }

  //////////////////// CRUD Operations About ActiveProgram \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadActiveProgram() {
    this.PGServicesService.GetAllActiveProgram(sessionStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.IActiveProgram = data;
      //console.log(data);

    });

  }

  onDeleteActiveProgram(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.PGServicesService.DeleteActiveProgram(id).subscribe(res => {
          this.IActiveProgram = this.IActiveProgram.filter(item => item.activeProgramID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditLoadActiveProgram(obj) {
    const dialogRef = this.dialog.open(AddPostGraduatedProgramComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadActiveProgram();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewActiveProgram() {
    const dialogRef = this.dialog.open(AddPostGraduatedProgramComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadActiveProgram();
      this.notificationsService.success('تم إضافة العنصر بنجاح');

    });
  }

///////////////////// CRUD Operations InActivePorgramProfessionalDiploma \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadInActivePorgramProfessionalDiplomaData() {
    this.PGServicesService.GetAllInActivePorgramProfessionalDiploma(1, sessionStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.InActivePorgramProfessionalDiplomaDTO = data;
      //console.log(data);

    });

  }

  onDeleteInActivePorgramProfessionalDiploma(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.PGServicesService.DeleteInActivePorgramProfessionalDiploma(id).subscribe(res => {
          // tslint:disable-next-line: max-line-length
          this.InActivePorgramProfessionalDiplomaDTO = this.InActivePorgramProfessionalDiplomaDTO.filter(item => item.inActivePorgramProfessionalDiplomaID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditInActivePorgramProfessionalDiplomaData(obj) {
    const dialogRef = this.dialog.open(AddPostGraduatedDeplomaComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadInActivePorgramProfessionalDiplomaData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewInActivePorgramProfessionalDiploma() {
    const dialogRef = this.dialog.open(AddPostGraduatedDeplomaComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadInActivePorgramProfessionalDiplomaData();
      this.notificationsService.success('تم إضافة العنصر بنجاح');

    });
  }
///////////////////// CRUD Operations InActivePorgramProfessionalDiploma \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadInActivePorgramProfessionalDiploma2Data() {
    this.PGServicesService.GetAllInActivePorgramProfessionalDiploma(2, sessionStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.InActivePorgramProfessionalDiploma2DTO = data;
      //console.log(data);

    });

  }

  onDeleteInActivePorgramProfessionalDiploma2(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.PGServicesService.DeleteInActivePorgramProfessionalDiploma(id).subscribe(res => {
          // tslint:disable-next-line: max-line-length
          this.InActivePorgramProfessionalDiploma2DTO = this.InActivePorgramProfessionalDiploma2DTO.filter(item => item.inActivePorgramProfessionalDiplomaID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditInActivePorgramProfessionalDiploma2Data(obj) {
    const dialogRef = this.dialog.open(AddPostGraduatedProgram3Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadInActivePorgramProfessionalDiploma2Data();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewInActivePorgramProfessionalDiploma2() {
    const dialogRef = this.dialog.open(AddPostGraduatedProgram3Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadInActivePorgramProfessionalDiploma2Data();
      this.notificationsService.success('تم إضافة العنصر بنجاح');

    });
  }
///////////////////// CRUD Operations ScientificResearch \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIScientificResearch() {
  this.PGServicesService.GetAllScientificResearch(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IScientificResearchDTO = data;
    //console.log(data);

  });

}

onDeleteScientificResearch(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.PGServicesService.DeleteScientificResearch(id).subscribe(res => {
        this.IScientificResearchDTO = this.IScientificResearchDTO.filter(item => item.scientificResearchID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditScientificResearch(obj) {
  const dialogRef = this.dialog.open(AddPostGraduatedPublicationsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIScientificResearch();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewScientificResearch() {
  const dialogRef = this.dialog.open(AddPostGraduatedPublicationsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIScientificResearch();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations SummitionProgram \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadISummitionProgramData() {
  this.PGServicesService.GetAllSummitionProgram(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.ISummitionProgramDTO = data;
    //console.log(data);

  });

}

onDeleteSummitionProgram(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.PGServicesService.DeleteSummitionProgram(id).subscribe(res => {
        this.ISummitionProgramDTO = this.ISummitionProgramDTO.filter(item => item.summitionProgramID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditSummitionProgramData(obj) {
  const dialogRef = this.dialog.open(AddPostGraduatedProgramStepsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadISummitionProgramData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}
AddNewSummitionProgram() {
  const dialogRef = this.dialog.open(AddPostGraduatedProgramStepsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadISummitionProgramData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
}
