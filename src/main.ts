import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

function initializeApp(http: HttpClient) {
  return () => new Promise<void>(async (resolve) => {
    if (environment.production) {
      try {
        const response: any = await firstValueFrom(http.get('/assets/config.json'));
        environment.functionKey = response.functionKey;
      } catch (error) {
        console.error('Failed to load configuration');
      }
    }
    resolve();
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient) => initializeApp(http),
      deps: [HttpClient],
      multi: true
    }
  ]
}).catch(err => console.error('Application failed to start'));