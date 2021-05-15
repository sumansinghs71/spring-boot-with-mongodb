package com.osi.vehicle_access.service;

import java.util.HashMap;
import java.util.List;

import com.osi.vehicle_access.aggregationMappers.AvgParkingDurationResponse;
import com.osi.vehicle_access.aggregationMappers.LastSevenDayMetrics;
import com.osi.vehicle_access.aggregationMappers.VehicleLogMapper;

public interface IAnalyticsService {
	public HashMap<String, HashMap<String, Integer>> getPeriodicalParkingSummary();

	public HashMap<String, HashMap<String, Integer>> getLastThreeMonthsSummary();

	public LastSevenDayMetrics getLastSevenDaysTrend();

	public AvgParkingDurationResponse getAvgParkingDuration();

	public List<VehicleLogMapper> getMonthlyVehicleDetails(String vehicleType, String monthName, Integer yearValue);

	public List<VehicleLogMapper> getPeriodicalVehicleDetails(String vehicleType, String periodName);
}
