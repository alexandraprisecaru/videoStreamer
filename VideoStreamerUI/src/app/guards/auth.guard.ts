import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketsService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private webSocketService: WebSocketsService,
    private router: Router) {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if(this.loggedIn){
        console.log(this.user);

        webSocketService.sendSaveUserRequest(user);

        this.saveToCookie("authToken", this.user.authToken);
        this.saveToCookie("idToken", this.user.idToken);
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let existentCookie = this.cookieService.get("authToken");
    if (!existentCookie) {
      this.signInWithGoogle();
    } else {
      // this.router.navigate(["movies"]);
      return true;
    }
  }

  /**
   * Checks if the given value is valid, in which case it saves it to cookies under the given name.
   * @param name name of the cookie
   * @param value
   */
  private saveToCookie(name: string, value: string) {
    if (!value || value === "invalid") {
      return;
    }

    let existentCookie = this.cookieService.get(name);
    if (existentCookie === value) {
      return;
    }

    this.cookieService.set(name, value, 1, "/");
  }

  signInWithGoogle(): Promise<void> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, { ux_mode: "redirect" }).then((user) => {
      if (user !== null && user.authToken) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([""]));
      }
    });
  }
}
