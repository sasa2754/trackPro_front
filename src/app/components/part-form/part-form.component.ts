import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, PartDetailDto } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-part-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './part-form.component.html',
})
export class PartFormComponent implements OnInit {
  partForm: FormGroup;
  isEditMode = false;
  code: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.partForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      responsible: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      this.isEditMode = true;
      this.partForm.get('code')?.disable();
      this.partForm.get('responsible')?.disable();
      this.apiService.getPart(this.code).subscribe({
        next: (part) => {
          this.partForm.patchValue({
            code: part.code,
            description: part.description,
          });
        },
        error: (err) => (this.error = err.message),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/parts']);
  }

  onSubmit(): void {
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.code) {
      this.apiService.updatePart(this.code, this.partForm.value.description).subscribe({
        next: () => this.router.navigate(['/parts']),
        error: (err) => (this.error = err.message),
      });
    } else {
      this.apiService.createPart(this.partForm.value).subscribe({
        next: () => this.router.navigate(['/parts']),
        error: (err) => (this.error = err.message),
      });
    }
  }
}