import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/services/drivers.service';
import { RequestsService } from 'src/app/services/requests.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {
  gettingPickUpList :boolean = true;
  driversList :any = [];
  pickUpList : any = [];
  selectedRefOrders : any = [];
  selectedDriver: any;
  assignList: any = [];
  pickUpListMeta : any ;
  current_page : any =1;

  pickUpListTableHead : Array<Object> = [
    {
      title : "#",
      value : "id",
      customHtml : '<input type="text"/>'
    },
    {
      title : "زمان جمع آوری",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    },
    {
      title : "نام مشتری",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    },
    {
      title : "کد سفارش مرجع",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    },
    {
      title : "آدرس",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    },
    {
      title : "نام راننده",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    },
    {
      title : "نوع مشتری",
      value : "deliver_timespan",
      customHtml : '<div></div>'
    }
  ]

  constructor(private driversService: DriversService, private requestsService: RequestsService, private httpService:HttpService) { }

  ngOnInit() {
    this.gettingPickUpList = true;
    this.driversService.getDrivers().then((res) => {
      if(res){
        this.driversList = res['data']
        this.driversList.forEach(driver => {
          driver['text'] = driver['full_name']
          driver['isSelected'] = false
        });
      }
    })
    this.getPickUpList(this.current_page)
  }
  changedDriver(value:any){
    this.selectedDriver = value;
  }
  changeRefOrderSelection(index: any){
    this.pickUpList[index]['isSelected'] = !this.pickUpList[index]['isSelected']
  }
  getPickUpList(page: any){
    this.gettingPickUpList = true;
    this.requestsService.getPickUpList(page).then((res) => {
      if(res){
        this.pickUpList = res['data']
        this.pickUpListMeta = res['meta'];
        this.pickUpList.forEach(item => {
          item['isSelected'] = false
        });
      }
      this.gettingPickUpList = false;
    })
  }
  assignToSend(){
    this.pickUpList.forEach(refOrder => {
      if(refOrder['isSelected']){
        this.selectedRefOrders.push(refOrder['id'])
      }
    });
    let assignAbleObject : Object = {}
    let selectedDriverObject = this.selectedDriver['data'][0];
    assignAbleObject['driver_id'] = selectedDriverObject['driver']['id']
    assignAbleObject['ref_order_ids'] = this.selectedRefOrders;
    this.assignList.forEach(element => {
      this.selectedRefOrders.forEach(refOrderID => {
        if(element['ref_order_ids'].find(item => item == refOrderID)){
          element['ref_order_ids'].splice( element['ref_order_ids'].indexOf(refOrderID), 1 );
        }
      });
    });
    this.assignList.push(assignAbleObject);
    assignAbleObject = {};
    this.selectedRefOrders = [];
    this.selectedDriver = {};
    this.pickUpList.forEach(refOrder => {
      if(refOrder['isSelected']){
        refOrder['driver_name'] = selectedDriverObject['full_name']
      }
      refOrder['isSelected'] = false;
    });
    this.assignList.forEach(element => {
      if(element['ref_order_ids'].length == 0){
        this.assignList.splice( this.assignList.indexOf(element), 1 );
      }
    });
  }

  makeCollectRoute(){
    this.requestsService.makeCollectRoute(this.assignList).then(result => {
      let successText: string = " تعداد " + result['routeCreated'] + "مسیر با موفقیت ثبت شد."
      let errorText: string = " تعداد " + result['routeFaceError'] + " مسیر با خطا مواجه شد."
      this.httpService.showWarning("توجه!!", successText + errorText);
      if(result['messages'].length > 0){
        result['messages'].forEach(element => {
          this.httpService.showError("خطا!", element);
        });
      }
    })
    this.ngOnInit()
  }
}
