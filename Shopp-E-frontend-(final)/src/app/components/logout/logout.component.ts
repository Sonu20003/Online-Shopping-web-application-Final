import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Clear all user data on logout
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
