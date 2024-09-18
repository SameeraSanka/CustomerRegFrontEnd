import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../Models/Class/Customer';
import { MainService } from '../../../Servises/main.service';
import { APIResponceModel } from '../../../Models/Interface/customer-list';
import { SweetAlertService } from '../../../Servises/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, CardModule, RouterLink, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl('')
  });
  customerObj: Customer = new Customer();

  constructor(private fb: FormBuilder, private customerService: MainService, private sweetAlertService: SweetAlertService) { }

  OnsaveCustomer() {
    // debugger;
    const customerData: Customer = this.userForm.value;
    this.customerService.addCustomer(customerData).then
        this.userForm.reset();
      
  }
}
