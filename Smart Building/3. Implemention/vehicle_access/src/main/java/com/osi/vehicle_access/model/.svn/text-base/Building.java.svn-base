package com.osi.vehicle_access.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "buildings")
public class Building {
	@Id
	private String id;
	private String name;
	private String address;
	@Field("block_name")
	private String blockName;
	@Field("parking_level")
	private String parkingLevel;
	@Field("total_car_slots")
	private Integer totalCarSlots;
	@Field("remaining_car_slots")
	private Integer remainingCarSlots;
	@Field("total_bike_slots")
	private Integer totalBikeSlots;
	@Field("remaining_bike_slots")
	private Integer remainingBikeSlots;

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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	public String getParkingLevel() {
		return parkingLevel;
	}

	public void setParkingLevel(String parkingLevel) {
		this.parkingLevel = parkingLevel;
	}

	public Integer getTotalCarSlots() {
		return totalCarSlots;
	}

	public void setTotalCarSlots(Integer totalCarSlots) {
		this.totalCarSlots = totalCarSlots;
	}

	public Integer getRemainingCarSlots() {
		return remainingCarSlots;
	}

	public void setRemainingCarSlots(Integer remainingCarSlots) {
		this.remainingCarSlots = remainingCarSlots;
	}

	public Integer getTotalBikeSlots() {
		return totalBikeSlots;
	}

	public void setTotalBikeSlots(Integer totalBikeSlots) {
		this.totalBikeSlots = totalBikeSlots;
	}

	public Integer getRemainingBikeSlots() {
		return remainingBikeSlots;
	}

	public void setRemainingBikeSlots(Integer remainingBikeSlots) {
		this.remainingBikeSlots = remainingBikeSlots;
	}

}
