import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AdminData } from "./admin-data.model";

@Injectable({ providedIn: "root" })
export class AdminService {
  private isAuthenticated = false;
  private userdetails: AdminData[] = [];
  private userdetailUpdated = new Subject<AdminData[]>();

  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserDetail() {
    this.http
      .get<{ users: any }>("http://localhost:1000/api/adminuser")
      .pipe(
        map(postData => {
          return postData.users.map(post => {
            return {
               email: post.email,
                type: post.type
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.userdetails = transformedPosts;
        this.userdetailUpdated.next([...this.userdetails]);
      });
  }

getUserDetailListener()
{
  return this.userdetailUpdated.asObservable();
}


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, type: string) {
    const authData: AdminData = { email: email, password: password, type: type };
    this.http
      .post("http://localhost:1000/api/adminuser/signup", authData)
      .subscribe(response => {
        alert("user added")
        this.userdetails.push(authData);
        this.userdetailUpdated.next([...this.userdetails]);
      });
  }

  login(email: string, password: string) {
    const authData: AdminData = { email: email, password: password, type:"admin" };
    this.http
      .post<{ token: string; expiresIn: number }>(
        "http://localhost:1000/api/adminuser/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
