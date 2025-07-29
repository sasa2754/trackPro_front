import { Component, OnInit } from '@angular/core';
import { ApiService, StationListDto } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stations-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stations-list.component.html',
  providers: [ApiService]
})
export class StationsListComponent implements OnInit {
  stations: StationListDto[] = [];
  error: string | null = null;
  showDeleteModal: boolean = false;
  stationToDelete: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getStations().subscribe({
      next: (stations) => (this.stations = stations),
      error: (err) => (this.error = err.message),
    });
  }

  editStation(id: number): void {
    this.router.navigate(['/stations/edit', id]);
  }

  openDeleteModal(id: number): void {
    this.stationToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.stationToDelete = null;
  }

  confirmDelete(): void {
    if (this.stationToDelete !== null) {
      this.apiService.deleteStation(this.stationToDelete).subscribe({
        next: () => {
          this.stations = this.stations.filter(station => station.id !== this.stationToDelete);
          this.closeDeleteModal();
        },
        error: (err) => {
          this.error = err.message;
          this.closeDeleteModal();
        }
      });
    }
  }
}
