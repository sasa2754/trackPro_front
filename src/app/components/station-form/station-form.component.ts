import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, StationListDto } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './station-form.component.html',
})
export class StationFormComponent implements OnInit {
  stationForm: FormGroup;
  isEditMode = false;
  id: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      order: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.id = +idParam;
      this.apiService.getStation(this.id).subscribe({
        next: (station) => {
          this.stationForm.patchValue({
            name: station.name,
            order: station.order,
          });
        },
        error: (err) => (this.error = err.message),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/stations']);
  }

  onSubmit(): void {
    if (this.stationForm.invalid) {
      this.stationForm.markAllAsTouched();
      return;
    }

    const handleError = (err: any) => {
      this.error = err?.error?.error || 'Erro ao criar uma nova Estação. Já existe uma estação nessa ordem!';
    };

    if (this.isEditMode && this.id) {
      this.apiService.updateStation(this.id, this.stationForm.value).subscribe({
        next: () => this.router.navigate(['/stations']),
        error: handleError,
      });
    } else {
      this.apiService.createStation(this.stationForm.value).subscribe({
        next: () => this.router.navigate(['/stations']),
        error: handleError,
      });
    }
  }
}