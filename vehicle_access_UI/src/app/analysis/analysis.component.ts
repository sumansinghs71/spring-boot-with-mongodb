import { Component, OnInit } from '@angular/core';
import { PlateDetailsService } from '../plate-details.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  currentDayInfo: any;
  periodicChart: any;
  parkingSummary: any;
  parkingDuration: any;
  parkingTrend: any;
  periodicParkingSummmaryCategories = ["today", "thisWeek", "thisMonth", "lastMonth"];
  periodicParkingSummmaryBikeDataset = [];
  periodicParkingSummmaryCarDataset = [];
  parkingSummmaryCategories = ["thirdLastMonth", "secondLastMonth", "lastMonth"];
  parkingSummmaryBikeDataset = [];
  parkingSummmaryCarDataset = [];
  avgParkingCategories = ['0','1', '2', '3', '4', '5', '6', '7', '8','9'];
  avgParkingEmpDataset = [];
  avgParkingVisitorsDataset = [];
  avgParkingOthersDataset = [];
  monthNames: any = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  avgParkingDurationCategories = [];
  avgParkingDurationBikeDataset = [];
  avgParkingDurationCarDataset = [];
  today = new Date();
  last3Months = []

  constructor(private plateDetailsService: PlateDetailsService) { }

  ngOnInit() {
    this.getCurrentDayInfo();
    this.getPeriodicChart();
    this.getParkingSummary();
    this.getParkingDuration();
    this.getParkingTrend();
    this.getLastThreeMonths();
  }
  getLastThreeMonths() {
    for (let k = 3; k > 0; k--) {
      this.last3Months.push(this.monthNames[(this.today.getMonth() - k)] + ' - ' + this.today.getFullYear());
    }
  }
  getCurrentDayInfo() {
    this.currentDayInfo = this.plateDetailsService.getCurrentDayInfo();
    console.log("currentDay------------------", this.currentDayInfo);
  }

  getPeriodicChart() {
    this.plateDetailsService.getPeriodicalSummary().subscribe(data => {
      for (let i = 0; i < this.periodicParkingSummmaryCategories.length; i++) {
        this.periodicParkingSummmaryCarDataset.push(data[this.periodicParkingSummmaryCategories[i]]["car"]);
        this.periodicParkingSummmaryBikeDataset.push(data[this.periodicParkingSummmaryCategories[i]]["bike"]);
      }
      this.renderPeriodicChart();
    }, error => {

    })

  }

  getParkingSummary() {
    this.plateDetailsService.getLastThreeMonthsData().subscribe(data => {
      for (let i = 0; i < this.parkingSummmaryCategories.length; i++) {
        this.parkingSummmaryCarDataset.push(data[this.parkingSummmaryCategories[i]]["car"]);
        this.parkingSummmaryBikeDataset.push(data[this.parkingSummmaryCategories[i]]["bike"]);
      }
      console.log(this.parkingSummmaryBikeDataset + "sss" + this.parkingSummmaryCarDataset);
      this.renderPeriodicSummary();
    }, error => {

    })
  }

  getParkingDuration() {
    this.plateDetailsService.getAvgParkingDuration().subscribe(data => {
    for(let j=0;j<this.avgParkingCategories.length;j++){
      this.avgParkingEmpDataset.push(data.employeeParkingDurationData[j]);
      this.avgParkingVisitorsDataset.push(data.visitorParkingDurationData[j]);
      this.avgParkingOthersDataset.push(data.othersParkingDurationData[j]);
    }
    
    console.log("***1",this.avgParkingEmpDataset)
    console.log("***2",this.avgParkingVisitorsDataset)
    console.log("***3",this.avgParkingOthersDataset)  
    this.renderParkingDuration();
    }, error => {

    })
  }

  getParkingTrend() {
    this.plateDetailsService.getLastWeekParkingTrend().subscribe(data => {
      let temp: any =data;
      this.avgParkingDurationCategories=temp["daySequence"];
      for(let b=0;b<temp["daySequence"].length;b++){
        this.avgParkingDurationCarDataset.push(temp["carDayDataMap"][temp["daySequence"][b]]);
        this.avgParkingDurationBikeDataset.push(temp["bikeDayDataMap"][temp["daySequence"][b]]);  
      }
      this.renderParkingTrend();
    }, error => {

    })
    
  }

  renderParkingTrend() {
    this.parkingTrend = new Chart({

      title: {
        text: ''
      },

      subtitle: {
        text: ''
      },
      xAxis: {
        categories: this.avgParkingDurationCategories,
        title: {
          text: ''
        }
      },
      yAxis: {
        title: {
          text: 'Number of Vehicles'
        }
      },
      plotOptions: {
        series: {
          pointStart: 0
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Bikes',
        data: this.avgParkingDurationBikeDataset
      }, {
        name: 'Cars',
        data: this.avgParkingDurationCarDataset
      }]

    });
  }
  renderParkingDuration() {

    this.parkingDuration = new Chart({

      title: {
        text: ''
      },

      subtitle: {
        text: ''
      },
      xAxis: {
        categories: ['0','1', '2', '3', '4', '5', '6', '7', '8','>8'],
        title: {
          text: ''
        }
      },
      yAxis: {
        title: {
          text: 'Number of Vehicles'
        }
      },
      plotOptions: {
        series: {
          pointStart: 0
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Employees',
        data: this.avgParkingEmpDataset
      }, {
        name: 'Visitors',
        data: this.avgParkingVisitorsDataset
      }, {
        name: 'Others',
        data: this.avgParkingOthersDataset
      }]

    });
  }

  renderPeriodicSummary() {
    this.parkingSummary = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.last3Months,
        title: {
          text: ''
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
        data: this.parkingSummmaryBikeDataset
      }, {
        name: 'Car',
        data: this.parkingSummmaryCarDataset
      }]
    });
  }
  renderPeriodicChart() {
    this.periodicChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Today', 'This Week', 'This Month', 'Last Month'],
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
        data: this.periodicParkingSummmaryBikeDataset
      }, {
        name: 'Car',
        data: this.periodicParkingSummmaryCarDataset
      }]
    });
  }
}
