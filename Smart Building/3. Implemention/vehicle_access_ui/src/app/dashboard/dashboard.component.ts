import { PlateDetailsService } from './../plate-details.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { element } from 'protractor';


// class PlateDetails {
//   siteName: String;
//   camera: String;
//   plateNumber: String;
//   confidence: number;
//   authorized: boolean;
//   accessTime: Date;
// }
declare var $: any;
class EmployeeDetails {
  id: String;
  employeeName: String;
  employeeReportingManager: String;
  employeePhoneNumber: String;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showErrorNotification: boolean = false;
  errorMessage: String = '';
  employeeDetails: EmployeeDetails;
  availableBikeParking: any;
  parkingOccupanyCategories = [];
  // parkingDurationCategories = [];
  parkingCategories: String[] = [];
  parkingOccupanyForBikes = [];
  parkingOccupanyForCars = [];
  parkingDurationCategories = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  chart: any;
  timeSeries = [];
  barchart: any;
  pieChart: any;
  columnChart: any;
  stackchart: any;
  carDurationDataSet = [];
  bikeDurationDataSet = [];
  parkingSummaryDataSet = [];
  parkingDurationCarDataSet = [];
  parkingDurationBikeDataSet = [];
  vehicleDurationDetails = [];
  stackChartClickCategory = "";
  p: Number = 0;

  constructor(private plateDetailsService: PlateDetailsService) { }

  ngOnInit() {

    this.getVehicleCounters();
    this.getParkingDuration();
    this.getParkingOccupancy();
    this.getParkingSummary();
  }

  dashboardModalClose(){
    this.stackChartClickCategory = "";
  }

  getVehicleCounters() {
    this.plateDetailsService.getVehiclesCountByHour().subscribe(
      data => {
        this.bikeDurationDataSet = data.bikeDurationList;
        this.carDurationDataSet = data.carDurationList;
        this.renderBarChart();
      }
    );
  }
  getParkingDuration() {
    this.plateDetailsService.getParkingDurationData().subscribe(
      data => {
        for (let j = 0; j < this.parkingDurationCategories.length; j++) {
          this.parkingDurationCarDataSet.push(data.carCountsByHour[j]);
          this.parkingDurationBikeDataSet.push(data.bikeCountsByHour[j]);
        }
        this.renderStackChart();
      }
    );
  }
  getParkingOccupancy() {
    this.plateDetailsService.getParkingOccupancy().subscribe(
      data => {
        data.forEach(element => {
          this.parkingOccupanyCategories.push(element.floorName);
          this.parkingOccupanyForBikes.push(Math.round(element.bikeOccupancyPercent * 100));
          this.parkingOccupanyForCars.push(Math.round(element.carOccupancyPercent * 100));
        });
        this.renderColumnChart();
      }
    );
  }
  getParkingSummary() {
    this.plateDetailsService.getParkingSummaryData().subscribe(data => {
      data.forEach(element => {
        this.parkingSummaryDataSet.push({
          name: element.type + ' ' + element.vehicle_type,
          y: element.count
        });
      });
      this.renderPieChart();
    });
  }

  renderStackChartClicked(event) {
    let durationValue: Number = 0;
    let currentDateTime = Date.parse(new Date().toString());
    this.stackChartClickCategory = event.point.category;
    durationValue = event.point.category == '>8' ? 9 : event.point.category;
    this.plateDetailsService.getVehiclesParkedByDurationDetails(durationValue).subscribe(data => {
      this.vehicleDurationDetails = data;
      if (this.stackChartClickCategory == '>8') {
        this.vehicleDurationDetails.forEach(element => {
          let inTime: string = element.in_time;
          let diffInMs: number = currentDateTime - Date.parse(inTime);
          let diffInHours: number = Math.floor(diffInMs / 1000 / 60 / 60);
          element["duration"] = diffInHours;
        });
      }
      $("#vehicleModal").modal('show');
    });
  }

  renderPieChartClicked(event) {
    let pieClickedCategory: String = event.point.name;
    let personType = pieClickedCategory.split(" ")[0];
    let vehicleType = pieClickedCategory.split(" ")[1];
    this.plateDetailsService.getParkingSummaryDetails(personType, vehicleType).subscribe(data => {
      this.vehicleDurationDetails = data;
      $("#vehicleModal").modal('show');
    });
  }

  renderStackChart() {
    this.stackchart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Duration of vehicles today'
      },
      xAxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '>8'],
        title: {
          text: 'Duration'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'No of vehicles'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
            color: 'white'
          }
        },
        series: {
          events: {
            click: this.renderStackChartClicked.bind(this)
          }
        }
      },
      series: [{
        name: 'Car',
        data: this.parkingDurationCarDataSet
      }, {
        name: 'Bike',
        data: this.parkingDurationBikeDataSet
      }]
    });
  }

  renderBarChart() {
    this.barchart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Vehicles Parked by Hour'
      },
      xAxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'No of vehicles'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Bike',
        data: this.bikeDurationDataSet
      }, {
        name: 'Car',
        data: this.carDurationDataSet
      }]
    });
  }
  renderColumnChart() {
    this.columnChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.parkingOccupanyCategories,
        title: {
          text: 'Parking lot'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            style: {
              color: 'black'
            }
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Bike',
        data: this.parkingOccupanyForBikes
      }, {
        name: 'Car',
        data: this.parkingOccupanyForCars
      }]
    });
  }

  renderPieChart() {
    this.pieChart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Parking Summary'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        },
        series: {
          events: {
            click: this.renderPieChartClicked.bind(this)
          }
        }
      }
      ,
      colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
      ,
      series: [{
        name: 'Percentage',
        data: this.parkingSummaryDataSet
      }]
    });
  }

}

