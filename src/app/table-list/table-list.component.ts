import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  id: string;
  name: string;
  UserType: string;
  FromUniversity: string;
  CollegeOfEvent : string;
  IsVIP : boolean;
  IsEventDone : boolean;
}
/** Constants used to fill up our data base. */
const UserType: string[] = [
  'Event Planner', 'Founder', 'Speaker', 'Event Secretary', 'University president', 'User'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const CollegeOfEvent: string[] = [
  'IT', 'Medicine', 'Pharmacy', 'Spcial Education', 'Engineering'
];
const FromUniversity: string[] = [
  'MUST', 'AUC', 'GUC', 'BUE', 'BUC', 'MIU'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent  implements AfterViewInit{
  displayedColumns: string[] = ['select','id', 'name', 'UserType', 'FromUniversity','CollegeOfEvent','IsVIP','IsEventDone'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected ===
    numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

//////////////////////////////////Selected Function END


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { 
     // Create 100 users
     const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(users);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  }
  
  /** Builds and returns a new User. */
  function createNewUser(id: number): UserData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  
    return {
      id: id.toString(),
      name: name,
      IsVIP: Boolean (Math.round(Math.random())),
      IsEventDone: Boolean (Math.round(Math.random() * 1)),
      UserType: UserType[Math.round(Math.random() * (UserType.length - 1))],
      FromUniversity: FromUniversity[Math.round(Math.random() * (FromUniversity.length - 1))],
      CollegeOfEvent: CollegeOfEvent[Math.round(Math.random() * (CollegeOfEvent.length - 1))],
    };
    
  }