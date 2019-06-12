import { Component } from "@angular/core";
import { MainConstants } from '../common/mainConstants'
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private router: Router, private authService:AuthService){
  }
  title : string = MainConstants.APP_NAME;
  public isAuthed(){
    return this.authService.isLogedIn();
  }
}
