package com.osi.vehicle_access.service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.osi.vehicle_access.model.Person;

public interface IPlateService {

	public Optional<Person> findByNumber(String number, String checkType);

	public Map<String, String> managePlateData(Map<String, Object> plateData, String vehiclePosition)
			throws ParseException;

	public HashMap<String, Boolean> checkParkingStatus();

}
