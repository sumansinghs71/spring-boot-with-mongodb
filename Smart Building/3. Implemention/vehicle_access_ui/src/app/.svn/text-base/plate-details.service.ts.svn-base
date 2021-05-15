import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

// const url = "http://10.10.10.70:8090/vehicle_access";
const url = "http://192.168.108.21:8080/vehicle_access";

@Injectable({
  providedIn: 'root'
})
export class PlateDetailsService {

  constructor(private http: HttpClient) { }

  getParkingDurationData(): Observable<any> {
    return this.http.get(url + '/getParkingDuration');
  }

  getParkingOccupancy(): Observable<any> {
    return this.http.get(url + '/getParkingOccupancy');
  }

  getParkingSummaryData(): Observable<any> {
    // let test:any=[{"count":1,"type":["EMPLOYEE"],"vehicle_type":"BIKE"},{"count":1,"type":["VISITOR"],"vehicle_type":"BIKE"},{"count":1,"type":["VISITOR"],"vehicle_type":"CAR"},{"count":2,"type":["EMPLOYEE"],"vehicle_type":"CAR"}];
    // return test
    return this.http.get(url + '/getParkingSummary');
  }

  postPersonData(personObject): Observable<any> {
    return this.http.post(url + '/registerPerson', personObject);
  }

  getPersonData(method, vehicle_number): Observable<any> {
    return this.http.get(url + '/getPlateDetails?checkType=' + method + '&vehicleNumber=' + vehicle_number);
  }

  getCurrentDayInfo(): Observable<any> {
    return this.http.get(url + '/getRibbonMetrics');
  }

  getPeriodicalSummary(): Observable<any> {
    return this.http.get(url + '/getPeriodicalParkingSummary');
  }
  getLastThreeMonthsData(): Observable<any> {
    return this.http.get(url + '/getLastThreeMonthsSummary');
  }
  getAvgParkingDuration(): Observable<any> {
    return this.http.get(url + '/getAvgParkingDuration');
  }
  getLastWeekParkingTrend(): Observable<any> {
    return this.http.get(url + '/getLastSevenDaysTrend');
  }

  getVehiclesCountByHour(): Observable<any> {
    return this.http.get(url + '/getVehiclesParkedByHour');
  }

  getVehiclesParkedByDurationDetails(durationValue): Observable<any> {
    return this.http.get(url + '/getParkingDurationDetails?durationValue=' + durationValue);
  }

  getParkingSummaryDetails(personType, vehicleType): Observable<any> {
    return this.http.get(url + '/getParkingSummaryDetails?personType=' + personType + '&vehicleType=' + vehicleType);
  }

  getMonthlyVehicleDetails(vehicleType, monthName, yearValue): Observable<any> {
    return this.http.get(url + '/getMonthlyVehicleDetails?vehicleType=' + vehicleType + '&monthName=' + monthName + '&yearValue=' + yearValue);
  }

  getPeriodicalVehicleDetails(vehicleType, periodName): Observable<any> {
    return this.http.get(url + '/getPeriodicalVehicleDetails?vehicleType=' + vehicleType + '&periodName=' + periodName);
  }
}
