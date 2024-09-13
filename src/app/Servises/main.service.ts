import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponceModel } from '../Interface/customer-list';
import { environment } from '../../environments/environment';
import { lastValueFrom, Observable } from 'rxjs';
import { SweetAlertService } from './SweetAlert/sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient, private sweetAlertService : SweetAlertService) { }

  async getCustomers(): Promise<APIResponceModel> {
    const response: APIResponceModel = await lastValueFrom(this.http.get<APIResponceModel>(environment.BASE_URL));
    console.log(response)
    return response;
  }
}

