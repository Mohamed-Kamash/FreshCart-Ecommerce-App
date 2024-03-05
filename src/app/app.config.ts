import { ApplicationConfig } from '@angular/core';
import { provideRouter} from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // import httpClientModule bs esmo kda fel stnadalone
import { provideAnimations } from '@angular/platform-browser/animations'; // import BrowserAnimationsModule bs esmo kda fel stnadalone
import { provideToastr } from 'ngx-toastr';
import { MyHttpInterceptor } from './interceptor/my-http.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi()),provideAnimations() , provideToastr(),
  {provide:HTTP_INTERCEPTORS,useClass:MyHttpInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
  ], // important note for inject global modules
};
