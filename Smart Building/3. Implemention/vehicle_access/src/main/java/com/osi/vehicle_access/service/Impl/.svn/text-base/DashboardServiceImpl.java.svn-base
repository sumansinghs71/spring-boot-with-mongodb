package com.osi.vehicle_access.service.Impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Controller;

import com.osi.vehicle_access.aggregationMappers.BuildingOccupancy;
import com.osi.vehicle_access.aggregationMappers.ParkedVehiclesByHour;
import com.osi.vehicle_access.aggregationMappers.ParkingDuration;
import com.osi.vehicle_access.aggregationMappers.ParkingSummary;
import com.osi.vehicle_access.aggregationMappers.RibbonData;
import com.osi.vehicle_access.aggregationMappers.VehicleLogMapper;
import com.osi.vehicle_access.aggregationMappers.VehiclesByDuration;
import com.osi.vehicle_access.model.Building;
import com.osi.vehicle_access.model.VehicleLog;
import com.osi.vehicle_access.repository.BuildingRepository;
import com.osi.vehicle_access.repository.VehicleLogRepository;
import com.osi.vehicle_access.service.IDashboardService;
import com.osi.vehicle_access.utils.DateRangeUtils;

@Controller
public class DashboardServiceImpl implements IDashboardService {

	@Autowired
	private MongoOperations mongoOperations;
	@Autowired
	private BuildingRepository buildingRepository;
	@Autowired
	private VehicleLogRepository vehicleLogRepository;

	public RibbonData getRibbonMetrics() {
		RibbonData ribbonData = new RibbonData();
		DateRangeUtils dateRangeUtils = new DateRangeUtils();

		Date startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayStart").toString().replaceFirst("T", " ").concat(":00"));
		Date endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayEnd").toString().replaceFirst("T", " ").concat(":00"));

		// Aggregation to group by particular building name
		// Adding the field values to get total values
		AggregationOperation buildingFilter = Aggregation.match(Criteria.where("name").regex("^OSI Consulting Pvt Ltd$", "i"));
		Aggregation aggregation = Aggregation.newAggregation(buildingFilter,
				Aggregation.group("name").sum("total_car_slots").as("totalCarParking").sum("total_bike_slots")
						.as("totalBikeParking").sum("remaining_car_slots").as("availableCarParking")
						.sum("remaining_bike_slots").as("availableBikeParking"));

		List<RibbonData> ribbonDataList = mongoOperations.aggregate(aggregation, "buildings", RibbonData.class)
				.getMappedResults();

		// Assigning the data to RibbonData class
		ribbonData = ribbonDataList.get(0);
		// End

		// Aggregation to get the number of cars in 'IN' status for current day
		AggregationOperation match = Aggregation.match(
				Criteria.where("in_time").lt(endDate).gt(startDate).andOperator(Criteria.where("status").is("IN")));

		Aggregation currentDayRibbonAgg = Aggregation.newAggregation(match,
				Aggregation.project().andExpression("vehicle_type").as("type").andExpression("dayOfMonth(in_time)")
						.as("duration"),
				Aggregation.group(Aggregation.fields().and("duration").and("type")).count().as("count"));

		List<VehiclesByDuration> vehicleByCurrentDay = mongoOperations
				.aggregate(currentDayRibbonAgg, "vehicleLog", VehiclesByDuration.class).getMappedResults();
		// End
		// Assigning the result to RibbinData class
		for (VehiclesByDuration result : vehicleByCurrentDay) {
			if (result.getType().equalsIgnoreCase("CAR")) {
				ribbonData.setCurrentNumberOfCars(result.getCount());
			} else if (result.getType().equalsIgnoreCase("BIKE")) {
				ribbonData.setCurrentNumberOfBikes(result.getCount());
			}

		}
		// End
		return ribbonData;

	}

	@Override
	public ParkedVehiclesByHour getVehiclesParkedByHour() {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();

		Date startDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayStart").toString().replaceFirst("T", " ").concat(":00"));
		Date endDate = dateRangeUtils.getDate("yyyy-MM-dd hh:mm:ss",
				dateRangeUtils.getTodayDates().get("todayEnd").toString().replaceFirst("T", " ").concat(":00"));

		AggregationOperation match = Aggregation.match(
				Criteria.where("in_time").lt(endDate).gt(startDate).andOperator(Criteria.where("status").is("IN")));

		Aggregation vehiclesParkedByHourAgg = Aggregation.newAggregation(match,
				Aggregation.project().andExpression("vehicle_type").as("type").andExpression("hour(in_time)")
						.as("duration"),
				Aggregation.group(Aggregation.fields().and("duration").and("type")).count().as("count"));

		List<VehiclesByDuration> vehiclesParkedByHour = mongoOperations
				.aggregate(vehiclesParkedByHourAgg, "vehicleLog", VehiclesByDuration.class).getMappedResults();

		// Mapping car and bike count according to hours
		Map<Integer, Integer> carDurationMap = new HashMap<Integer, Integer>();
		Map<Integer, Integer> bikeDurationMap = new HashMap<Integer, Integer>();
		List<Integer> carDurationList = new ArrayList<Integer>();
		List<Integer> bikeDurationList = new ArrayList<Integer>();
		for (int i = 0; i < 24; i++) {
			carDurationMap.put(i, 0);
			bikeDurationMap.put(i, 0);
		}

		for (VehiclesByDuration result : vehiclesParkedByHour) {
			if (result.getType().equalsIgnoreCase("CAR")) {
				carDurationMap.put(result.getDuration(), result.getCount());
			} else if (result.getType().equalsIgnoreCase("BIKE")) {
				bikeDurationMap.put(result.getDuration(), result.getCount());
			}

		}
		// End

		// Adding the mapped values to Array for response
		for (Integer value : carDurationMap.values()) {
			carDurationList.add(value);
		}

		for (Integer value : bikeDurationMap.values()) {
			bikeDurationList.add(value);
		}
		// Adding the lists to response specific class
		ParkedVehiclesByHour parkedVehiclesByHour = new ParkedVehiclesByHour();
		parkedVehiclesByHour.setCarDurationList(carDurationList);
		parkedVehiclesByHour.setBikeDurationList(bikeDurationList);

		return parkedVehiclesByHour;
	}

	@Override
	public List<BuildingOccupancy> getParkingOccupancy() {
		// Getting the buildings by name
		List<Building> buildingsList = buildingRepository.findAllByName("^OSI Consulting Pvt Ltd$");
		List<BuildingOccupancy> buildingOccupancyList = new ArrayList<BuildingOccupancy>();
		// Calculating the occupancy percent for each floor of the building and
		// adding them to a list
		for (Building building : buildingsList) {
			BuildingOccupancy buildingOccupancy = new BuildingOccupancy();
			Double bikeOccupancyPercent = (double) (building.getTotalBikeSlots() - building.getRemainingBikeSlots())
					/ building.getTotalBikeSlots();
			Double carOccupancyPercent = (double) (building.getTotalCarSlots() - building.getRemainingCarSlots())
					/ building.getTotalCarSlots();
			buildingOccupancy.setBikeOccupancyPercent(bikeOccupancyPercent);
			buildingOccupancy.setCarOccupancyPercent(carOccupancyPercent);
			buildingOccupancy.setFloorName(building.getParkingLevel());
			buildingOccupancyList.add(buildingOccupancy);
		}
		return buildingOccupancyList;
	}

	@Override
	public List<ParkingSummary> getParkingSummary() {
		// Creating a lookup to join the vehicleLog and persons collection and
		// aggregating the count based on person type
		// and vehicle type
		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		AggregationOperation match = Aggregation.match(Criteria.where("status").is("IN"));

		Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match, Aggregation
				.group(Aggregation.fields().and("personDetails.type").and("vehicle_type")).count().as("count"));

		List<ParkingSummary> results = mongoOperations.aggregate(aggregation, "vehicleLog", ParkingSummary.class)
				.getMappedResults();
		return results;
	}

	public ParkingDuration getParkingDuration() {
		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		// Creating a sorted response for the duration of number of vehicle
		// inside grouped by vehicle type
		Map<String, Long> carDataMap = new HashMap<String, Long>();
		Map<String, Long> bikeDataMap = new HashMap<String, Long>();

		List<VehicleLog> vehicleLogs = vehicleLogRepository.findAllByStatus("IN");

		for (VehicleLog vehicleLog : vehicleLogs) {
			if (vehicleLog.getVehicleType().equalsIgnoreCase("CAR")) {
				carDataMap.put(vehicleLog.getId(),
						dateRangeUtils.hoursBetweenDates(vehicleLog.getInTime(), new Date()));
			} else if (vehicleLog.getVehicleType().equalsIgnoreCase("BIKE")) {
				bikeDataMap.put(vehicleLog.getId(),
						dateRangeUtils.hoursBetweenDates(vehicleLog.getInTime(), new Date()));
			}
		}

		// Creating maps for Car and Bike to get their repective
		// duration count
		HashMap<Long, Integer> carParkingDurationData = new HashMap<Long, Integer>();
		HashMap<Long, Integer> bikeParkingDurationData = new HashMap<Long, Integer>();

		// Initializing each key with 0 to have 0 for durations not present
		for (int i = 0; i <= 9; i++) {
			carParkingDurationData.put((long) i, 0);
			bikeParkingDurationData.put((long) i, 0);
		}

		// Get the count of vehicles for each hour
		TreeMap<Long, Integer> carCountsByHour = getCounts(carDataMap);
		TreeMap<Long, Integer> bikeCountsByHour = getCounts(bikeDataMap);

		// Calculating the number of vehicles at 0 to 8 hours and greater than 8
		// hours
		for (Long key : carCountsByHour.keySet()) {
			if (key > 8L) {
				carParkingDurationData.put(9L, carParkingDurationData.get(9L) + carCountsByHour.get(key));
			} else {
				carParkingDurationData.put(key, carCountsByHour.get(key));
			}
		}

		for (Long key : bikeCountsByHour.keySet()) {
			if (key > 8L) {
				bikeParkingDurationData.put(9L, bikeParkingDurationData.get(9L) + bikeCountsByHour.get(key));
			} else {
				bikeParkingDurationData.put(key, bikeCountsByHour.get(key));
			}
		}

		// Putting the result in a response compatible class
		ParkingDuration parkingDuration = new ParkingDuration();
		parkingDuration.setCarCountsByHour(carParkingDurationData);
		parkingDuration.setBikeCountsByHour(bikeParkingDurationData);

		return parkingDuration;
	}

	// Counts the values of a map and returns another map with the value as key
	// and count of its occurrence as value
	public TreeMap<Long, Integer> getCounts(Map<String, Long> carDataMap) {
		TreeMap<Long, Integer> counts = new TreeMap<Long, Integer>();
		for (Long c : carDataMap.values()) {
			int value = counts.get(c) == null ? 0 : counts.get(c);
			counts.put(c, value + 1);
		}
		return counts;
	}

	@Override
	public List<VehicleLogMapper> getParkingDurationDetails(Integer durationValue) {

		DateRangeUtils dateRangeUtils = new DateRangeUtils();
		// Mongo aggregation to get the vehicle logs with IN status along with
		// the person details nested within them
		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		AggregationOperation match = Aggregation.match(Criteria.where("status").is("IN"));
		Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match);

		List<VehicleLogMapper> vehicleLogs = mongoOperations
				.aggregate(aggregation, "vehicleLog", VehicleLogMapper.class).getMappedResults();

		List<VehicleLogMapper> vehicleLogList = new ArrayList<VehicleLogMapper>();
		// Separating the vehicle log data for the requested duration
		for (VehicleLogMapper vehicleLog : vehicleLogs) {
			if (durationValue == 9) {
				if (dateRangeUtils.hoursBetweenDates(vehicleLog.getIn_time(), new Date()) > 8) {
					vehicleLogList.add(vehicleLog);
				}
			} else {
				if (dateRangeUtils.hoursBetweenDates(vehicleLog.getIn_time(), new Date()) == (long) durationValue) {
					vehicleLogList.add(vehicleLog);
				}
			}
		}
		return vehicleLogList;

	}

	@Override
	public List<VehicleLogMapper> getParkingSummaryDetails(String personType, String vehicleType) {
		// Mongo operation to get the vehicle log details along with the person
		// details nested within and filtered by the person type and vehicle
		// type
		LookupOperation lookupOperation = LookupOperation.newLookup().from("persons").localField("person_id")
				.foreignField("_id").as("personDetails");

		AggregationOperation match = Aggregation.match(Criteria.where("status").is("IN")
				.andOperator(Criteria.where("vehicle_type").regex("^" + vehicleType + "$", "i")
						.andOperator(Criteria.where("personDetails.type").regex("^" + personType + "$", "i"))));
		Aggregation aggregation = Aggregation.newAggregation(lookupOperation, match);

		List<VehicleLogMapper> vehicleLogs = mongoOperations
				.aggregate(aggregation, "vehicleLog", VehicleLogMapper.class).getMappedResults();

		return vehicleLogs;
	}

}
