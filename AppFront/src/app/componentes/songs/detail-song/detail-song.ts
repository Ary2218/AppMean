import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SongsService } from '../../../services/songs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-song',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detail-song.html',
  styleUrl: './detail-song.css',
})
export class DetailSong {

  activatedRoute = inject(ActivatedRoute);
  songsService = inject(SongsService);
  router = inject(Router);

  song = signal<any>({});
  songId: string = '';

  // Variables para edición
  isEditing = false;
  editSong: any = {};

  // Variables para estado
  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';
  showDeleteModal = false;

  ngOnInit(){
    this.activatedRoute.params.subscribe( async params => {
      this.songId = params['songId'];
      const song = await this.songsService.getById(this.songId);
      this.song.set(song);
    })
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Habilitar modo edición
  enableEditMode() {
    this.isEditing = true;
    // Copiar los datos actuales al objeto de edición
    this.editSong = { ...this.song() };
  }

  // Cancelar edición
  cancelEdit() {
    this.isEditing = false;
    this.errorMessage = '';
    this.showSuccess = false;
  }

  // Actualizar canción - VERSIÓN SIMPLIFICADA
  onUpdate() {
  this.isSubmitting = true;
  this.errorMessage = '';
  this.showSuccess = false;

  this.songsService.update(this.songId, this.editSong)
    .then(updatedSong => {
      // Actualizar la vista
      this.song.set(updatedSong);

      // Mostrar éxito
      this.showSuccess = true;

      // Esperar 1 segundo y recargar
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error: any) => {
      console.error('Error al actualizar:', error);
      this.errorMessage = error.message || 'Error al actualizar la canción';
      this.isSubmitting = false;
    });
}

  // Mostrar modal de confirmación
  confirmDelete() {
    this.showDeleteModal = true;
  }

  // Eliminar canción
  deleteSong() {
    this.songsService.delete(this.songId)
      .then(() => {
        // Redirigir a la lista
        this.router.navigate(['/songs']);
      })
      .catch((error: any) => {
        this.errorMessage = error.message || 'Error al eliminar la canción';
        this.showDeleteModal = false;
      });
  }

}
