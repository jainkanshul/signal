import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Subscription } from 'rxjs';

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { Posttemplate } from "../messagetemplate.model";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})



export class PostCreateComponent implements OnInit, OnDestroy  {
  selectedprefix = '';
  selectedSuffix = '';
  messagetemplate = '';
  enteredTitle = "";
  preffixArray = []
  suffixArray = []
  templateNameArray = []

  bottomspace = "\n\n\n"
  enteredContent = "";
  post: Post;
  posttemplate: Posttemplate[] = [];
  isLoading = false;
  private mode = "create";
  private postId: string;
  private postsSub: Subscription;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("postId")) {
    //     this.mode = "edit";
    //     this.postId = paramMap.get("postId");
    //     this.isLoading = true;
    //     this.postsService.getPost(this.postId).subscribe(postData => {
    //       this.isLoading = false;
    //       this.post = {id: postData._id, title: postData.title, services: postData.services};
    //     });
    //   } else {
    //     this.isLoading = false;
    //     alert("remove alert")
    //     this.mode = "create";
    //     this.postId = null;
    //   }
    // });

    this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
    });
    this.postsService.getMesageTemplate()

    this.postsSub = this.postsService.getPostTemplateUpdateListener()
    .subscribe((poststemp: Posttemplate[]) => {
      this.isLoading = false;
      this.posttemplate = poststemp;
      for (let val of this.posttemplate) {
        if(val.preffix)
        {
          this.preffixArray.push(val.preffix);
        }
        if(val.suffix)
        {
        this.suffixArray.push(val.suffix);
        }
        if(val.templatename)
        {
        this.templateNameArray.push({'name': val.templatename, 'message': val.message});
        }
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.postsService.addPost(form.value.title.replace(/\s+/,""), []);

    // if (this.mode === "create") {
    //   this.postsService.addPost(form.value.title, []);
    // } else {
    //   this.postsService.updatePost(
    //     this.postId,
    //     form.value.title,
    //     []
    //   );
    // }
    this.selectedprefix = '';
    this.messagetemplate = '';
    this.selectedSuffix = '';
    form.resetForm();
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
