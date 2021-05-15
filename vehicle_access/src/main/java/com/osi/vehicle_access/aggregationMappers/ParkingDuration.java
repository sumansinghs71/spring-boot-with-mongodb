package com.osi.vehicle_access.aggregationMappers;

import java.util.TreeMap;
import java.util.TreeSet;

public class ParkingDuration {
	private TreeSet<Long> categoriesSet;
	private TreeMap<Long, Integer> carCountsByHour;
	private TreeMap<Long, Integer> bikeCountsByHour;

	public TreeSet<Long> getCategoriesSet() {
		return categoriesSet;
	}

	public void setCategoriesSet(TreeSet<Long> categoriesSet) {
		this.categoriesSet = categoriesSet;
	}

	public TreeMap<Long, Integer> getCarCountsByHour() {
		return carCountsByHour;
	}

	public void setCarCountsByHour(TreeMap<Long, Integer> carCountsByHour) {
		this.carCountsByHour = carCountsByHour;
	}

	public TreeMap<Long, Integer> getBikeCountsByHour() {
		return bikeCountsByHour;
	}

	public void setBikeCountsByHour(TreeMap<Long, Integer> bikeCountsByHour) {
		this.bikeCountsByHour = bikeCountsByHour;
	}

}
