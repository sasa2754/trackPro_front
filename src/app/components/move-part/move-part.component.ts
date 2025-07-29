import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, PartDetailDto } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-move-part',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './move-part.component.html',
})
export class MovePartComponent implements OnInit {
  moveForm: FormGroup;
  part: PartDetailDto | null = null;
  code: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.moveForm = this.fb.group({
      responsible: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      this.apiService.getPart(this.code).subscribe({
        next: (part) => (this.part = part),
        error: (err) => (this.error = err.message),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/parts']);
  }


  onSubmit(): void {
    if (this.moveForm.invalid || !this.code) {
      this.moveForm.markAllAsTouched();
      return;
    }

    const handleError = (err: any) => {
      this.error = err?.error?.error || 'Erro ao mover peça. As transações foram finalizadas!';
    };

    this.apiService.movePart(this.code, this.moveForm.value.responsible).subscribe({
      next: () => this.router.navigate(['/parts']),
      error: handleError,
    });
  }
}