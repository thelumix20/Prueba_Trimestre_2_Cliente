import { Component, OnInit, inject } from '@angular/core';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], // Si usas una tabla simple no necesitas más imports aquí
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  seriesList: any[] = [];
  seriesService = inject(SeriesService);

  ngOnInit() {
    // Consumimos la API (GET)
    this.seriesService.getAll().subscribe((response: any) => {
      // La API de peticiones.online suele devolver los datos en .results
      this.seriesList = response.results || response;
    });
  }
}