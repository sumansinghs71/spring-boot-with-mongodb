package com.osi.vehicle_access.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.osi.vehicle_access.model.Person;
import com.osi.vehicle_access.repository.PersonsRepository;
import com.osi.vehicle_access.service.IPersonService;

@Component
public class PersonServiceImpl implements IPersonService {
	@Autowired
	private PersonsRepository personRepository;

	@Override
	public Person registerPerson(Person person) {
		Person savedPerson = personRepository.save(person);
		return savedPerson;
	}

}
