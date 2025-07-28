import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService, PartListDto } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-parts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parts-list.component.html',
  providers: [ApiService]
})

export class PartsListComponent implements OnInit {
  parts: PartListDto[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getParts().subscribe({
      next: (parts) => (this.parts = parts),
      error: (err) => (this.error = err.message),
    });
  }

  editPart(code: string): void {
    this.router.navigate(['/parts/edit', code]);
  }

  movePart(code: string): void {
    this.router.navigate(['/parts/move', code]);
  }

  viewHistory(code: string): void {
    this.router.navigate(['/parts/history', code]);
  }

  deletePart(code: string): void {
    if (confirm('Are you sure you want to delete this part?')) {
      this.apiService.deletePart(code).subscribe({
        next: () => {
          this.parts = this.parts.filter((part) => part.code !== code);
        },
        error: (err) => (this.error = err.message),
      });
    }
  }
}