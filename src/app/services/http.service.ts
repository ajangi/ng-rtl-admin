import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL : string = "https://backend.tinextco.com";
  constructor(private httpClient: HttpClient, private toastService: ToastrService){

  }
  private getFullUrl(uri: string){
    return this.apiURL + uri;
  }

  public post(uri: string, data: Object, headers:Object){
    let fullUrl : string = this.getFullUrl(uri);
    return this.httpClient.post(uri, data,headers)
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
}
