import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL : string = environment.baseurl
  constructor(private httpClient: HttpClient, private toastService: ToastrService){

  }
  private getFullUrl(uri: string){
    return this.apiURL + uri;
  }

  public post(uri: string, data: Object, headers:Object){
    let fullUrl : string = this.getFullUrl(uri);
    let fullHeaders : Object = this.makePostHeaders();
    return this.httpClient.post(fullUrl, data,fullHeaders)
    .toPromise()
    .then((res) => res)
    .catch((error) => {
      this.showError('خطا!',error['error']['message'])
      return false;
    })
  }

  private showError(title: string, message: string){
    this.toastService.error(message,title,{
      progressBar : true,
      timeOut: 10000,
      closeButton : true
    });
  }

  public getToken(){
    return "Bearer "+localStorage.getItem('token');
  }
  
  private makePostHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({"Authorization" : this.getToken(), "content-type" : "application/json"})
    };
    return httpOptions
  }
}
