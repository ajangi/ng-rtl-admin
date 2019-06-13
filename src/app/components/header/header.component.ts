import { Component, OnInit } from "@angular/core";
import { MainConstants } from "../../../common/mainConstants";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  headerTitle: string = MainConstants.APP_NAME;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  private logout(){
    this.authService.logOut();
  }
}
