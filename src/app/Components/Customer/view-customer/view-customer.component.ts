import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../../Servises/main.service';
import { APIResponceModel, ICutomerList } from '../../../Interface/customer-list';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, FieldsetModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit {

customerList: ICutomerList[] = [];

customerService = inject(MainService);
  ngOnInit(): void {
   this.loadCustomers();
  }

  loadCustomers(){
    this.customerService.getCustomers().then((response: APIResponceModel) => {
      console.log('Customer data:', response.data); 
      this.customerList = response.data;
    }).catch((error) => {
      console.error('Error fetching customers:', error);
    });
  }

}
