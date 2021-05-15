package com.osi.vehicle_access.service;

import java.util.List;

import com.osi.vehicle_access.aggregationMappers.BuildingOccupancy;
import com.osi.vehicle_access.aggregationMappers.ParkedVehiclesByHour;
import com.osi.vehicle_access.aggregationMappers.ParkingDuration;
import com.osi.vehicle_access.aggregationMappers.ParkingSummary;
import com.osi.vehicle_access.aggregationMappers.RibbonData;
import com.osi.vehicle_access.aggregationMappers.VehicleLogMapper;

public interface IDashboardService {

	public RibbonData getRibbonMetrics();

	public ParkedVehiclesByHour getVehiclesParkedByHour();

	public List<BuildingOccupancy> getParkingOccupancy();

	public List<ParkingSummary> getParkingSummary();

	public ParkingDuration getParkingDuration();

	public List<VehicleLogMapper> getParkingDurationDetails(Integer durationValue);

	public List<VehicleLogMapper> getParkingSummaryDetails(String personType, String vehicleType);
}
