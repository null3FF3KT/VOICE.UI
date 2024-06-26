import { Component } from '@angular/core';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  isRecording = false;
  audioUrl: string | null = null;

  constructor(private speechService: SpeechService) {}

  startRecording() {
    this.isRecording = true;
    this.audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.start();
      });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.processAudio(audioBlob);
      };
    }
  }

  private processAudio(audioBlob: Blob) {
    this.speechService.processAudio(audioBlob).subscribe(
      (responseAudioBlob: Blob) => {
        this.audioUrl = URL.createObjectURL(responseAudioBlob);
        this.playAudio();
      },
      error => console.error('Error processing audio:', error)
    );
  }

  playAudio() {
    if (this.audioUrl) {
      const audio = new Audio(this.audioUrl);
      audio.play();
    }
  }
}