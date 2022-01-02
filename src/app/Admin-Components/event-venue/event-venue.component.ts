import { EventVenueService } from './../../Services/Admin-Services/Event-Venue/event-venue.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEventVenueDTO } from 'app/Models/IEventVenueDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { AddEventVenueComponent } from '../add-event-venue/add-event-venue.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-event-venue',
  templateUrl: './event-venue.component.html',
  styleUrls: ['./event-venue.component.css']
})
export class EventVenueComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  
  EventVenue : IEventVenueDTO[] = [];
  displayedColumns: string[] = ['eventVenueName', 'actions'];
  dataSource = new MatTableDataSource<IEventVenueDTO>(this.EventVenue);
  selection = new SelectionModel<IEventVenueDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private EventVenueService:  EventVenueService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadEventVenue();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadEventVenue(){
    this.EventVenueService.GetAllEventVenue().subscribe(data => {
      this.EventVenue = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.EventVenue);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.EventVenueService.DeleteEventVenue(id).subscribe(res => {
          this.EventVenue = this.EventVenue.filter(item => item.eventVenueID !== id);
          console.log('EventVenue deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddEventVenueComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadEventVenue();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewEventVenue() {
    const dialogRef = this.dialog.open(AddEventVenueComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadEventVenue();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
