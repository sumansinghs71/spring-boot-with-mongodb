package com.osi.vehicle_access.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.osi.vehicle_access.model.Person;
import com.osi.vehicle_access.service.Impl.PersonServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class PersonController {
	@Autowired
	private PersonServiceImpl personService;

	@RequestMapping(value = "/registerPerson", method = RequestMethod.POST)
	public ResponseEntity<Person> postPlateData(@RequestBody Person person) throws Exception {
		Person savedPerson = personService.registerPerson(person);
		return new ResponseEntity<Person>(savedPerson, HttpStatus.OK);
	}
}
