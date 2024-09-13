import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../Models/Class/Customer';
import { MainService } from '../../../Servises/main.service';
import { APIResponceModel } from '../../../Models/Interface/customer-list';
import { SweetAlertService } from '../../../Servises/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, CardModule,RouterLink, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent   {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl('')
  });
  customerObj : Customer = new Customer();

  constructor (private fb: FormBuilder, private customerService: MainService, private sweetAlertService: SweetAlertService){}


  // ngOnInit(): void {
  //   this.userForm = this.fb.group({
  //     firstName:['', Validators.required],
  //     lastName:['', Validators.required],
  //     phoneNumber:[''],
  //     email:['', Validators.required],
  //     address:[''],
  //     city:[''],
  //     postalCode:[''],
  //   });
  // }
  

  // addCustomer(){
  //    this.customerService.addCustomer(this.customerObj).then((response: APIResponceModel)=>{
  //     if(response.isSuccess) {
  //      this.customerObj = new Customer();
  //      console.log(response);
  //     }
  //    })
  // }

  OnsaveCustomer() {
    debugger;
    const customerData: Customer = this.userForm.value;
    this.customerService.addCustomer(customerData)
      .then((response: APIResponceModel) => {
        if (response.isSuccess) {
          // Show a success alert (using SweetAlert or any other method you prefer)
          this.sweetAlertService.success('Customer added successfully!');
          
          // Optionally, navigate back or reset the form
          this.userForm.reset();
        } else {
          // Show an error alert if the response indicates failure
         this.sweetAlertService.error('Failed to add customer. Please try again.');
        }
      })
      .catch(error => {
        // Handle any errors that occur during the HTTP request
        console.error('Error adding customer:', error);
        this.sweetAlertService.error('An error occurred while adding the customer.');
      });
  }
  
}
