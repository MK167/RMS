import { AddChallengesAndDifficultiesComponent } from './../add-challenges-and-difficulties/add-challenges-and-difficulties.component';
import { ChallengesAndDifficultiesService } from './../../Services/RMS-Services/challenges-and-difficulties.service';
import { Challenges_and_DifficultiesDTO } from './../../Models/RMS-Models/Challenges_and_DifficultiesDTO';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'app/Shared/notifications.service';
import { AddEnvironmentalAndCommunityServiceComponent } from '../add-environmental-and-community-service/add-environmental-and-community-service.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-challenges-and-difficulties',
  templateUrl: './challenges-and-difficulties.component.html',
  styleUrls: ['./challenges-and-difficulties.component.css']
})
export class ChallengesAndDifficultiesComponent implements OnInit {
  Challenges_and_DifficultiesDTO: Challenges_and_DifficultiesDTO[];


  constructor(
    private ChallengesAndDifficultiesService: ChallengesAndDifficultiesService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService: DialogService
  ) { }

  ngOnInit(): void {
  this.LoadEnviroData();
  }

  LoadEnviroData() {
    this.ChallengesAndDifficultiesService.GetAllChallenges_and_Difficulties(sessionStorage.getItem('CollegeID')).subscribe(data => {
      // tslint:disable-next-line: no-var-keyword
      var count = 0;
      data.forEach(element => {
        count += 1;
        element.autoID = count;
      });
      this.Challenges_and_DifficultiesDTO = data;
      //console.log(data);
  
    });
  
  }
  
  onDeleteEnviro(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if (res) {
        this.ChallengesAndDifficultiesService.DeleteChallenges_and_Difficulties(id).subscribe(res => {
          this.Challenges_and_DifficultiesDTO = this.Challenges_and_DifficultiesDTO.filter(item => item.challenges_and_DifficultiesID !== id);
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }
  
  EditEnviro(obj) {
    const dialogRef = this.dialog.open(AddChallengesAndDifficultiesComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: '90px' },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadEnviroData();
    this.notificationsService.success('تم التحديث بنجاح');
    });
  
  }
  
  AddNewEnviro() {
    const dialogRef = this.dialog.open(AddChallengesAndDifficultiesComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: '90px' },
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.LoadEnviroData();
      this.notificationsService.success('تم إضافة العنصر بنجاح');
  
    });
  }

}
