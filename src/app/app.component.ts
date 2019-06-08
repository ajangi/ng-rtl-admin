import { Component } from "@angular/core";
import { MainConstants } from '../common/mainConstants'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = MainConstants.APP_NAME;
}
