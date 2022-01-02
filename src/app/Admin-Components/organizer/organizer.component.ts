import { OrganizerService } from './../../Services/Admin-Services/Organizer/organizer.service';
import { IOrganizerDTO } from './../../Models/IOrganizerDTO';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { AddOrganizerComponent } from '../add-Organizer/add-Organizer.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  
  Organizers : IOrganizerDTO[] = [];
  displayedColumns: string[] = ['organizerName', 'actions'];
  dataSource = new MatTableDataSource<IOrganizerDTO>(this.Organizers);
  selection = new SelectionModel<IOrganizerDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private OrganizerService: OrganizerService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadOrganizers();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadOrganizers(){
    this.OrganizerService.GetAllOrganizer().subscribe(data => {
      this.Organizers = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Organizers);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.OrganizerService.DeleteOrganizer(id).subscribe(res => {
          this.Organizers = this.Organizers.filter(item => item.organizerID !== id);
          console.log('Organizer deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddOrganizerComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadOrganizers();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewOrganizer() {
    const dialogRef = this.dialog.open(AddOrganizerComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadOrganizers();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
