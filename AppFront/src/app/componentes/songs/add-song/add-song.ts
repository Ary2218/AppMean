import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SongsService } from '../../../services/songs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css'
})
export class AddSong {

  router = inject(Router);
  songsService = inject(SongsService);

  // Objeto para la nueva canción
  newSong = {
    title: '',
    artist: '',
    genre: '',
    album: '',
    duration: 0,
    year: new Date().getFullYear(),
    trackNumber: 1,
    isExplicit: false
  };

  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';

  async onSubmit() {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.showSuccess = false;

    try {
      await this.songsService.create(this.newSong);

      // Mostrar mensaje de éxito
      this.showSuccess = true;

      // Resetear formulario
      this.resetForm();

      // Redirigir a la lista después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/songs']);
      }, 2000);

    } catch (error: any) {
      this.errorMessage = error.message || 'Error al guardar la canción';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.newSong = {
      title: '',
      artist: '',
      genre: '',
      album: '',
      duration: 0,
      year: new Date().getFullYear(),
      trackNumber: 1,
      isExplicit: false
    };
  }
}
