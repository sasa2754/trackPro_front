import { Component, OnInit } from '@angular/core';
import { ApiService, MovementHistoryDto } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-part-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './part-history.component.html',
})
export class PartHistoryComponent implements OnInit {
  history: MovementHistoryDto[] = [];
  code: string | null = null;
  error: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      this.apiService.getPartHistory(this.code).subscribe({
        next: (history) => (this.history = history),
        error: (err) => (this.error = err.message),
      });
    }
  }
}