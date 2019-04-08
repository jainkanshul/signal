import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Posttemplate } from "../messagetemplate.model"
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";


@Component({
  selector: 'app-post-messagetemplate',
  templateUrl: './post-messagetemplate.component.html',
  styleUrls: ['./post-messagetemplate.component.css']
})
export class PostMessagetemplateComponent implements OnInit {
  isLoading = false;
  post: Posttemplate;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.postsService.getPostTemplateUpdateListener()
    .subscribe((posts: Posttemplate[]) => {
      this.isLoading = false;
    });
  }
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
     }
     this.isLoading = true;

this.postsService.addTemplate(form.value.message, form.value.name,form.value.preffix,form.value.suffix);

  }

  }

