import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEventVenueDTO } from 'app/Models/IEventVenueDTO';
import { EventVenueService } from 'app/Services/Admin-Services/Event-Venue/event-venue.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-event-venue',
  templateUrl: './add-event-venue.component.html',
  styleUrls: ['./add-event-venue.component.css']
})
export class AddEventVenueComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddVenueForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Venue: string;
  Venue: IEventVenueDTO;

  constructor(
    private EventVenueService: EventVenueService,
    private dialogRef: MatDialogRef<AddEventVenueComponent>,
    @Inject(MAT_DIALOG_DATA) data: IEventVenueDTO) {
      if (data == null) {
        this.Venue = null;
        this._Venue = '';
      } else
      {
        this.Venue = data;
        this._Venue = data.eventVenueName;
      }
     }

     get f()
     {
       return this.AddVenueForm.controls;
     }

       ngOnInit() {
         this.AddVenueForm = new FormGroup({
          eventVenueName: new FormControl(this._Venue, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Venue == null) {
             let NewVenue = {
              eventVenueName : this.AddVenueForm.get('eventVenueName').value
             };
             this.EventVenueService.CreateEventVenue(NewVenue)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewVenue = {
            eventVenueID : this.Venue.eventVenueID,
            eventVenueName : this.AddVenueForm.get('eventVenueName').value
         };

          this.EventVenueService.UpdateEventVenue(NewVenue)
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
       
