import { PostsService } from './../../posts/posts.service';
import { Userdetails } from './../userdetai.model';
import { Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatInput} from '@angular/material';
import { NgForm } from "@angular/forms";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-userplan-subscribeduserlist',
  templateUrl: './userplan-subscribeduserlist.component.html',
  styleUrls: ['./userplan-subscribeduserlist.component.css']
})
export class UserplanSubscribeduserlistComponent implements OnInit {

  isLoading = true;
  stardate = ""
  isSubscriptionClicked = false;
  selectedUser: Userdetails;
  userdetails: Userdetails[] = [];
  displayedColumns: string[] = ['select', 'email', 'services', 'phone', 'expired',
  'Subscription Aprroved',
  'Total Amount Recieved', 'Amount Recieved'];
  dataSource = new MatTableDataSource<Userdetails>();
  selection = new SelectionModel<Userdetails>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  constructor(  public postsService: PostsService) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.postsService.getSubscribedUserDetail()

    this.postsService.getUserDetailListener()
    .subscribe((userdetails: Userdetails[]) => {
      this.userdetails = userdetails;
      this.isLoading = false
      this.dataSource.data = this.userdetails;
      this.dismiss();
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   edit()
   {
    // this.isLoading = true;
  //  this.postsService.sendAprroveTrialRequest(this.selection)
   }
   trial()
   { 
     if(this.selection.selected.length>0)
     {
       if(this.selection.selected.length == 1)
       {
       let res =  this.selection.selected;
       let userde: Userdetails =   res[0] 
      if(!userde.isSubscriptionaproove)
      {
      this.isLoading = true
      this.postsService.sendAprroveTrialRequest(userde);
      }
      else
      { 
        alert("free trail already aprroved for the record");
      }
       }
       else
       {
       alert("you can not select more then one record");
       }
     }
     else
     {
       alert("Please select any record for approval");
     }
    // this.postsService.
   }
   subscribe()
   {
    this.isSubscriptionClicked = true
    let res =  this.selection.selected;
    this.selectedUser =   res[0] 
   }
   onsendDetail(form: NgForm) {
     if(!this.selectedUser.fromdate)
     {
      alert("Please select fromdate")
     }
    else if(!this.selectedUser.enddate)
     {
      alert("Please select enddate")
     }
     else
     {
    
      this.isLoading = true;
      this.selectedUser.isSubscriptionaproove = true;
      this.selectedUser.amountrecive = form.value.amountrecive;
      alert(+this.selectedUser.amountrecive);
      alert(+this.selectedUser.totalamount);
      let respo =  +this.selectedUser.totalamount +  +this.selectedUser.amountrecive;
      alert(respo.toString());
     this.selectedUser.totalamount = respo.toString();
     this.postsService.sendaproovalSubscriptionRequest(this.selectedUser);
     }
   }
  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
     this.selectedUser.fromdate =  event.value;
  }
  addEnddate(type: string, event: MatDatepickerInputEvent<Date>) {
      this.selectedUser.enddate =  event.value;
   }
   dismiss()
   {
    this.isSubscriptionClicked = false
   }
}
