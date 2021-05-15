package com.osi.vehicle_access.aggregationMappers;

import java.util.List;

public class ParkingSummary {
	private Integer count;
	private List<String> type;
	private String vehicle_type;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public List<String> getType() {
		return type;
	}

	public void setType(List<String> type) {
		this.type = type;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

}
