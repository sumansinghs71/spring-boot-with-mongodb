package com.osi.vehicle_access.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "persons")
public class Person {
	@Id
	private String id;
	private String name;
	private String designation;
	@Field("supervisor_id")
	private String supervisorId;
	@Field("supervisor_name")
	private String supervisorName;
	private String email;
	private String mobile;
	private String photo;
	private String type;
	private String address;
	@Field("valid_from")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private Date validFrom;
	@Field("valid_to")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private Date validTo;
	private String remarks;
	@Field("vehicle_numbers")
	private List<VehicleNumbers> vehicleNumbers;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getSupervisorId() {
		return supervisorId;
	}
	public void setSupervisorId(String supervisorId) {
		this.supervisorId = supervisorId;
	}
	public String getSupervisorName() {
		return supervisorName;
	}
	public void setSupervisorName(String supervisorName) {
		this.supervisorName = supervisorName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getValidFrom() {
		return validFrom;
	}
	public void setValidFrom(Date validFrom) {
		this.validFrom = validFrom;
	}
	public Date getValidTo() {
		return validTo;
	}
	public void setValidTo(Date validTo) {
		this.validTo = validTo;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public List<VehicleNumbers> getVehicleNumbers() {
		return vehicleNumbers;
	}
	public void setVehicleNumbers(List<VehicleNumbers> vehicleNumbers) {
		this.vehicleNumbers = vehicleNumbers;
	}

}
