import { AddUserImagesComponent } from 'app/Admin-Components/add-user-images/add-user-images.component';
import { UserImageService } from './../../Services/Admin-Services/UserImage/user-image.service';
import { IUserImageDTO } from './../../Models/IUserImageDTO';
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
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.css']
})
export class UserImagesComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  
  Images : IUserImageDTO[] = [];
  displayedColumns: string[] = ['imgPathName', 'actions'];
  dataSource = new MatTableDataSource<IUserImageDTO>(this.Images);
  selection = new SelectionModel<IUserImageDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private UserImageService: UserImageService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadImages();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadImages(){
    this.UserImageService.GetAllUserImage().subscribe(data => {
      this.Images = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Images);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.UserImageService.DeleteUserImage(id).subscribe(res => {
          this.Images = this.Images.filter(item => item.userImageID !== id);
          console.log('Image deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddUserImagesComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadImages();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewImage() {
    const dialogRef = this.dialog.open(AddUserImagesComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadImages();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
