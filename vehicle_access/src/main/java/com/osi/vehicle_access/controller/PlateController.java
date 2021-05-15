package com.osi.vehicle_access.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osi.vehicle_access.model.Person;
import com.osi.vehicle_access.service.Impl.PlateServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class PlateController {
	@Autowired
	private PlateServiceImpl plateService;

	@RequestMapping(value = "getPlateDetails", method = RequestMethod.GET)
	public ResponseEntity<Person> getPlateDetails(@RequestParam("checkType") String checkType,
			@RequestParam("vehicleNumber") String vehicleNumber) {
		Optional<Person> person = plateService.findByNumber(vehicleNumber, checkType);
		if (person.isPresent()) {
			return new ResponseEntity<Person>(person.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/postPlateData", method = RequestMethod.POST)
	public ResponseEntity<Map<String, String>> postPlateData(@RequestParam("vehiclePosition") String vehiclePosition,
			@RequestBody Map<String, Object> payload) throws Exception {

		Map<String, String> authCheck = plateService.managePlateData(payload, vehiclePosition);
		if (authCheck.get("person").equals("authorized") || authCheck.get("person").equals("unauthorized")) {
			return new ResponseEntity<Map<String, String>>(authCheck, HttpStatus.OK);
		} else {
			return new ResponseEntity<Map<String, String>>(authCheck, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "checkParkingStatus", method = RequestMethod.GET)
	public ResponseEntity<HashMap<String, Boolean>> checkParkingStatus() {
		HashMap<String, Boolean> parkingStatus = plateService.checkParkingStatus();
		return new ResponseEntity<HashMap<String, Boolean>>(parkingStatus, HttpStatus.OK);
	}

}
