package com.osi.vehicle_access.aggregationMappers;

import java.util.List;

public class ParkedVehiclesByHour {
	private List<Integer> carDurationList;
	private List<Integer> bikeDurationList;

	public List<Integer> getCarDurationList() {
		return carDurationList;
	}

	public void setCarDurationList(List<Integer> carDurationList) {
		this.carDurationList = carDurationList;
	}

	public List<Integer> getBikeDurationList() {
		return bikeDurationList;
	}

	public void setBikeDurationList(List<Integer> bikeDurationList) {
		this.bikeDurationList = bikeDurationList;
	}

}
