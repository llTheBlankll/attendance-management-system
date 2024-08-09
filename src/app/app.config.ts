import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({"projectId":"attendance-management-sy-4402a","appId":"1:869268882621:web:b78ebfa4410abba8a6a3d4","storageBucket":"attendance-management-sy-4402a.appspot.com","apiKey":"AIzaSyDOKpPJASMR8bxWGlRSYlCchn1iziGcRpA","authDomain":"attendance-management-sy-4402a.firebaseapp.com","messagingSenderId":"869268882621","measurementId":"G-CQ9594N8RL"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ]
};
