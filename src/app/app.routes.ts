import { Routes } from '@angular/router';
import { ViewCustomerComponent } from './Components/Customer/view-customer/view-customer.component';
import { AddCustomerComponent } from './Components/Customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './Components/Customer/update-customer/update-customer.component';

export const routes: Routes = [
    {path: '', component: ViewCustomerComponent},
    {path: 'AddCustomer', component: AddCustomerComponent},
    { path: 'UpdateCustomer/:customerId', component: UpdateCustomerComponent }
];
