import { OrganizerService } from './../../Services/Admin-Services/Organizer/organizer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrganizerDTO } from 'app/Models/IOrganizerDTO';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-organizer',
  templateUrl: './add-organizer.component.html',
  styleUrls: ['./add-organizer.component.css']
})
export class AddOrganizerComponent implements OnInit {

  
  matcher = new MyErrorStateMatcher();
  AddOrganizerForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Organizer: string;
  Organizer: IOrganizerDTO;

  constructor(
    private OrganizerService: OrganizerService,
    private dialogRef: MatDialogRef<AddOrganizerComponent>,
    @Inject(MAT_DIALOG_DATA) data: IOrganizerDTO ) {
      if (data == null) {
        this.Organizer = null;
        this._Organizer = '';
      } else
      {
        this.Organizer = data;
        this._Organizer = data.organizerName;
      }
     }

     get f()
     {
       return this.AddOrganizerForm.controls;
     }

       ngOnInit() {
         this.AddOrganizerForm = new FormGroup({
          organizerName: new FormControl(this._Organizer, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Organizer == null) {
             let NewOrganizer = {
              organizerName : this.AddOrganizerForm.get('organizerName').value
             };
             this.OrganizerService.CreateOrganizer(NewOrganizer)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewOrganizer = {
            organizerID : this.Organizer.organizerID,
            organizerName : this.AddOrganizerForm.get('organizerName').value
         };

          this.OrganizerService.UpdateOrganizer(NewOrganizer)
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
       
