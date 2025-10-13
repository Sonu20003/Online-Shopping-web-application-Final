import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dealer-list',
  imports: [CommonModule],
  templateUrl: './dealer-list.component.html',
  styleUrl: './dealer-list.component.css'
})
export class DealerListComponent {
  dealerList: any[] = []; // Holds the dealer data
  errorMessage: string = '';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    // Fetch dealer information on component initialization
    this.authService.getDealerInfo().subscribe(
      (data: any[]) => {
        this.dealerList = data; // Populate dealerList with the retrieved data
        console.log('Dealer data fetched successfully', data);
      },
      (error) => {
        this.errorMessage = 'Error fetching dealer data';
        console.error('Error:', error);
      }
    );

  }
}
