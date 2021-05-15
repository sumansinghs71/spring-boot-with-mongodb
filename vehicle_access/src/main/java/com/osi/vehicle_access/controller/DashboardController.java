package com.osi.vehicle_access.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osi.vehicle_access.aggregationMappers.BuildingOccupancy;
import com.osi.vehicle_access.aggregationMappers.ParkedVehiclesByHour;
import com.osi.vehicle_access.aggregationMappers.ParkingDuration;
import com.osi.vehicle_access.aggregationMappers.ParkingSummary;
import com.osi.vehicle_access.aggregationMappers.RibbonData;
import com.osi.vehicle_access.model.VehicleLog;
import com.osi.vehicle_access.service.Impl.DashboardServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class DashboardController {
	@Autowired
	private DashboardServiceImpl dashboardService;

	@RequestMapping("/getLastHourData")
	public ResponseEntity<List<VehicleLog>> getPlateDetails() {
		dashboardService.getCurrentDayCounts();
		return new ResponseEntity<List<VehicleLog>>(HttpStatus.OK);
	}

	@RequestMapping("/getRibbonMetrics")
	public ResponseEntity<RibbonData> getRibbonData() {
		RibbonData ribbonMetrics = dashboardService.getRibbonMetrics();
		return new ResponseEntity<RibbonData>(ribbonMetrics, HttpStatus.OK);
	}

	@RequestMapping("/getVehiclesParkedByHour")
	public ResponseEntity<ParkedVehiclesByHour> getVehiclesParkedByHour() {
		ParkedVehiclesByHour parkedVehiclesByHour = dashboardService.getVehiclesParkedByHour();
		return new ResponseEntity<ParkedVehiclesByHour>(parkedVehiclesByHour, HttpStatus.OK);
	}

	@RequestMapping("/getParkingOccupancy")
	public ResponseEntity<List<BuildingOccupancy>> getParkingOccupancy() {
		List<BuildingOccupancy> buildingOccupancyList = dashboardService.getParkingOccupancy();
		return new ResponseEntity<List<BuildingOccupancy>>(buildingOccupancyList, HttpStatus.OK);
	}

	@RequestMapping("/getParkingSummary")
	public ResponseEntity<List<ParkingSummary>> getParkingSummary() {
		List<ParkingSummary> parkingSumamry = dashboardService.getParkingSummary();
		return new ResponseEntity<List<ParkingSummary>>(parkingSumamry, HttpStatus.OK);
	}
	
	@RequestMapping("/getParkingDuration")
	public ResponseEntity<ParkingDuration> getParkingDuration() {
		ParkingDuration parkingDuration = dashboardService.getParkingDuration();
		return new ResponseEntity<ParkingDuration>(parkingDuration,HttpStatus.OK);
	}
}
