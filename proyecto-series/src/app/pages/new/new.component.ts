import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html'
})
export class NewComponent {
  seriesService = inject(SeriesService);
  router = inject(Router);

  // Definición del Formulario Reactivo con validaciones
  seriesForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    channel: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)])
  });

  onSubmit() {
    if (this.seriesForm.valid) {
      this.seriesService.create(this.seriesForm.value).subscribe(response => {
        // El alert sirve para la captura del PDF que pide el examen
        alert('Respuesta API - Serie Creada. ID: ' + response.id);
        this.router.navigate(['/home']); // Redirección automática
      });
    }
  }
}