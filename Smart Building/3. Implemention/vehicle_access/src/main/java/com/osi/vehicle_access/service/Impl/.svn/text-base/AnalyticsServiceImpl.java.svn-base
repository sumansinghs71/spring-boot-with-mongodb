package com.osi.vehicle_access.service.Impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Divide;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Floor;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Subtract;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.osi.vehicle_access.aggregationMappers.AvgParkingDuration;
import com.osi.vehicle_access.aggregationMappers.AvgParkingDurationResponse;
import com.osi.vehicle_access.aggregationMappers.LastSevenDayMetrics;
import com.osi.vehicle_access.aggregationMappers.PeriodicalParking;
import com.osi.vehicle_access.aggregationMappers.VehicleLogMapper;
import com.osi.vehicle_access.aggregationMappers.VehiclesByDuration;
import com.osi.vehicle_access.service.IAnalyticsService;
import com.osi.vehicle_access.utils.DateRangeUtils;

@Service
public class AnalyticsServiceImpl implements IAnalyticsService {
	@Autowired
	private MongoOperations mongoOperations;

	@Override
	public HashMap<String, HashMap<String, Integer>> getPeriodicalParkingSummary() {

		DateRangeUtils dateRangeUtils = new DateRangeUtils();

		// Get Today values
		Date startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayStart").toString().replaceFirst("T", " ").concat(":00"));
		Date endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayEnd").toString().replaceFirst("T", " ").concat(":00"));

		AggregationOperation match = Aggregation.match(
				Criteria.where("in_time").lt(endDate).gt(startDate).andOperator(Criteria.where("status").is("IN")));

		Aggregation currentDayParkingAgg = Aggregation.newAggregation(match,
				Aggregation.project().andExpression("vehicle_type").as("type"),
				Aggregation.group(Aggregation.fields().and("type")).count().as("count"));

		List<PeriodicalParking> vehicleByCurrentDay = mongoOperations
				.aggregate(currentDayParkingAgg, "vehicleLog", PeriodicalParking.class).getMappedResults();

		HashMap<String, Integer> vehicleByCurrentDayMap = getMapForVehicleCount(vehicleByCurrentDay);
		// End

		// Get this week values
		HashMap<String, LocalDate> thisWeekDates = dateRangeUtils.getThisWeekDates();
		Date thisWeekStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisWeekDates.get("thisWeekMonday").toString().concat(" 00:00:00"));
		Date thisWeekEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisWeekDates.get("thisWeekSunday").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleByThisWeek = mongoOperations
				.aggregate(getPeriodicCountAggregation(thisWeekStartDate, thisWeekEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();

		HashMap<String, Integer> vehicleByThisWeekMap = getMapForVehicleCount(vehicleByThisWeek);
		// End

		// Get this month values
		HashMap<String, LocalDate> thisMonthDates = dateRangeUtils.getThisMonthDates();
		Date thisMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisMonthDates.get("thisMonthBegin").toString().concat(" 00:00:00"));
		Date thisMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisMonthDates.get("thisMonthEnd").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleByThisMonth = mongoOperations
				.aggregate(getPeriodicCountAggregation(thisMonthStartDate, thisMonthEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();

		HashMap<String, Integer> vehicleByThisMonthMap = getMapForVehicleCount(vehicleByThisMonth);
		// End

		// Get last month values
		HashMap<String, LocalDate> lastMonthDates = dateRangeUtils.getLastMonthDates(1);
		Date lastMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastMonthDates.get("lastMonthBegin").toString().concat(" 00:00:00"));
		Date lastMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastMonthDates.get("lastMonthEnd").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleByLastMonth = mongoOperations
				.aggregate(getPeriodicCountAggregation(lastMonthStartDate, lastMonthEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();

		HashMap<String, Integer> vehicleByLastMonthMap = getMapForVehicleCount(vehicleByLastMonth);
		// End

		// Mapping to a conformed response
		HashMap<String, HashMap<String, Integer>> periodicalMetrics = new HashMap<String, HashMap<String, Integer>>();
		periodicalMetrics.put("today", vehicleByCurrentDayMap);
		periodicalMetrics.put("thisWeek", vehicleByThisWeekMap);
		periodicalMetrics.put("thisMonth", vehicleByThisMonthMap);
		periodicalMetrics.put("lastMonth", vehicleByLastMonthMap);
		// End

		return periodicalMetrics;
	}

	public HashMap<String, HashMap<String, Integer>> getLastThreeMonthsSummary() {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		// Get last month values
		HashMap<String, LocalDate> lastMonthDates = dateRangeUtils.getLastMonthDates(1);
		Date lastMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastMonthDates.get("lastMonthBegin").toString().concat(" 00:00:00"));
		Date lastMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastMonthDates.get("lastMonthEnd").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleByLastMonth = mongoOperations
				.aggregate(getPeriodicCountAggregation(lastMonthStartDate, lastMonthEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();

		HashMap<String, Integer> vehicleByLastMonthMap = getMapForVehicleCount(vehicleByLastMonth);
		// End

		// Get second last month values
		HashMap<String, LocalDate> secondLastMonthDates = dateRangeUtils.getLastMonthDates(2);
		Date secondLastMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				secondLastMonthDates.get("lastMonthBegin").toString().concat(" 00:00:00"));
		Date secondLastMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				secondLastMonthDates.get("lastMonthEnd").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleBySecondLastMonth = mongoOperations
				.aggregate(getPeriodicCountAggregation(secondLastMonthStartDate, secondLastMonthEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();

		HashMap<String, Integer> vehicleBySecondLastMonthMap = getMapForVehicleCount(vehicleBySecondLastMonth);
		// End

		// Get third last month values
		HashMap<String, LocalDate> thirdLastMonthDates = dateRangeUtils.getLastMonthDates(3);
		Date thirdLastMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thirdLastMonthDates.get("lastMonthBegin").toString().concat(" 00:00:00"));
		Date thirdLastMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thirdLastMonthDates.get("lastMonthEnd").toString().concat(" 23:59:59"));

		List<PeriodicalParking> vehicleByThirdLastMonth = mongoOperations
				.aggregate(getPeriodicCountAggregation(thirdLastMonthStartDate, thirdLastMonthEndDate), "vehicleLog",
						PeriodicalParking.class)
				.getMappedResults();
		HashMap<String, Integer> vehicleByThirdLastMonthMap = getMapForVehicleCount(vehicleByThirdLastMonth);
		// End

		// Mapping to a conformed response
		HashMap<String, HashMap<String, Integer>> lastThreeMonthsMetrics = new HashMap<String, HashMap<String, Integer>>();
		lastThreeMonthsMetrics.put("lastMonth", vehicleByLastMonthMap);
		lastThreeMonthsMetrics.put("secondLastMonth", vehicleBySecondLastMonthMap);
		lastThreeMonthsMetrics.put("thirdLastMonth", vehicleByThirdLastMonthMap);
		// End

		return lastThreeMonthsMetrics;
	}

	public LastSevenDayMetrics getLastSevenDaysTrend() {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		// Get last seven days start and end date as date object for mongo query
		HashMap<String, LocalDate> lastSevenDayDates = dateRangeUtils.getLastNDates(7);
		Date lastSevenDaysStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastSevenDayDates.get("dayBegin").toString().concat(" 00:00:00"));
		Date lastSevenDaysEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				lastSevenDayDates.get("dayEnd").toString().concat(" 23:59:59"));

		// Get the results from mongodb
		AggregationOperation match = Aggregation
				.match(Criteria.where("in_time").lt(lastSevenDaysEndDate).gt(lastSevenDaysStartDate));

		Aggregation lastSevenDaysAgg = Aggregation.newAggregation(match,
				Aggregation.project().andExpression("vehicle_type").as("type").andExpression("dayOfMonth(in_time)")
						.as("duration"),
				Aggregation.group(Aggregation.fields().and("duration").and("type")).count().as("count"));

		List<VehiclesByDuration> lastSevenDaysData = mongoOperations
				.aggregate(lastSevenDaysAgg, "vehicleLog", VehiclesByDuration.class).getMappedResults();

		// Get List of dates for the past seven days
		List<LocalDate> lastSevenDaysDateList = dateRangeUtils.getDatesBetween(
				lastSevenDaysStartDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
				lastSevenDaysEndDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

		HashMap<Integer, String> dateToDayMap = new HashMap<Integer, String>();
		HashMap<Integer, Integer> carDateDataMap = new HashMap<Integer, Integer>();
		HashMap<Integer, Integer> bikeDateDataMap = new HashMap<Integer, Integer>();

		// Creating map for car counts,bike counts and initializing them to 0
		// Creating a mapping for the date value and the day it represents
		// Adding day names to list for the purpose of mapping in the UI
		List<String> daysSequence = new ArrayList<String>();
		for (LocalDate dateData : lastSevenDaysDateList) {
			daysSequence.add(dateData.getDayOfWeek().name());
			dateToDayMap.put(dateData.getDayOfMonth(), dateData.getDayOfWeek().name());
			carDateDataMap.put(dateData.getDayOfMonth(), 0);
			bikeDateDataMap.put(dateData.getDayOfMonth(), 0);
		}

		// Adding the counts present for a day to the respective maps.
		// Counts not present for a date will be 0
		for (VehiclesByDuration vehicleData : lastSevenDaysData) {
			if (vehicleData.getType().equalsIgnoreCase("car")) {
				carDateDataMap.put(vehicleData.getDuration(), vehicleData.getCount());
			} else if (vehicleData.getType().equalsIgnoreCase("bike")) {
				bikeDateDataMap.put(vehicleData.getDuration(), vehicleData.getCount());
			}
		}

		// Mapping to the day values as key in place of the date
		HashMap<String, Integer> carDayDataMap = new HashMap<String, Integer>();
		HashMap<String, Integer> bikeDayDataMap = new HashMap<String, Integer>();

		for (Integer key : carDateDataMap.keySet()) {
			carDayDataMap.put(dateToDayMap.get(key), carDateDataMap.get(key));
		}
		for (Integer key : bikeDateDataMap.keySet()) {
			bikeDayDataMap.put(dateToDayMap.get(key), bikeDateDataMap.get(key));
		}

		// Creating a list of days in sequence as the above maps created is
		// shuffling the days
		// List<String> daysSequence = new ArrayList<String>();
		// for (String days : dateToDayMap.values()) {
		// daysSequence.add(days);
		// }

		// Putting the data in a model to send as a resposne
		LastSevenDayMetrics lastSevenDayMetrics = new LastSevenDayMetrics();
		lastSevenDayMetrics.setDaySequence(daysSequence);
		lastSevenDayMetrics.setCarDayDataMap(carDayDataMap);
		lastSevenDayMetrics.setBikeDayDataMap(bikeDayDataMap);
		return lastSevenDayMetrics;
	}

	public AvgParkingDurationResponse getAvgParkingDuration() {
		// Get current month date range
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		HashMap<String, LocalDate> thisMonthDates = dateRangeUtils.getThisMonthDates();
		Date thisMonthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisMonthDates.get("thisMonthBegin").toString().concat(" 00:00:00"));
		Date thisMonthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				thisMonthDates.get("thisMonthEnd").toString().concat(" 23:59:59"));
		// End

		// Aggregation for getting the current month parking duration count
		// grouped by type of employee and the count
		// Two collections are being looked up : persons and vehicleLog
		AggregationOperation match = Aggregation.match(Criteria.where("in_time").lt(thisMonthEndDate)
				.gt(thisMonthStartDate).andOperator(Criteria.where("status").is("OUT")));

		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		Floor floor = Floor.floorValueOf(Divide.valueOf("diff_msecs").divideBy(1000 * 60 * 60));
		ProjectionOperation project1 = Aggregation.project("in_time", "out_time").and("personDetails").as("person")
				.and(Subtract.valueOf("out_time").subtract("in_time")).as("diff_msecs");
		ProjectionOperation project2 = Aggregation.project("in_time", "out_time").and("person.type").as("type")
				.and(floor).as("duration");

		GroupOperation groupOperation = Aggregation.group("duration", "type").count().as("count");

		Aggregation aggregation = Aggregation.newAggregation(match, lookupOperation, project1, project2,
				groupOperation);
		// End
		// Assigning to a predefined class to be mapped by mongodb
		List<AvgParkingDuration> avgParkingDurationList = mongoOperations
				.aggregate(aggregation, "vehicleLog", AvgParkingDuration.class).getMappedResults();

		// Creating maps for Employee,Visitor and others to get their repective
		// duration count
		HashMap<Integer, Integer> employeeParkingDurationData = new HashMap<Integer, Integer>();
		HashMap<Integer, Integer> visitorParkingDurationData = new HashMap<Integer, Integer>();
		HashMap<Integer, Integer> othersParkingDurationData = new HashMap<Integer, Integer>();

		// Initializing each key with 0 to have 0 for durations not present
		for (int i = 0; i <= 9; i++) {
			employeeParkingDurationData.put(i, 0);
			visitorParkingDurationData.put(i, 0);
			othersParkingDurationData.put(i, 0);
		}

		// If number of hours > 8 putting cumulative count into key 9
		for (AvgParkingDuration avgParkingDurationData : avgParkingDurationList) {
			if (avgParkingDurationData.getType().equalsIgnoreCase("employee")) {
				if (avgParkingDurationData.getDuration() > 8) {
					employeeParkingDurationData.put(9,
							employeeParkingDurationData.get(9) + avgParkingDurationData.getCount());
				} else {
					employeeParkingDurationData.put(avgParkingDurationData.getDuration(),
							avgParkingDurationData.getCount());
				}
			} else if (avgParkingDurationData.getType().equalsIgnoreCase("visitor")) {
				if (avgParkingDurationData.getDuration() > 8) {
					visitorParkingDurationData.put(9,
							visitorParkingDurationData.get(9) + avgParkingDurationData.getCount());
				} else {
					visitorParkingDurationData.put(avgParkingDurationData.getDuration(),
							avgParkingDurationData.getCount());
				}
			} else {
				if (avgParkingDurationData.getDuration() > 8) {
					othersParkingDurationData.put(9,
							othersParkingDurationData.get(9) + avgParkingDurationData.getCount());
				} else {
					othersParkingDurationData.put(avgParkingDurationData.getDuration(),
							avgParkingDurationData.getCount());
				}
			}
		}

		// Adding the calculated fields to a response specific object
		AvgParkingDurationResponse avgParkingDurationResponse = new AvgParkingDurationResponse();
		avgParkingDurationResponse.setEmployeeParkingDurationData(employeeParkingDurationData);
		avgParkingDurationResponse.setVisitorParkingDurationData(visitorParkingDurationData);
		avgParkingDurationResponse.setOthersParkingDurationData(othersParkingDurationData);

		return avgParkingDurationResponse;
	}

	// Common method for getPeriodicalParkingSummary() and
	// getLastThreeMonthsSummary()
	public Aggregation getPeriodicCountAggregation(Date startDate, Date endDate) {
		AggregationOperation match = Aggregation.match(Criteria.where("in_time").lt(endDate).gt(startDate));
		Aggregation parkingAgg = Aggregation.newAggregation(match,
				Aggregation.project().andExpression("vehicle_type").as("type"),
				Aggregation.group(Aggregation.fields().and("type")).count().as("count"));

		return parkingAgg;
	}

	// Common method for getPeriodicalParkingSummary() and
	// getLastThreeMonthsSummary()
	public HashMap<String, Integer> getMapForVehicleCount(List<PeriodicalParking> vehicleCountList) {
		HashMap<String, Integer> vehicleCountMap = new HashMap<String, Integer>();
		vehicleCountMap.put("car", 0);
		vehicleCountMap.put("bike", 0);
		for (PeriodicalParking data : vehicleCountList) {
			if (data.get_id().equalsIgnoreCase("car")) {
				vehicleCountMap.put("car", data.getCount());
			} else if (data.get_id().equalsIgnoreCase("bike")) {
				vehicleCountMap.put("bike", data.getCount());
			}
		}
		return vehicleCountMap;
	}

	@Override
	public List<VehicleLogMapper> getMonthlyVehicleDetails(String vehicleType, String monthName, Integer yearValue) {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		// Getting the month start and end dates based on the month name and the
		// year
		HashMap<String, LocalDate> monthDates = dateRangeUtils.getDateByMonthNameAndYear(monthName, yearValue);
		Date monthStartDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				monthDates.get("monthBegin").toString().concat(" 00:00:00"));
		Date monthEndDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				monthDates.get("monthEnd").toString().concat(" 23:59:59"));
		// Mongo operation to get all the records for the specified date range
		AggregationOperation match = Aggregation.match(Criteria.where("in_time").lt(monthEndDate).gt(monthStartDate)
				.andOperator(Criteria.where("vehicle_type").regex("^" + vehicleType + "$", "i")));

		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match);

		List<VehicleLogMapper> vehicleLogs = mongoOperations
				.aggregate(aggregation, "vehicleLog", VehicleLogMapper.class).getMappedResults();

		return vehicleLogs;
	}

	@Override
	public List<VehicleLogMapper> getPeriodicalVehicleDetails(String vehicleType, String periodName) {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		Date startDate = new Date();
		Date endDate = new Date();
		AggregationOperation match = null;

		// Creating aggregation based on periodName
		if (periodName.equalsIgnoreCase("today")) {
			startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
					dateRangeUtils.getTodayDates().get("todayStart").toString().replaceFirst("T", " ").concat(":00"));
			endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
					dateRangeUtils.getTodayDates().get("todayEnd").toString().replaceFirst("T", " ").concat(":00"));

			match = Aggregation
					.match(Criteria.where("in_time").lt(endDate).gt(startDate).andOperator(Criteria.where("status")
							.is("IN").andOperator(Criteria.where("vehicle_type").regex("^" + vehicleType + "$", "i"))));

		} else {
			if (periodName.equalsIgnoreCase("thisweek")) {
				HashMap<String, LocalDate> thisWeekDates = dateRangeUtils.getThisWeekDates();
				startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						thisWeekDates.get("thisWeekMonday").toString().concat(" 00:00:00"));
				endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						thisWeekDates.get("thisWeekSunday").toString().concat(" 23:59:59"));

			} else if (periodName.equalsIgnoreCase("thismonth")) {
				HashMap<String, LocalDate> thisMonthDates = dateRangeUtils.getThisMonthDates();
				startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						thisMonthDates.get("thisMonthBegin").toString().concat(" 00:00:00"));
				endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						thisMonthDates.get("thisMonthEnd").toString().concat(" 23:59:59"));

			} else if (periodName.equalsIgnoreCase("lastmonth")) {
				HashMap<String, LocalDate> lastMonthDates = dateRangeUtils.getLastMonthDates(1);
				startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						lastMonthDates.get("lastMonthBegin").toString().concat(" 00:00:00"));
				endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
						lastMonthDates.get("lastMonthEnd").toString().concat(" 23:59:59"));
			}
			match = Aggregation.match(Criteria.where("in_time").lt(endDate).gt(startDate)
					.andOperator(Criteria.where("vehicle_type").regex("^" + vehicleType + "$", "i")));
		}

		// Mongo operation to get all data based on the criteria passed
		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match);

		List<VehicleLogMapper> vehicleLogs = mongoOperations
				.aggregate(aggregation, "vehicleLog", VehicleLogMapper.class).getMappedResults();

		return vehicleLogs;
	}

}
