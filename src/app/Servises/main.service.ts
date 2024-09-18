import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { APIResponceModel } from '../Models/Interface/customer-list';
import { environment } from '../../environments/environment';
import { lastValueFrom, Observable } from 'rxjs';
import { SweetAlertService } from './SweetAlert/sweet-alert.service';
import { Customer } from '../Models/Class/Customer';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private sweetAlertService: SweetAlertService) { }

  async getCustomers(): Promise<APIResponceModel> {
    try {
      const response: APIResponceModel = await lastValueFrom(this.http.get<APIResponceModel>(environment.BASE_URL));
      if (response === null) {
        this.sweetAlertService.error("No customers were found")
        return response;
      }
      return response;
    } catch (error) {
      this.sweetAlertService.error("An error occurred while fetching the customer.");
      throw error;
    }

  }

  async addCustomer(obj: Customer): Promise<APIResponceModel> {
    try {
      const response: APIResponceModel = await lastValueFrom(this.http.post<APIResponceModel>(environment.BASE_URL, obj));
      if (response.isSuccess) {
        this.sweetAlertService.success("Customer added successfully");
        return response;
      }
      this.sweetAlertService.error("Customer not added")
      return response;
    } catch (error) {
      this.sweetAlertService.error("An error occurred while adding the customer.");
      throw error;
    }
  }

  async deleteCustomer(id: number): Promise<APIResponceModel> {
    try {
      const response: APIResponceModel = await lastValueFrom(this.http.delete<APIResponceModel>(environment.BASE_URL + `/${id}`));
      return response;
    } catch (error) {
      this.sweetAlertService.error("An error occurred while deleting the customer.");
      throw error;
    }

  }

  async updateCustomer(id: number, customerData: any): Promise<APIResponceModel> {
    try {
      const response: APIResponceModel = await lastValueFrom(this.http.put<APIResponceModel>(environment.BASE_URL + `/${id}`, customerData));
      if (response.isSuccess){
        this.sweetAlertService.success("Customer updated successfully");

      }
      return response;
    } catch (error) {
      this.sweetAlertService.error("An error occurred while drleting the customer.");
      throw error;
    }


  }

  // async updateCustomer(id: number, customerData: any): Promise<APIResponceModel> {
  //   if(Object.keys(customerData).length ===0){
  //     const response: APIResponceModel = await lastValueFrom(this.http.put<APIResponceModel>(environment.BASE_URL + `${id}`, customerData));
  //     return response;
  //   }
  //   const response: APIResponceModel = await lastValueFrom(this.http.get<APIResponceModel>(environment.BASE_URL + `${id}`));
  //   return response;

  // }
}

