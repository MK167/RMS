import { Component, OnInit } from '@angular/core';
import { IAcademicsStructureDTO } from '../../Models/RMS-Models/IAcademicsStructureDTO';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { DialogService } from './../../Shared/dialog.service';
import { AcademicStructureService } from '../../Services/RMS-Services/academic-structure.service';
import { AddAcademicsProgram4Component } from 'app/Reports/add-academics-program4/add-academics-program4.component';
import { IAccreditationRequirementsDTO } from '../../Models/RMS-Models/IAccreditationRequirementsDTO';
import { AddAcademicsProgram5Component } from '../add-academics-program5/add-academics-program5.component';
import { IAdvisorDTO } from '../../Models/RMS-Models/IAdvisorDTO';
import { AddAcademicsProgram6Component } from '../add-academics-program6/add-academics-program6.component';
import { IStudentsNumberDTO } from '../../Models/RMS-Models/IStudentsNumberDTO';
import { AddAcademicsProgram7Component } from '../add-academics-program7/add-academics-program7.component';
import { ICorrectiveActionDTO } from '../../Models/RMS-Models/ICorrectiveActionDTO';
import { AddAcademicsProgram8Component } from '../add-academics-program8/add-academics-program8.component';
import { ICo_opDTO } from '../../Models/RMS-Models/ICo_opDTO';
import { InternationalAccreditationDTO } from '../../Models/RMS-Models/InternationalAccreditationDTO';
import { AddAcademicsProgram9Component } from '../add-academics-program9/add-academics-program9.component';
import { IStudentTransferDTO } from '../../Models/RMS-Models/IStudentTransferDTO';
import { AddAcademicsProgram10Component } from '../add-academics-program10/add-academics-program10.component';
import { INumberOfCoursesDTO } from '../../Models/RMS-Models/INumberOfCoursesDTO';
import { AddAcademicsProgram11Component } from '../add-academics-program11/add-academics-program11.component';
import { ICoursesCommitmentDTO } from '../../Models/RMS-Models/ICoursesCommitmentDTO';
import { AddAcademicsProgram12Component } from '../add-academics-program12/add-academics-program12.component';
import { IStudyPlanDTO } from './../../Models/RMS-Models/IStudyPlanDTO';
import { AddAcademicsProgram13Component } from '../add-academics-program13/add-academics-program13.component';
import { IElectronicResourcesDTO } from '../../Models/RMS-Models/IElectronicResourcesDTO';
import { IElectronicResourcesItemDTO } from '../../Models/RMS-Models/IElectronicResourcesItemDTO';
import { AddAcademicsProgram14Component } from '../add-academics-program14/add-academics-program14.component';
import { IMoodleDTO } from '../../Models/RMS-Models/IMoodleDTO';
import { AddStructuresOfProgramsComponent } from '../add-structures-of-programs/add-structures-of-programs.component';
import { ITeachingAndLearningMethodsDTO } from '../../Models/RMS-Models/ITeachingAndLearningMethodsDTO';
import { AddStructuresOfPrograms2Component } from '../add-structures-of-programs2/add-structures-of-programs2.component';
import { IFieldTrainingDTO } from '../../Models/RMS-Models/IFieldTrainingDTO';
import { AddAcademicsCooperationComponent } from '../add-academics-cooperation/add-academics-cooperation.component';
import { AddAcademicsProgram15Component } from '../add-academics-program15/add-academics-program15.component';

@Component({
  selector: 'app-academic-program',
  templateUrl: './academic-program.component.html',
  styleUrls: ['./academic-program.component.css']
})
export class AcademicProgramComponent implements OnInit {

  // Declarations Model
  IAcademicsStructureDTO: IAcademicsStructureDTO[];
  IAccreditationRequirementsDTO: IAccreditationRequirementsDTO[];
  IAdvisorDTO: IAdvisorDTO[];
  IStudentsNumberDTO: IStudentsNumberDTO[];
  ICorrectiveActionDTO: ICorrectiveActionDTO[];
  ICo_opDTO: ICo_opDTO[];
  InternationalAccreditationDTO: InternationalAccreditationDTO[];
  IStudentTransferDTO: IStudentTransferDTO[];
  INumberOfCoursesDTO: INumberOfCoursesDTO[];
  ICoursesCommitmentDTO: ICoursesCommitmentDTO[];
  IStudyPlanDTO: IStudyPlanDTO[];
  IElectronicResourcesDTO: IElectronicResourcesDTO[];
  IElectronicResourcesItemDTO: IElectronicResourcesItemDTO[];
  IMoodleDTO: IMoodleDTO[];
  ITeachingAndLearningMethodsDTO: ITeachingAndLearningMethodsDTO[];
  IFieldTrainingDTO: IFieldTrainingDTO[];

  // Constructor
  constructor(
    private Academics: AcademicStructureService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService: DialogService
  ) { }

  // Calling Functions
  ngOnInit(): void {
    this.LoadAcademicsData();
    this.LoadAccreditationRequirementsData();
    this.LoadIAdvisorData();
    this.LoadIStudentsNumberData();
    this.LoadICorrectiveActionData();
    this.LoadICo_opData();
    this.LoadInternationalAccreditationData();
    this.LoadIStudentTransferData();
    this.LoadINumberOfCoursesaData();
    this.LoadICoursesCommitmentData();
    this.LoadIStudyPlanData();
    this.LoadIElectronicResourcesItemsData();
    this.LoadIElectronicResourcesDTOsData();
    this.LoadIMoodelDTOsData();
    this.LoadTeachingData();
    this.LoadFieldTData();
  }

  //////////////////// CRUD Operations About Academic Structure \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadAcademicsData() {
    this.Academics.GetAllAcademicsStructure(sessionStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.IAcademicsStructureDTO = data; 
      // //console.log(data);

    });

  }

  onDeleteAcadmicsStucture(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.Academics.DeleteAcademicsStructure(id).subscribe(res => {
          this.IAcademicsStructureDTO = this.IAcademicsStructureDTO.filter(item => item.academicsStructureID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditLoadAcademicsData(obj) {
    const dialogRef = this.dialog.open(AddAcademicsProgram4Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadAcademicsData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewAcademicStructure() {
    const dialogRef = this.dialog.open(AddAcademicsProgram4Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadAcademicsData();
      this.notificationsService.success('تم إضافة العنصر بنجاح');

    });
  }

///////////////////// CRUD Operations AccreditationRequirements \\\\\\\\\\\\\\\\\\\\\\\\\\\

  LoadAccreditationRequirementsData() {
    this.Academics.GetAllAccreditationRequirements(sessionStorage.getItem('CollegeID')).subscribe(data => {
      var count = 0;
      data.forEach(element => {
        count+=1;
        element.autoID = count;
      });
      this.IAccreditationRequirementsDTO = data; 
      // //console.log(data);

    });

  }

  onDeleteAccreditationRequirements(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if(res){
        this.Academics.DeleteAccreditationRequirements(id).subscribe(res => {
          this.IAccreditationRequirementsDTO = this.IAccreditationRequirementsDTO.filter(item => item.accreditationRequirementsID !== id);
          // console.log('College deleted successfully!');
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }

  EditAccreditationRequirementsData(obj) {
    const dialogRef = this.dialog.open(AddAcademicsProgram5Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadAcademicsData();
    this.notificationsService.success('تم التحديث بنجاح');
    });

  }

  AddNewAccreditationRequirements() {
    const dialogRef = this.dialog.open(AddAcademicsProgram5Component, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadAccreditationRequirementsData();
      this.notificationsService.success('تم إضافة العنصر بنجاح');

    });
  }
///////////////////// CRUD Operations Advisor \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIAdvisorData() {
  this.Academics.GetAllAdvisor(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IAdvisorDTO = data;
    //console.log(data);

  });

}

onDeleteAdvisor(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteAdvisor(id).subscribe(res => {
        this.IAdvisorDTO = this.IAdvisorDTO.filter(item => item.advisorID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditAdvisorData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram6Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIAdvisorData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewAdvisor() {
  const dialogRef = this.dialog.open(AddAcademicsProgram6Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIAdvisorData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations StudentsNumber \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIStudentsNumberData() {
  this.Academics.GetAllStudentsNumber(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IStudentsNumberDTO = data;
    //console.log(data);

  });

}

onDeleteStudentsNumber(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteStudentsNumber(id).subscribe(res => {
        this.IStudentsNumberDTO = this.IStudentsNumberDTO.filter(item => item.studentsNumberID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditStudentsNumberData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram7Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIStudentsNumberData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewStudentsNumber() {
  const dialogRef = this.dialog.open(AddAcademicsProgram7Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIStudentsNumberData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations CorrectiveAction \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadICorrectiveActionData() {
  this.Academics.GetAllCorrectiveAction(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.ICorrectiveActionDTO = data;
    //console.log(data);

  });

}

onDeleteCorrectiveAction(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteCorrectiveAction(id).subscribe(res => {
        this.ICorrectiveActionDTO = this.ICorrectiveActionDTO.filter(item => item.correctiveActionID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditCorrectiveActionData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram8Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadICorrectiveActionData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewCorrectiveAction() {
  const dialogRef = this.dialog.open(AddAcademicsProgram8Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadICorrectiveActionData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations Co_op \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadICo_opData() {
  this.Academics.GetAllCo_op(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.ICo_opDTO = data;
    //console.log(data);

  });

}

onDeleteCo_op(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteCo_op(id).subscribe(res => {
        this.ICo_opDTO = this.ICo_opDTO.filter(item => item.co_opID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditCo_opData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram9Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadICo_opData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewCo_op() {
  const dialogRef = this.dialog.open(AddAcademicsProgram9Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadICo_opData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations InternationalAccreditation \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadInternationalAccreditationData() {
  this.Academics.GetAllInternationalAccreditation(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.InternationalAccreditationDTO = data;
    //console.log(data);

  });

}

onDeleteInternationalAccreditation(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteInternationalAccreditation(id).subscribe(res => {
        this.InternationalAccreditationDTO = this.InternationalAccreditationDTO.filter(item => item.internationalAccreditationID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditInternationalAccreditationData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram15Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadInternationalAccreditationData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewInternationalAccreditation() {
  const dialogRef = this.dialog.open(AddAcademicsProgram15Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadInternationalAccreditationData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations StudentsTransfer \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIStudentTransferData() {
  this.Academics.GetAllStudentTransfer(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IStudentTransferDTO = data;
    //console.log(data);

  });

}

onDeleteStudentTransfer(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteStudentTransfer(id).subscribe(res => {
        this.IStudentTransferDTO = this.IStudentTransferDTO.filter(item => item.studentTransferID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditStudentTransferData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram10Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIStudentTransferData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewStudentTransfer() {
  const dialogRef = this.dialog.open(AddAcademicsProgram10Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIStudentTransferData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations Number Of Courses \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadINumberOfCoursesaData() {
  this.Academics.GetAllNumberOfCoursesDTO(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.INumberOfCoursesDTO = data;
    //console.log(data);

  });

}

onDeleteNumberOfCourses(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteNumberOfCoursesDTO(id).subscribe(res => {
        this.INumberOfCoursesDTO = this.INumberOfCoursesDTO.filter(item => item.numberOfCoursesID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditNumberOfCoursesData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram11Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadINumberOfCoursesaData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewNumberOfCourses() {
  const dialogRef = this.dialog.open(AddAcademicsProgram11Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadINumberOfCoursesaData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations CoursesCommitmentDTO \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadICoursesCommitmentData() {
  this.Academics.GetAllCoursesCommitment(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.ICoursesCommitmentDTO = data;
    //console.log(data);

  });

}

onDeleteCoursesCommitment(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteCoursesCommitment(id).subscribe(res => {
        this.ICoursesCommitmentDTO = this.ICoursesCommitmentDTO.filter(item => item.coursesCommitmentID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditCoursesCommitmentData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram12Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadICoursesCommitmentData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewICoursesCommitment() {
  const dialogRef = this.dialog.open(AddAcademicsProgram12Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadICoursesCommitmentData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations StudyPlan\\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIStudyPlanData() {
  this.Academics.GetAllStudyPlan(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IStudyPlanDTO = data;
    //console.log(data);

  });

}

onDeleteStudyPlan(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteStudyPlan(id).subscribe(res => {
        this.IStudyPlanDTO = this.IStudyPlanDTO.filter(item => item.studyPlanID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditStudyPlanData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram13Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIStudyPlanData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewIStudyPlan() {
  const dialogRef = this.dialog.open(AddAcademicsProgram13Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIStudyPlanData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations IElectronicResourcesDTOs\\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIElectronicResourcesDTOsData() {
  this.Academics.GetAllElectronicResources(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IElectronicResourcesDTO = data;
    //console.log(data);

  });

}

onDeleteIElectronicResourcesDTO(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteElectronicResources(id).subscribe(res => {
        this.IElectronicResourcesDTO = this.IElectronicResourcesDTO.filter(item => item.electronicResourcesID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditIElectronicResourcesData(obj) {
  const dialogRef = this.dialog.open(AddAcademicsProgram14Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIElectronicResourcesDTOsData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewIIElectronicResourcesDTOs() {
  const dialogRef = this.dialog.open(AddAcademicsProgram14Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIElectronicResourcesDTOsData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// Load Operations IElectronicResources Items\\\\\\\\\\\\\\\\\\\\\\\\\\\
LoadIElectronicResourcesItemsData() {
  this.Academics.GetAllElectronicResourcesItem(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IElectronicResourcesItemDTO = data;
    //console.log(data);

  });

}


///////////////////// CRUD Operations Moodle \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadIMoodelDTOsData() {
  this.Academics.GetAllMoodle(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IMoodleDTO = data;
    //console.log(data);

  });

}

onDeleteIMoodleDTO(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteMoodle(id).subscribe(res => {
        this.IMoodleDTO = this.IMoodleDTO.filter(item => item.moodleID !== id);
        // console.log('College deleted successfully!');
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditIMoodleDTO(obj) {
  const dialogRef = this.dialog.open(AddStructuresOfProgramsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadIMoodelDTOsData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewIMoodleDTO() {
  const dialogRef = this.dialog.open(AddStructuresOfProgramsComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadIMoodelDTOsData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}
///////////////////// CRUD Operations Teaching and Learning Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadTeachingData() {
  this.Academics.GetAllTeachingAndLearningMethods(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.ITeachingAndLearningMethodsDTO = data;
    //console.log(data);

  });

}

onDeleteTeaching(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteTeachingAndLearningMethods(id).subscribe(res => {
        this.ITeachingAndLearningMethodsDTO = this.ITeachingAndLearningMethodsDTO.filter(item => item.teachingAndLearningMethodsID !== id);
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditTeaching(obj) {
  const dialogRef = this.dialog.open(AddStructuresOfPrograms2Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadTeachingData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewTeaching() {
  const dialogRef = this.dialog.open(AddStructuresOfPrograms2Component, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadTeachingData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}

///////////////////// CRUD Operations Field Trainig Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\

LoadFieldTData() {
  this.Academics.GetAllFieldTraining(sessionStorage.getItem('CollegeID')).subscribe(data => {
    // tslint:disable-next-line: no-var-keyword
    var count = 0;
    data.forEach(element => {
      count += 1;
      element.autoID = count;
    });
    this.IFieldTrainingDTO = data;
    //console.log(data);

  });

}

onDeleteFieldT(id) {
  this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
  .afterClosed().subscribe(res =>{
    if (res) {
      this.Academics.DeleteFieldTraining(id).subscribe(res => {
        this.IFieldTrainingDTO = this.IFieldTrainingDTO.filter(item => item.fieldTrainingID !== id);
      });
      this.notificationsService.warn('تم الحذف بنجاح');
    }
  });
}

EditFieldT(obj) {
  const dialogRef = this.dialog.open(AddAcademicsCooperationComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },
    data : obj
  });
  dialogRef.afterClosed().subscribe(result => {
  this.LoadFieldTData();
  this.notificationsService.success('تم التحديث بنجاح');
  });

}

AddNewFieldT() {
  const dialogRef = this.dialog.open(AddAcademicsCooperationComponent, {
    disableClose : true,
    autoFocus : true,
    width : '600px',
    height : '450px',
    position: { top: '90px' },

  });

  dialogRef.afterClosed().subscribe(result => {
    this.LoadFieldTData();
    this.notificationsService.success('تم إضافة العنصر بنجاح');

  });
}

}
