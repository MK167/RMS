import { EventStatusService } from './../../Services/Admin-Services/Event-Status/event-status.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEventStatusDTO } from 'app/Models/IEventStatusDTO';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-event-status',
  templateUrl: './add-event-status.component.html',
  styleUrls: ['./add-event-status.component.css']
})
export class AddEventStatusComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddStatusForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Status: string;
  Status: IEventStatusDTO;

  constructor(
    private EventStatusService: EventStatusService,
    private dialogRef: MatDialogRef<AddEventStatusComponent>,
    @Inject(MAT_DIALOG_DATA) data: IEventStatusDTO) {
      if (data == null) {
        this.Status = null;
        this._Status = '';
      } else
      {
        this.Status = data;
        this._Status = data.eventStatusName;
      }
     }

     get f()
     {
       return this.AddStatusForm.controls;
     }

       ngOnInit() {
         this.AddStatusForm = new FormGroup({
          eventStatusName: new FormControl(this._Status, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Status == null) {
             let NewStatus = {
              eventStatusName : this.AddStatusForm.get('eventStatusName').value
             };
             this.EventStatusService.CreateEventStatus(NewStatus)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewStatus = {
            eventStatusID : this.Status.eventStatusID,
            eventStatusName : this.AddStatusForm.get('eventStatusName').value
         };

          this.EventStatusService.UpdateEventStatus(NewStatus)
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
       
