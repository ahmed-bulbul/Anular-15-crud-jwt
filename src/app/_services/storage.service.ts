import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  clearTimeout: any;
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public setToken(token : string) {
    localStorage.setItem("token", token);
    return true;
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }



  public isLoggedIn(): boolean {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return true;
  //   }
  //   return false;
  // }

  let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == "" || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }


// This is the original code from the tutorial:


  //getToken
  public getToken() {
    return localStorage.getItem("token");
  }

  //set userDetail
  public setUser(user: any) {
    console.log("user=>" + JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  //getUser
  public getTokenUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      //this.logout();
      return null;
    }
  }


  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("activeTabName");
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
    return true;
  }


}
