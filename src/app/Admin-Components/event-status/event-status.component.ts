import { EventStatusService } from './../../Services/Admin-Services/Event-Status/event-status.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEventStatusDTO } from 'app/Models/IEventStatusDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { AddEventStatusComponent } from '../add-event-Status/add-event-Status.component';
import { DialogService } from './../../Shared/dialog.service';


@Component({
  selector: 'app-event-status',
  templateUrl: './event-status.component.html',
  styleUrls: ['./event-status.component.css']
})
export class EventStatusComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  
  EventStatus : IEventStatusDTO[] = [];
  displayedColumns: string[] = ['eventStatusName', 'actions'];
  dataSource = new MatTableDataSource<IEventStatusDTO>(this.EventStatus);
  selection = new SelectionModel<IEventStatusDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private EventStatusService:  EventStatusService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadEventStatus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadEventStatus(){
    this.EventStatusService.GetAllEventStatus().subscribe(data => {
      this.EventStatus = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.EventStatus);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.EventStatusService.DeleteEventStatus(id).subscribe(res => {
          this.EventStatus = this.EventStatus.filter(item => item.eventStatusID !== id);
          console.log('EventStatus deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddEventStatusComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadEventStatus();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewEventStatus() {
    const dialogRef = this.dialog.open(AddEventStatusComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadEventStatus();
      this.notificationsService.success('تم اضافة البيانات بنجاح');

    });


  }
}
