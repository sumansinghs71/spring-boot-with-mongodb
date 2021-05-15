import { PlateDetailsService } from './plate-details.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoutingModule } from './routing';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AnalysisComponent } from './analysis/analysis.component';
import { RibbonComponent } from './ribbon/ribbon.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    AnalysisComponent,
    RibbonComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartModule,
    RoutingModule,
    FormsModule
  ],
  providers: [PlateDetailsService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
