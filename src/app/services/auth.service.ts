import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from './../config/urls'
import * as moment from "moment";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService, private router: Router) { }
  isLogingIn :boolean = false;
  isLogedIn(){
    return moment().isBefore(this.getExpiration());
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  public login(credentials: Object){
    let data : Object = {
      email : credentials['username'],
      password : credentials['password']
    }
    this.isLogingIn = true;
    this.httpService.post(urls.login_url,data,{}).then(response => {
      this.isLogingIn = false;
      if(response){
        const expiresAt = moment().add(response['expires_in'],'second');
        localStorage.setItem('token', response['access_token']);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        location.reload();
      }
    })
  }

  public logOut(){
    this.httpService.post(urls.logout_url,{},{}).then(response => {
      if(response){
        localStorage.removeItem('token');
        localStorage.removeItem("expires_at");
        this.router.navigate(['']);
      }
    })
  }
}
