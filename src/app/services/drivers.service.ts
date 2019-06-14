import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from './../config/urls'

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private httpService: HttpService) { }

  public getDrivers(){
    return this.httpService.get(urls.drivers_list,{}).then((response) => response);
  }

}
