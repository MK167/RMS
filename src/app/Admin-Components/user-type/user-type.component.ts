import { UserTypeService } from './../../Services/Admin-Services/UserType/user-type.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUserTypeDTO } from 'app/Models/IUserTypeDTO';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { AddUserTypeComponent } from '../add-user-type/add-user-type.component';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  
  Types : IUserTypeDTO[] = [];
  displayedColumns: string[] = ['userTypeName', 'actions'];
  dataSource = new MatTableDataSource<IUserTypeDTO>(this.Types);
  selection = new SelectionModel<IUserTypeDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private UserTypeService: UserTypeService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadTypes();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadTypes(){
    this.UserTypeService.GetAllUserType().subscribe(data => {
      this.Types = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Types);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.UserTypeService.DeleteUserType(id).subscribe(res => {
          this.Types = this.Types.filter(item => item.userTypeID !== id);
          console.log('Type deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddUserTypeComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadTypes();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewType() {
    const dialogRef = this.dialog.open(AddUserTypeComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadTypes();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
