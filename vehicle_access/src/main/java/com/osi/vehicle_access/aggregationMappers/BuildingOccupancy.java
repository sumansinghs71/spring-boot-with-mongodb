package com.osi.vehicle_access.aggregationMappers;

public class BuildingOccupancy {
	private String floorName;
	private Double bikeOccupancyPercent;
	private Double carOccupancyPercent;

	public String getFloorName() {
		return floorName;
	}

	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}

	public Double getBikeOccupancyPercent() {
		return bikeOccupancyPercent;
	}

	public void setBikeOccupancyPercent(Double bikeOccupancyPercent) {
		this.bikeOccupancyPercent = bikeOccupancyPercent;
	}

	public Double getCarOccupancyPercent() {
		return carOccupancyPercent;
	}

	public void setCarOccupancyPercent(Double carOccupancyPercent) {
		this.carOccupancyPercent = carOccupancyPercent;
	}

}
