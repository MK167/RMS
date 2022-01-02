import { DialogService } from './../../Shared/dialog.service';
import { AddJobComponent } from './../add-job/add-job.component';
import { JobService } from './../../Services/Admin-Services/Job/job.service';
import { IJobDTO } from './../../Models/IJobDTO';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { NotificationsService } from 'app/Shared/notifications.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit{
  dtTrigger: Subject<any> = new Subject();
  
  Jobs : IJobDTO[] = [];
  displayedColumns: string[] = ['jobName', 'actions'];
  dataSource = new MatTableDataSource<IJobDTO>(this.Jobs);
  selection = new SelectionModel<IJobDTO>(true, []);


   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private JobService: JobService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private DialogService : DialogService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.LoadJobs();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  LoadJobs(){
    this.JobService.GetAllJob().subscribe(data => {
      this.Jobs = data; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.Jobs);}
    );
  }

  onDelete(id){
    this.DialogService.OpenConfirmationDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.JobService.DeleteJob(id).subscribe(res => {
          this.Jobs = this.Jobs.filter(item => item.jobID !== id);
          console.log('Job deleted successfully!');
        });
        this.notificationsService.warn('Deleted successfully !');
      }
    });
  }

  EditData(obj){
    const dialogRef = this.dialog.open(AddJobComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },
      data : obj
    });
    dialogRef.afterClosed().subscribe(result => {
    this.LoadJobs();
    this.notificationsService.success('Updated successfully !');

    });

  }

  AddNewJob() {
    const dialogRef = this.dialog.open(AddJobComponent, {
      disableClose : true,
      autoFocus : true,
      width : '600px',
      height : '450px',
      position: { top: "90px" },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadJobs();
      this.notificationsService.success('Added Data successfully !');

    });


  }
}
