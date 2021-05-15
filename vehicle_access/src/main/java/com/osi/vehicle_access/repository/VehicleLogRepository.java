package com.osi.vehicle_access.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.osi.vehicle_access.model.VehicleLog;

@Repository
public interface VehicleLogRepository extends MongoRepository<VehicleLog, String> {

	List<VehicleLog> findAllByPersonIdAndVehicleNumber(String personId, String number);

	List<VehicleLog> findAllByInTimeBetweenAndStatusAndVehicleType(Date fromDate, Date toDate, String status,
			String vehicleType);

	List<VehicleLog> findAllByStatus(String status);

	List<VehicleLog> findAllByPersonIdAndVehicleNumberAndStatus(String personId, String number, String status);

}
