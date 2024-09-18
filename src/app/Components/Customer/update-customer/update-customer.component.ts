import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from '../../../Models/Class/Customer';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MainService } from '../../../Servises/main.service';


@Component({
  selector: 'app-update-customer',
  imports: [RouterLink, CommonModule, CardModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit {

  customerObj: Customer = new Customer();
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl('')
  });

  constructor(private router: Router, private customerService: MainService) { }

  ngOnInit(): void {
    //debugger;
    // Retrieve customer from state
    const customer = history.state.customer;

    // Check if customer data is present
    if (customer) {
      this.customerObj = customer;
      this.getCustomerDetails(customer);
    } else {
      console.error('Customer data not passed correctly.');
    }
  }

  getCustomerDetails(customer: Customer) {
    this.userForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.customerService.updateCustomer(this.customerObj.id, this.userForm.value)
        .then(() => {
          this.router.navigate(['']);
        })
    }
  }
}
