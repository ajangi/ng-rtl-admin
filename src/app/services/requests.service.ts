import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from './../config/urls'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private httpService:HttpService) { }

  getPickUpList(page : any){
    return this.httpService.get(urls.pickup_list + "&page="+ page,{}).then((response) => response);
  }

  makeCollectRoute(assignObject: Object){
    return this.httpService.post(urls.collect_route,assignObject,{}).then((response) => response);
  }
}
