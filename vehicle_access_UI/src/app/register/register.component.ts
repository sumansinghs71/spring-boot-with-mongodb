import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlateDetailsService } from '../plate-details.service';

class VehicleDetail {
  type?= '';
  number?= '';
}
class Flash {
  message: string;
  type: string;
  constructor(message, type) {
    this.message = message;
    this.type = type;
  }
}

class Person {
  id: String = '';
  name: String = '';
  designation: String = '';
  supervisorId: String = '';
  supervisorName: String = '';
  email: String = '';
  mobile: String = '';
  photo: String = '';
  type: String = '';
  address: String = '';
  validFrom: String = '';
  validTo: String = '';
  remarks: String = '';
  vehicleNumbers = [];
  constructor(id, name, designation, supervisorId, supervisorName, email, mobile, photo, type, address, validFrom, validTo, remarks, vehicleNumbers) {
    this.id = id;
    this.name = name;
    this.designation = designation;
    this.supervisorId = supervisorId;
    this.supervisorName = supervisorName;
    this.email = email;
    this.mobile = mobile;
    this.photo = photo;
    this.type = type;
    this.address = address;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.remarks = remarks;
    this.vehicleNumbers = vehicleNumbers;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('AlertSuccess') alertSuccess: ElementRef;
  @ViewChild('AlertError') alertError: ElementRef;
  vehicleNumber: any;
  public errorMessage: string;
  person: Person = new Person('', '', '', '', '', '', '', '', '', '', '', '', '', []);
  queryPerson: Person = new Person('', '', '', '', '', '', '', '', '', '', '', '', '', []);
  flash: Flash = new Flash('', '');
  vehicleDetailsFields = [new VehicleDetail()];
  enableButton: boolean = false;
  ngOnInit() {

  }
  constructor(private plateDetailsService: PlateDetailsService) { }

  addMenu(payDetail, i) {
    this.vehicleDetailsFields.push(new VehicleDetail());
  }

  removeMenu(index) {
    this.vehicleDetailsFields.splice(index, 1);
  }

  trackByFn(index, item) {
    return index;
  }

  closeModal() {
    this.vehicleDetailsFields = [new VehicleDetail()]; // Reinititalizing the array to blank object
  }

  submitUser(formObject: NgForm) {
    console.log(formObject.valid);
    this.person.vehicleNumbers = this.vehicleDetailsFields;
    if (formObject.valid) {
      this.plateDetailsService.postPersonData(this.person).subscribe(
        response => {
          console.log("Success");
        },
        error => {
          console.log("Error");
        }
      )
    } else {
        this.errorMessage = 'Mandatory Fields Missing';
        this.alertError.nativeElement.classList.add("show");
        let ref = this;
        setTimeout(function () {
          ref.alertError.nativeElement.classList.remove("show");
        }, 1500);
    }
  }

  submitVehicleNumber(manualCheckData: NgForm) {
    this.plateDetailsService.getPersonData('check', manualCheckData.value.inputVehicleNumber).subscribe(
      data => {
        this.vehicleNumber = manualCheckData.value.inputVehicleNumber;
        this.queryPerson = new Person(data.id, data.name, data.designation, data.supervisorId, data.supervisorName, data.email, data.mobile, data.photo, data.type, data.address, data.validFrom, data.validTo, data.remarks, data.vehicleNumbers)
        this.flash = new Flash('Person found', 'success');
        this.enableButton = true;
        let ref = this;
        this.alertSuccess.nativeElement.classList.add("show");
        setTimeout(() => {
          ref.alertSuccess.nativeElement.classList.remove("show");
        }, 3000);
      }, error => {
        this.errorMessage = 'Person Not Found';
        this.alertError.nativeElement.classList.add("show");
        let ref = this;
        setTimeout(function () {
          ref.alertError.nativeElement.classList.remove("show");
        }, 3000);

      }

    )
  }

  onClear(clearForm: NgForm) {
    this.enableButton = false;
    clearForm.resetForm();
    this.queryPerson = new Person('', '', '', '', '', '', '', '', '', '', '', '', '', []);
  }


  allocateVehicle(allocateForm: NgForm) {
    this.plateDetailsService.getPersonData('lookup', this.vehicleNumber).subscribe(
      data => {
        console.log("Allocated");
        this.enableButton = false;
        this.flash = new Flash('Vehicle Alloted', 'success');
        let ref = this;
        this.alertSuccess.nativeElement.classList.add("show");
        setTimeout(() => {
          ref.alertSuccess.nativeElement.classList.remove("show");
        }, 3000);
        allocateForm.reset();
        this.queryPerson = new Person('', '', '', '', '', '', '', '', '', '', '', '', '', [])
      }, error => {
        this.errorMessage = 'Person Allocation Failed';
        this.alertError.nativeElement.classList.add("show");
        let ref = this;
        setTimeout(function () {
          ref.alertError.nativeElement.classList.remove("show");
        }, 3000);
      }
    )
  }
}
