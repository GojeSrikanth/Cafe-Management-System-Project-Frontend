import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { GlobalConstants } from '../shared/global-constants';
import { AuthService } from './auth.service';
import { SnachbarService } from './snachbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private snachbarService: SnachbarService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');

    // decode the token to get its payload
    var tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token);
    }
    catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let expectedRole = '';

    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
      if (this.auth.isAuthenticated() && tokenPayload.role == expectedRole) {
        return true;
      }
      this.snachbarService.openSnackBar(GlobalConstants.unauthroized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }
    else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }

}
