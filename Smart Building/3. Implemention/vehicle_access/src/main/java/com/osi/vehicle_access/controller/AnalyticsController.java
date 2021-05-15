package com.osi.vehicle_access.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osi.vehicle_access.aggregationMappers.AvgParkingDurationResponse;
import com.osi.vehicle_access.aggregationMappers.LastSevenDayMetrics;
import com.osi.vehicle_access.aggregationMappers.VehicleLogMapper;
import com.osi.vehicle_access.service.Impl.AnalyticsServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class AnalyticsController {
	@Autowired
	private AnalyticsServiceImpl analyticsService;

	@RequestMapping("/getPeriodicalParkingSummary")
	public ResponseEntity<HashMap<String, HashMap<String, Integer>>> getPlateDetails() {
		HashMap<String, HashMap<String, Integer>> periodicalParkingSummary = analyticsService
				.getPeriodicalParkingSummary();
		return new ResponseEntity<HashMap<String, HashMap<String, Integer>>>(periodicalParkingSummary, HttpStatus.OK);
	}

	@RequestMapping("/getLastThreeMonthsSummary")
	public ResponseEntity<HashMap<String, HashMap<String, Integer>>> getLastThreeMonthsSummary() {
		HashMap<String, HashMap<String, Integer>> lastThreeMonthsSummary = analyticsService.getLastThreeMonthsSummary();
		return new ResponseEntity<HashMap<String, HashMap<String, Integer>>>(lastThreeMonthsSummary, HttpStatus.OK);
	}

	@RequestMapping("/getLastSevenDaysTrend")
	public ResponseEntity<LastSevenDayMetrics> getLastSevenDaysTrend() {
		LastSevenDayMetrics lastSevenDayMetrics = analyticsService.getLastSevenDaysTrend();
		return new ResponseEntity<LastSevenDayMetrics>(lastSevenDayMetrics, HttpStatus.OK);
	}

	@RequestMapping("/getAvgParkingDuration")
	public ResponseEntity<AvgParkingDurationResponse> getAvgParkingDuration() {
		AvgParkingDurationResponse avgParkingDurationResponse = analyticsService.getAvgParkingDuration();
		return new ResponseEntity<AvgParkingDurationResponse>(avgParkingDurationResponse, HttpStatus.OK);
	}

	@RequestMapping("/getMonthlyVehicleDetails")
	public ResponseEntity<List<VehicleLogMapper>> getMonthlyVehicleDetails(
			@RequestParam("vehicleType") String vehicleType, @RequestParam("monthName") String monthName,
			@RequestParam("yearValue") Integer yearValue) {
		List<VehicleLogMapper> vehicleDetails = analyticsService.getMonthlyVehicleDetails(vehicleType, monthName,
				yearValue);
		return new ResponseEntity<List<VehicleLogMapper>>(vehicleDetails, HttpStatus.OK);
	}

	@RequestMapping("/getPeriodicalVehicleDetails")
	public ResponseEntity<List<VehicleLogMapper>> getPeriodicalVehicleDetails(
			@RequestParam("vehicleType") String vehicleType, @RequestParam("periodName") String periodName) {
		List<VehicleLogMapper> vehicleDetails = analyticsService.getPeriodicalVehicleDetails(vehicleType, periodName);
		return new ResponseEntity<List<VehicleLogMapper>>(vehicleDetails, HttpStatus.OK);
	}

}
