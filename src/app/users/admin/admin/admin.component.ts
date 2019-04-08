import { AuthData } from './../../../auth/auth-data.model';
import { AdminData } from './../admin-data.model';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import {SelectionModel} from '@angular/cdk/collections';
import { AdminService } from "../admin.service";
import {MatPaginator, MatTableDataSource, MatInput} from '@angular/material';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoading = false;
  isAddUser = false;
  selectedUser: AdminData;
  userdetails: AdminData[] = [];
  selectedValue: string;

  displayedColumns: string[] = ['select', 'email', 'type'];
  dataSource = new MatTableDataSource<AdminData>();
  selection = new SelectionModel<AdminData>(true, []);
  foods: Food[] = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'super admin', viewValue: 'super admin'}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public authService: AdminService) {}


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  onSignup(form: NgForm) 
  {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password,this.selectedValue);
  }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.authService.getUserDetail()
    this.authService.getUserDetailListener()
    .subscribe((userdetails: AdminData[]) => {
      this.userdetails = userdetails;
      this.isLoading = false
      this.dataSource.data = this.userdetails;
    });
}
applyFilter(filterValue: string) 
{
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

adduser()
{
  this.isAddUser = true
}

dismissAddUser()
{
  this.isAddUser = false
}

createUserRequest(form: NgForm)
{
  if (form.invalid) {
    return;
  }
  this.isLoading = true
  this.isAddUser = false
  this.authService.createUser(form.value.email, form.value.password, "admin");
}

}