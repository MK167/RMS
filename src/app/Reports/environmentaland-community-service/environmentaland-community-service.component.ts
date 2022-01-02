import { Component, OnInit } from '@angular/core';
import { EnviroService } from '../../Services/RMS-Services/enviro.service';
import { IEnviroDTO } from '../../Models/RMS-Models/IEnviroDTO';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from './../../Shared/dialog.service';
import { NotificationsService } from 'app/Shared/notifications.service';
import { AddEnvironmentalAndCommunityServiceComponent } from '../add-environmental-and-community-service/add-environmental-and-community-service.component';

@Component({
  selector: 'app-environmentaland-community-service',
  templateUrl: './environmentaland-community-service.component.html',
  styleUrls: ['./environmentaland-community-service.component.css']
})
export class EnvironmentalandCommunityServiceComponent implements OnInit {

  IEnviroDTO: IEnviroDTO[];


  constructor(
    private EnviroService: EnviroService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService: DialogService
  ) { }

  ngOnInit(): void {
  this.LoadEnviroData();
  }

  LoadEnviroData() {
    this.EnviroService.GetAllEnviro().subscribe(data => {
      // tslint:disable-next-line: no-var-keyword
      var count = 0;
      data.forEach(element => {
        count += 1;
        element.autoID = count;
      });
      this.IEnviroDTO = data;
      console.log(data);
  
    });
  
  }
  
  onDeleteEnviro(id) {
    this.DialogService.OpenConfirmationDialog('هل انت متأكد من حذف هذا العنصر؟')
    .afterClosed().subscribe(res =>{
      if (res) {
        this.EnviroService.DeleteEnviro(id).subscribe(res => {
          this.IEnviroDTO = this.IEnviroDTO.filter(item => item.enviroID !== id);
        });
        this.notificationsService.warn('تم الحذف بنجاح');
      }
    });
  }
  
  EditEnviro(obj) {
    const dialogRef = this.dialog.open(AddEnvironmentalAndCommunityServiceComponent, {
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
    const dialogRef = this.dialog.open(AddEnvironmentalAndCommunityServiceComponent, {
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
