package com.osi.vehicle_access.aggregationMappers;

import java.util.Date;
import java.util.List;

public class VehicleLogMapper {
	private String id;
	private String person_id;
	private String vehicle_number;
	private String vehicle_type;
	private String building_id;
	private Date in_time;
	private Date out_time;
	private String status;
	private List<PersonMapper> personDetails;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPerson_id() {
		return person_id;
	}

	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}

	public String getVehicle_number() {
		return vehicle_number;
	}

	public void setVehicle_number(String vehicle_number) {
		this.vehicle_number = vehicle_number;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public String getBuilding_id() {
		return building_id;
	}

	public void setBuilding_id(String building_id) {
		this.building_id = building_id;
	}

	public Date getIn_time() {
		return in_time;
	}

	public void setIn_time(Date in_time) {
		this.in_time = in_time;
	}

	public Date getOut_time() {
		return out_time;
	}

	public void setOut_time(Date out_time) {
		this.out_time = out_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PersonMapper> getPersonDetails() {
		return personDetails;
	}

	public void setPersonDetails(List<PersonMapper> personDetails) {
		this.personDetails = personDetails;
	}

}
