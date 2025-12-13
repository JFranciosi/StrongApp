import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, Pencil, Plus, X, Trash2, Dumbbell, Trophy, ChevronLeft, Search, ArrowLeft, Check, PlusCircle, Home, ChevronDown, ChevronUp } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({ X, Pencil, Plus, Trash2, Dumbbell, Trophy, ChevronLeft, Search, ArrowLeft, Check, PlusCircle, Home, ChevronDown, ChevronUp })
    ),
  ],
};