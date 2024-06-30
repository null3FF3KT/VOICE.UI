import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private apiUrl = 'https://voice-func-app.azurewebsites.net/api/ProcessAudio';

  constructor(private http: HttpClient) {}

  processAudio(audioBlob: Blob): Observable<Blob> {
    const formData = new FormData();
    const functionKey = environment.functionKey;

    if (functionKey === 'default-dev-key') {
      console.warn('Using default development key. Ensure FUNCTION_KEY is set in production.');
    }

    const headers = new HttpHeaders({
      'x-functions-key': functionKey
    });
    formData.append('audio', audioBlob, 'audio.webm');

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob',
      headers: headers
    });
  }
}

