import { AddUniversityComponent } from 'app/Admin-Components/add-university/add-university.component';
import { UniversityService } from './../../Services/Admin-Services/University/university.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUniversityDTO } from 'app/Models/IUniversityDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  
  Universities : IUniversityDTO[] = [];
  displayedColumns: string[] = ['universityName', 'actions'];
  dataSource = new MatTableDataSource<IUniversityDTO>(this.Universities);
  selection = new SelectionModel<IUniversityDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private UniversityService: UniversityService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadUniversities();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadUniversities(){
    this.UniversityService.GetAllUniversity().subscribe(data => {
      this.Universities = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Universities);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.UniversityService.DeleteUniversity(id).subscribe(res => {
          this.Universities = this.Universities.filter(item => item.universityID !== id);
          console.log('University deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddUniversityComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadUniversities();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewUniversity() {
    const dialogRef = this.dialog.open(AddUniversityComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadUniversities();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
