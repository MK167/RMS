import { IJobDTO } from './../../Models/IJobDTO';
import { JobService } from './../../Services/Admin-Services/Job/job.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})


export class AddJobComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  AddJobForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Job: string;
  Job: IJobDTO;

  constructor(
    private JobService: JobService,
    private dialogRef: MatDialogRef<AddJobComponent>,
    @Inject(MAT_DIALOG_DATA) data: IJobDTO ) {
      if (data == null) {
        this.Job = null;
        this._Job = '';
      } else
      {
        this.Job = data;
        this._Job = data.jobName;
      }
     }

     get f()
     {
       return this.AddJobForm.controls;
     }

       ngOnInit() {
         this.AddJobForm = new FormGroup({
          jobName: new FormControl(this._Job, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Job == null) {
             let NewJob = {
              jobName : this.AddJobForm.get('jobName').value
             };
             this.JobService.CreateJob(NewJob)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewJob = {
            jobID : this.Job.jobID,
            jobName : this.AddJobForm.get('jobName').value
         };

          this.JobService.UpdateJob(NewJob)
             .subscribe(
               response => {
                 this.dialogRef.close();
               },
               error => {
                 console.log(error);
               });
         }
         }

         closeDialog(){
            this.dialogRef.close(false);
          }
}
       
