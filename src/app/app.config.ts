import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'no-country-medical-services',
        appId: '1:227994471282:web:3ba2d091c346af0c5e6beb',
        storageBucket: 'no-country-medical-services.appspot.com',
        // locationId: 'us-central',
        apiKey: 'AIzaSyBgEaTM5MRKNTikD_E_DxBVOXusPeB8Hjk',
        authDomain: 'no-country-medical-services.firebaseapp.com',
        messagingSenderId: '227994471282',
      })
    ),
    provideStorage(() => getStorage()),
  ],
};

