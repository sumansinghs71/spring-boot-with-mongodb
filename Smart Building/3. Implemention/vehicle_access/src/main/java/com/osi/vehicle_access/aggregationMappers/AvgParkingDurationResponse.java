package com.osi.vehicle_access.aggregationMappers;

import java.util.HashMap;

public class AvgParkingDurationResponse {
	private HashMap<Integer, Integer> employeeParkingDurationData;
	private HashMap<Integer, Integer> visitorParkingDurationData;
	private HashMap<Integer, Integer> othersParkingDurationData;

	public HashMap<Integer, Integer> getEmployeeParkingDurationData() {
		return employeeParkingDurationData;
	}

	public void setEmployeeParkingDurationData(HashMap<Integer, Integer> employeeParkingDurationData) {
		this.employeeParkingDurationData = employeeParkingDurationData;
	}

	public HashMap<Integer, Integer> getVisitorParkingDurationData() {
		return visitorParkingDurationData;
	}

	public void setVisitorParkingDurationData(HashMap<Integer, Integer> visitorParkingDurationData) {
		this.visitorParkingDurationData = visitorParkingDurationData;
	}

	public HashMap<Integer, Integer> getOthersParkingDurationData() {
		return othersParkingDurationData;
	}

	public void setOthersParkingDurationData(HashMap<Integer, Integer> othersParkingDurationData) {
		this.othersParkingDurationData = othersParkingDurationData;
	}

}