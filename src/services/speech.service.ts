import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private apiUrl = 'https://voice-func-app.azurewebsites.net/api/ProcessAudio';

  constructor(private http: HttpClient) {}

  processAudio(audioBlob: Blob): Observable<Blob> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob'
    });
  }
}

