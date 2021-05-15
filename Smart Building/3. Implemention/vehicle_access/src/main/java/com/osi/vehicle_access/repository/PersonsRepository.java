package com.osi.vehicle_access.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.osi.vehicle_access.model.Person;

@Repository
public interface PersonsRepository extends MongoRepository<Person, String> {

	@Query("{'vehicle_numbers.number': { $regex: ?0, $options:'i' },'valid_to':{$gt:?1}}")
	Optional<Person> findByNumber(String number,Date validTo);
}
