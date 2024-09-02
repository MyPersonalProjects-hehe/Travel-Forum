import {
  Router
} from "./chunk-ONX7PTP4.js";
import "./chunk-HQDISMDT.js";
import "./chunk-IPUREWED.js";
import {
  Auth,
  user
} from "./chunk-KB3AZMUE.js";
import "./chunk-6E3YPHFY.js";
import {
  VERSION
} from "./chunk-4PJIYRKE.js";
import {
  registerVersion
} from "./chunk-FLAL5VSN.js";
import {
  Injectable,
  NgModule,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ZAQKODBJ.js";
import {
  map,
  of,
  pipe,
  switchMap,
  take
} from "./chunk-RNHFPYJY.js";
import "./chunk-YTN62GH5.js";
import "./chunk-5K356HEJ.js";

// node_modules/@angular/fire/fesm2022/angular-fire-auth-guard.mjs
var loggedIn = map((user2) => !!user2);
var AuthGuard = class _AuthGuard {
  router;
  auth;
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }
  canActivate = (next, state) => {
    const authPipeFactory = next.data.authGuardPipe || (() => loggedIn);
    return user(this.auth).pipe(take(1), authPipeFactory(next, state), map((can) => {
      if (typeof can === "boolean") {
        return can;
      } else if (Array.isArray(can)) {
        return this.router.createUrlTree(can);
      } else {
        return this.router.parseUrl(can);
      }
    }));
  };
  static ɵfac = function AuthGuard_Factory(t) {
    return new (t || _AuthGuard)(ɵɵinject(Router), ɵɵinject(Auth));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AuthGuard,
    factory: _AuthGuard.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthGuard, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: Router
  }, {
    type: Auth
  }], null);
})();
var canActivate = (pipe2) => ({
  canActivate: [AuthGuard],
  data: {
    authGuardPipe: pipe2
  }
});
var isNotAnonymous = map((user2) => !!user2 && !user2.isAnonymous);
var idTokenResult = switchMap((user2) => user2 ? user2.getIdTokenResult() : of(null));
var emailVerified = map((user2) => !!user2 && user2.emailVerified);
var customClaims = pipe(idTokenResult, map((idTokenResult2) => idTokenResult2 ? idTokenResult2.claims : []));
var hasCustomClaim = (
  // eslint-disable-next-line no-prototype-builtins
  (claim) => pipe(customClaims, map((claims) => claims.hasOwnProperty(claim)))
);
var redirectUnauthorizedTo = (redirect) => pipe(loggedIn, map((loggedIn2) => loggedIn2 || redirect));
var redirectLoggedInTo = (redirect) => pipe(loggedIn, map((loggedIn2) => loggedIn2 && redirect || true));
var AuthGuardModule = class _AuthGuardModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "auth-guard");
  }
  static ɵfac = function AuthGuardModule_Factory(t) {
    return new (t || _AuthGuardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AuthGuardModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AuthGuard]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthGuardModule, [{
    type: NgModule,
    args: [{
      providers: [AuthGuard]
    }]
  }], () => [], null);
})();
export {
  AuthGuard,
  AuthGuardModule,
  canActivate,
  customClaims,
  emailVerified,
  hasCustomClaim,
  idTokenResult,
  isNotAnonymous,
  loggedIn,
  redirectLoggedInTo,
  redirectUnauthorizedTo
};
//# sourceMappingURL=@angular_fire_auth-guard.js.map
