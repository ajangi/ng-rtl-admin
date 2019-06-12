import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL : string = "https://backend.tinextco.com" + "/api/backoffice/v1/login"
  constructor(private httpService: HttpService) { }

  isLogedIn(){
    console.log("isBefore",moment().isBefore(this.getExpiration()))
    return moment().isBefore(this.getExpiration());
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  public login(credentials: Object){
    let data : Object = {
      email : "admin@tinextco.com",
      password : "123456"
    }
    this.httpService.post(this.apiURL,data,{}).then(response => {
      if(response){
        console.log(response)
        const expiresAt = moment().add(response['expires_in'],'second');
        localStorage.setItem('token', response['access_token']);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      }
    })
  }
}
