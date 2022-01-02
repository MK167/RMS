import { IEventCategoryDTO } from 'app/Models/IEventCategoryDTO';
import { EventCategoryService } from './../../Services/Admin-Services/Event-Category/event-category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-add-event-category',
  templateUrl: './add-event-category.component.html',
  styleUrls: ['./add-event-category.component.css']
})


export class AddEventCategoryComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddCategoryForm: FormGroup;
  IsFormValid: boolean = true;
  isSubmitted = false;

  _Category: string;
  Category: IEventCategoryDTO;

  constructor(
    private EventCategoryService: EventCategoryService,
    private dialogRef: MatDialogRef<AddEventCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data: IEventCategoryDTO) {
      if (data == null) {
        this.Category = null;
        this._Category = '';
      } else
      {
        this.Category = data;
        this._Category = data.eventCategoryName;
      }
     }

     get f()
     {
       return this.AddCategoryForm.controls;
     }

       ngOnInit() {
         this.AddCategoryForm = new FormGroup({
          eventCategoryName: new FormControl(this._Category, [Validators.required]),
       });
     }


       Cancel() {
         this.dialogRef.close();
       }


       saveData(): void {
         if (this.Category == null) {
             let NewCategory = {
              eventCategoryName : this.AddCategoryForm.get('eventCategoryName').value
             };
             this.EventCategoryService.CreateEventCategory(NewCategory)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewCategory = {
            eventCategoryID : this.Category.eventCategoryID,
            eventCategoryName: this.AddCategoryForm.get('eventCategoryName').value
         };

          this.EventCategoryService.UpdateEventCategory(NewCategory)
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
       
