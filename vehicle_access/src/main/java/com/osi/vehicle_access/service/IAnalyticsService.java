package com.osi.vehicle_access.service;

import java.util.HashMap;

import com.osi.vehicle_access.aggregationMappers.AvgParkingDurationResponse;
import com.osi.vehicle_access.aggregationMappers.LastSevenDayMetrics;

public interface IAnalyticsService {
	public HashMap<String, HashMap<String, Integer>> getPeriodicalParkingSummary();

	public HashMap<String, HashMap<String, Integer>> getLastThreeMonthsSummary();

	public LastSevenDayMetrics getLastSevenDaysTrend();

	public AvgParkingDurationResponse getAvgParkingDuration();
}
