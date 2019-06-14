import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {
  driversList : Object = {}
  constructor(private driversService: DriversService) { }

  ngOnInit() {
    let dd = this.driversService.getDrivers().then((res) => {
      if(res){
        this.driversList = res['data']
      }
    })
  }

}
