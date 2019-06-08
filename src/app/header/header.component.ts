import { Component, OnInit } from "@angular/core";
import { MainConstants } from "../../common/mainConstants";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  headerTitle: string = MainConstants.APP_NAME;
  constructor() {}

  ngOnInit() {}
}
