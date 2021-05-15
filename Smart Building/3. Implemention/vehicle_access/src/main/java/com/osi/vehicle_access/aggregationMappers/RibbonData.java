package com.osi.vehicle_access.aggregationMappers;

public class RibbonData {
	private Integer currentNumberOfCars;
	private Integer currentNumberOfBikes;
	private Integer totalCarParking;
	private Integer totalBikeParking;
	private Integer availableCarParking;
	private Integer availableBikeParking;

	public Integer getCurrentNumberOfCars() {
		return currentNumberOfCars;
	}

	public void setCurrentNumberOfCars(Integer currentNumberOfCars) {
		this.currentNumberOfCars = currentNumberOfCars;
	}

	public Integer getCurrentNumberOfBikes() {
		return currentNumberOfBikes;
	}

	public void setCurrentNumberOfBikes(Integer currentNumberOfBikes) {
		this.currentNumberOfBikes = currentNumberOfBikes;
	}

	public Integer getTotalCarParking() {
		return totalCarParking;
	}

	public void setTotalCarParking(Integer totalCarParking) {
		this.totalCarParking = totalCarParking;
	}

	public Integer getTotalBikeParking() {
		return totalBikeParking;
	}

	public void setTotalBikeParking(Integer totalBikeParking) {
		this.totalBikeParking = totalBikeParking;
	}

	public Integer getAvailableCarParking() {
		return availableCarParking;
	}

	public void setAvailableCarParking(Integer availableCarParking) {
		this.availableCarParking = availableCarParking;
	}

	public Integer getAvailableBikeParking() {
		return availableBikeParking;
	}

	public void setAvailableBikeParking(Integer availableBikeParking) {
		this.availableBikeParking = availableBikeParking;
	}

}
