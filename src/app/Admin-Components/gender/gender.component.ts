import { AddGenderComponent } from './../add-gender/add-gender.component';
import { GenderService } from './../../Services/Admin-Services/Gender/gender.service';
import { IGenderDTO } from './../../Models/IGenderDTO';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'app/Shared/notifications.service';
import { Subject } from 'rxjs';
import { DialogService } from './../../Shared/dialog.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
 
  dtTrigger: Subject<any> = new Subject();
  
  Genders : IGenderDTO[] = [];
  displayedColumns: string[] = ['genderName', 'actions'];
  dataSource = new MatTableDataSource<IGenderDTO>(this.Genders);
  selection = new SelectionModel<IGenderDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private GenderService: GenderService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadGenders();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadGenders(){
    this.GenderService.GetAllGender().subscribe(data => {
      this.Genders = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Genders);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.GenderService.DeleteGender(id).subscribe(res => {
          this.Genders = this.Genders.filter(item => item.genderID !== id);
          console.log('Gender deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddGenderComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadGenders();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewGender() {
    const dialogRef = this.dialog.open(AddGenderComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadGenders();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
