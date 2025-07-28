import { Component, OnInit } from '@angular/core';
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
  showDeleteModal: boolean = false;
  partToDelete: string | null = null;

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

  openDeleteModal(code: string): void {
    this.partToDelete = code;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.partToDelete = null;
  }

  confirmDelete(): void {
    if (this.partToDelete) {
      this.apiService.deletePart(this.partToDelete).subscribe({
        next: () => {
          this.parts = this.parts.filter((part) => part.code !== this.partToDelete);
          this.closeDeleteModal();
        },
        error: (err) => {
          this.error = err.message;
          this.closeDeleteModal();
        },
      });
    }
  }
}