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

  // customerAdded = new EventEmitter<void>();

  constructor(private http:HttpClient, private sweetAlertService : SweetAlertService) { }

  async getCustomers(): Promise<APIResponceModel> {
    const response: APIResponceModel = await lastValueFrom(this.http.get<APIResponceModel>(environment.BASE_URL));
    console.log(response)
    return response;
  }

  async addCustomer(obj:Customer): Promise<APIResponceModel>{
    const response : APIResponceModel = await lastValueFrom(this.http.post<APIResponceModel>(environment.BASE_URL, obj));
    // if (response.isSuccess) {

    //   this.customerAdded.emit();
    //   console.log(obj);
    // }
    console.log(obj);
    return response;
  }
}

