import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LOCAL_STORAGE_KEY } from '../constants';
import { inject } from '@angular/core';
import { RegisterApiService } from '../services/api/register-api.service';
import { catchError, throwError } from 'rxjs';
import { HomeRouterComponent } from '../pages/routers/home-router/home-router.component';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(RegisterApiService);
  //const homeRouterComponent = inject(HomeRouterComponent);

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
      
          console.log("============ " + error.status);
          if (error.status === 401) {
            console.log("============ 401");
            // Trigger logout
            authService.logOut();
            //homeRouterComponent.signInClick();
          }
          return throwError(error);
        })
    );
    }
  }
  
  return next(req);
};
