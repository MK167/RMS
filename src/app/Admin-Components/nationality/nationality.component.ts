import { NationalityService } from './../../Services/Admin-Services/Nationality/nationality.service';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { INationalityDTO } from 'app/Models/INationalityDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { AddNationalityComponent } from '../add-Nationality/add-Nationality.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  
  Nationalities : INationalityDTO[] = [];
  displayedColumns: string[] = ['nationalityName', 'actions'];
  dataSource = new MatTableDataSource<INationalityDTO>(this.Nationalities);
  selection = new SelectionModel<INationalityDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private NationalityService: NationalityService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadNationalities();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadNationalities(){
    this.NationalityService.GetAllNationality().subscribe(data => {
      this.Nationalities = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Nationalities);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.NationalityService.DeleteNationality(id).subscribe(res => {
          this.Nationalities = this.Nationalities.filter(item => item.nationalityID !== id);
          console.log('Nationality deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddNationalityComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadNationalities();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewNationality() {
    const dialogRef = this.dialog.open(AddNationalityComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadNationalities();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
