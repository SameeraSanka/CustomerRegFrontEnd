import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../../Servises/main.service';
import { APIResponceModel, ICutomerList } from '../../../Models/Interface/customer-list';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../../Servises/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit {

customerList: ICutomerList[] = [];

customerService = inject(MainService);
sweetAlertService = inject(SweetAlertService)
  ngOnInit(): void {
   this.loadCustomers();
  }

  
  loadCustomers(){
    this.customerService.getCustomers().then((response: APIResponceModel) => {
      this.customerList = response.data;
    });
  }

  deleteCustomer(id: number) {
    this.sweetAlertService.confirmDelete().then((isDelete) => {
      if (isDelete) {
        this.customerService.deleteCustomer(id).then((response: APIResponceModel) => {
          if (response.isSuccess) {
            this.sweetAlertService.success('Customer deleted successfully');
            // Update customer list by removing the deleted customer
            this.customerList = this.customerList.filter(customer => customer.id !== id);
          } else {
            this.sweetAlertService.error('Customer not deleted');
          }
        }).catch((error) => {
          this.sweetAlertService.error('An error occurred while deleting the customer');
          console.error(error);
        });
      }
    });
  }
  

}
