import { Userdetails } from './../userplan/userdetai.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";
import { Posttemplate } from "./messagetemplate.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private posttemplate: Posttemplate[] = [];
  private userdetails: Userdetails[] = [];

  private userdetailUpdated = new Subject<Userdetails[]>();
  private postsUpdated = new Subject<Post[]>();
  private postsTemplateUpdated = new Subject<Posttemplate[]>();
  private Services: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:1000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              services: post.services,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getUserDetail() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:1000/api/userdetails/freeetrail")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              email: post.Email,
              services: post.services,
              country: post.Country,
              phone: post.PhoneNumber,
              issubscribed: post.issubscribed,
              isfreetrailaproove: post.isfreetrailaproove,
              isexpire: post.isexpire,
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.userdetails = transformedPosts;
        this.userdetailUpdated.next([...this.userdetails]);
      });
  }

  getSubscribedUserDetail() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:1000/api/userdetails/getsubscribeduser")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              email: post.Email,
              services: post.services,
              country: post.Country,
              phone: post.PhoneNumber,
              issubscribed: post.issubscribed,
              isfreetrailaproove: post.isfreetrailaproove,
              isexpire: post.isexpire,
              startdate: post.startdate,
              fromdate: post.fromdate,
              amountrecive: post.amountrecive,
              totalamount: post.totalamount,
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.userdetails = transformedPosts;
        this.userdetailUpdated.next([...this.userdetails]);
      });
  }

  getMesageTemplate() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:1000/posttemplate")
      .pipe(
        map(postData => {
          return postData.posts.map(postdf => {
            return {
              suffix: postdf.suffix,
              preffix: postdf.prefix,
              message: postdf.message,
              templatename: postdf.templatename
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posttemplate = transformedPosts;
        this.postsTemplateUpdated.next([...this.posttemplate]);
      });
  }

  sendAprroveTrialRequest(userdetail: Userdetails)
  {
    this.http
      .post<{ message: string; posts: {string} }>(
        "http://localhost:1000/api/userdetails/aproovetrial",
       {Email: userdetail.email}
      )
      .subscribe(responseData => {
        console.log(responseData)
        if(responseData.posts['nModified'])
        {
          userdetail.isfreetrailaproove = true
          this.userdetailUpdated.next([...this.userdetails]);
        }
        else
        {

        }
      });

  }
  sendinitialSubscriptionRequest(userdetail: Userdetails)
  {
    this.http
      .post<{ message: string; posts: {string} }>(
        "http://localhost:1000/api/userdetails/intialSusbscription",
       {Email: userdetail.email, 
        fromdate: userdetail.fromdate,
         totalamount: userdetail.totalamount, 
         amountrecive: userdetail.amountrecive,
         enddate: userdetail.enddate,
         startdate:  userdetail.fromdate,
         issubscribed: true
        }
      )
      .subscribe(responseData => {
        console.log(responseData)
        if(responseData.posts['nModified'])
        {
          alert("record updated succesfully");
           userdetail.issubscribed = true
           this.userdetailUpdated.next([...this.userdetails]);
        }
        else
        {
          alert("record not updated");
        }
      });

  }

  sendaproovalSubscriptionRequest(userdetail: Userdetails)
  {
    this.http
      .post<{ message: string; posts: {string} }>(
        "http://localhost:1000/api/userdetails/aproveSusbscription",
       {Email: userdetail.email, 
        fromdate: userdetail.fromdate,
         totalamount: userdetail.totalamount, 
         amountrecive: userdetail.amountrecive,
         enddate: userdetail.enddate,
         startdate:  userdetail.fromdate,
         issubscribed: true
        }
      )
      .subscribe(responseData => {
        console.log(responseData)
        if(responseData.posts['nModified'])
        {
          alert("record updated succesfully");
           userdetail.issubscribed = true
           this.userdetailUpdated.next([...this.userdetails]);
        }
        else
        {
          alert("record not updated");
        }
      });

  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  getPostTemplateUpdateListener() {
    return this.postsTemplateUpdated.asObservable();
  }

  getUserDetailListener() {
    return this.userdetailUpdated.asObservable();
  }



  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; services: [] }>(
      "http://localhost:1000/api/posts/" + id
    );
  }

  addPost(title: string, services: []) {
    const post: Post = { id: null, title: title, services: this.Services };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:1000/api/posts",
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

      });
  }


  addSevices(service: string[]) {
    this.Services = service;
  }


  addTemplate(message: string, templatename: string, prefix: string, sufix: string) {
    const post: Posttemplate = { id: null, message: message, templatename: templatename, preffix: prefix, suffix: sufix };
      this.http
      .post<{ message: string; MessageObjId: string }>(
        "http://localhost:1000/posttemplate/template",
        post
      )
      .subscribe(responseData => {
        const id = responseData.MessageObjId;
        post.id = id;
        this.posttemplate.push(post);
        this.postsTemplateUpdated.next([...this.posttemplate]);
      });
  }

  updatePost(id: string, title: string, services: []) {
    const post: Post = { id: id, title: title, services: [] };
    this.http
      .put("http://localhost:1000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:1000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
