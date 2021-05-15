import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


// import "rxjs/add/operator/map"

@Injectable({
  providedIn: 'root'
})
export class PlateDetailsService {

  constructor(private http: HttpClient) { }

  getParkingDurationData():Observable<any>{
   return this.http.get('http://192.168.108.21:8080/vehicle_access/getParkingDuration');
  }

  getParkingOccupancy():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getParkingOccupancy');
  }

  getParkingSummaryData():Observable<any>{
    // let test:any=[{"count":1,"type":["EMPLOYEE"],"vehicle_type":"BIKE"},{"count":1,"type":["VISITOR"],"vehicle_type":"BIKE"},{"count":1,"type":["VISITOR"],"vehicle_type":"CAR"},{"count":2,"type":["EMPLOYEE"],"vehicle_type":"CAR"}];
    // return test
   return this.http.get('http://192.168.108.21:8080/vehicle_access/getParkingSummary');
  }

  postPersonData(personObject):Observable<any>{
   return this.http.post('http://192.168.108.21:8080/vehicle_access/registerPerson',personObject);
  }
  
  getPersonData(method,vehicle_number):Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getPlateDetails?checkType='+method+'&vehicleNumber='+vehicle_number); 
  }

  getCurrentDayInfo():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getRibbonMetrics');
  }

  getPeriodicalSummary():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getPeriodicalParkingSummary');
  }
  getLastThreeMonthsData():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getLastThreeMonthsSummary');
  }
  getAvgParkingDuration():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getAvgParkingDuration');
  }
  getLastWeekParkingTrend():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getLastSevenDaysTrend');
  }

  getVehiclesCountByHour():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/getVehiclesParkedByHour');
  }

  getParkingFullStatus():Observable<any>{
    return this.http.get('http://192.168.108.21:8080/vehicle_access/checkParkingStatus');
  }
  
}
