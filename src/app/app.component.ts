import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewCustomerComponent } from './Components/Customer/view-customer/view-customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ViewCustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CustomerRegFrontEnd';
}
