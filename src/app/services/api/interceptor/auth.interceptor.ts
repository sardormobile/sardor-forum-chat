import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { RegisterApiService } from '../register-api.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(RegisterApiService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status === 401) {
        // Trigger logout
        authService.logOut();
        location.reload();
      }
      return throwError(error);
    })
  );
};
