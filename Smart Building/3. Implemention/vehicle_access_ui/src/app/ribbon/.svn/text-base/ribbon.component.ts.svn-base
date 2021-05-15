import { Component, OnInit } from '@angular/core';
import { PlateDetailsService } from '../plate-details.service';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  currentDayInfo: any;
  currentNoOfCars: any;
  totalCarParking: any;
  availableCarParking: any;
  availableBikeParking:any;
  currentNoOfBikes: any;
  totalBikeParking: any;

  constructor(private plateDetailsService: PlateDetailsService) { }

  ngOnInit() {
    this.getCurrentDayInfo();
  }
  getCurrentDayInfo() {
    this.plateDetailsService.getCurrentDayInfo().subscribe(response => {
      this.currentDayInfo = response;
      this.currentNoOfBikes = this.currentDayInfo.currentNumberOfBikes == null ? 0 : this.currentDayInfo.currentNumberOfBikes;
      this.currentNoOfCars = this.currentDayInfo.currentNumberOfCars == null ? 0 : this.currentDayInfo.currentNumberOfCars;
      this.availableBikeParking = this.currentDayInfo.availableBikeParking == null ? 0 : this.currentDayInfo.availableBikeParking;
      this.availableCarParking = this.currentDayInfo.availableCarParking == null ? 0 : this.currentDayInfo.availableCarParking;
      this.totalBikeParking = this.currentDayInfo.totalBikeParking == null ? 0 : this.currentDayInfo.totalBikeParking;
      this.totalCarParking = this.currentDayInfo.totalCarParking == null ? 0 : this.currentDayInfo.totalCarParking;
    });
  }
}
