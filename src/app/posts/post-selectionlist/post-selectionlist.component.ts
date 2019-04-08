import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-selectionlist',
  templateUrl: './post-selectionlist.component.html',
  styleUrls: ['./post-selectionlist.component.css']
})
export class PostSelectionlistComponent implements OnInit {

  typesOfService: string[] = ['Basic Forex Pack', 'Premium Comex Pack', 'HNI Comex Pack',
   'Basic KLSE Pack', 'Premium KLSE Pack'
   , 'HNI KLSE Pack', 'Basic SGX Pack',
    'Premium SGX Pack', 'HNI SGX Pack'];
  selectedService: string[] = [];
    constructor( public postsService: PostsService){}

  ngOnInit(){} 
  onAreaListControlChanged(list)
  {
    let indexelement: number = this.selectedService.indexOf(list);
    if(indexelement !== -1)
    {
      this.selectedService.splice(indexelement, 1);
      this.postsService.addSevices(this.selectedService);
    }
    else
    {
    this.selectedService.push(list);
    this.postsService.addSevices(this.selectedService);
    }
  }
}
