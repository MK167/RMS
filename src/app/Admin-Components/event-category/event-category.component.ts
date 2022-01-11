import { EventCategoryService } from './../../Services/Admin-Services/Event-Category/event-category.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEventCategoryDTO } from 'app/Models/IEventCategoryDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { AddEventCategoryComponent } from '../add-event-Category/add-event-Category.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  
  EventCategory : IEventCategoryDTO[] = [];
  displayedColumns: string[] = ['eventCategoryName', 'actions'];
  dataSource = new MatTableDataSource<IEventCategoryDTO>(this.EventCategory);
  selection = new SelectionModel<IEventCategoryDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private EventCategoryService:  EventCategoryService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadEventCategory();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadEventCategory(){
    this.EventCategoryService.GetAllEventCategory().subscribe(data => {
      this.EventCategory = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.EventCategory);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.EventCategoryService.DeleteEventCategory(id).subscribe(res => {
          this.EventCategory = this.EventCategory.filter(item => item.eventCategoryID !== id);
          console.log('EventCategory deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddEventCategoryComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadEventCategory();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewEventCategory() {
    const dialogRef = this.dialog.open(AddEventCategoryComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadEventCategory();
      this.notificationsService.success('تم اضافة البيانات بنجاح');

    });


  }
}
