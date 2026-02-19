import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://127.0.0.1:3000/api/songs';

  getAll(){
    return firstValueFrom(
      this.httpClient.get<any[]>(this.baseUrl)
    );
  }

  getById(songId: string){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${songId}`)
    );
  }

  create(song: any){
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, song)
    );
  }

  delete(songId: string){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${songId}`)
    );
  }

  update(songId: string, song: any){
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${songId}`, song)
    );
  }

}
