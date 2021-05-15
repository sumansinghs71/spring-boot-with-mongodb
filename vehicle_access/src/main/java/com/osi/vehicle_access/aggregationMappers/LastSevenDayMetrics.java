package com.osi.vehicle_access.aggregationMappers;

import java.util.HashMap;
import java.util.List;

public class LastSevenDayMetrics {
	private List<String> daySequence;
	private HashMap<String, Integer> carDayDataMap;
	private HashMap<String, Integer> bikeDayDataMap;

	public List<String> getDaySequence() {
		return daySequence;
	}

	public void setDaySequence(List<String> daySequence) {
		this.daySequence = daySequence;
	}

	public HashMap<String, Integer> getCarDayDataMap() {
		return carDayDataMap;
	}

	public void setCarDayDataMap(HashMap<String, Integer> carDayDataMap) {
		this.carDayDataMap = carDayDataMap;
	}

	public HashMap<String, Integer> getBikeDayDataMap() {
		return bikeDayDataMap;
	}

	public void setBikeDayDataMap(HashMap<String, Integer> bikeDayDataMap) {
		this.bikeDayDataMap = bikeDayDataMap;
	}

}
