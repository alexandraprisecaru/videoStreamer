function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./guards/auth.guard */
    "./src/app/guards/auth.guard.ts");
    /* harmony import */


    var _components_empty_empty_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/empty/empty.component */
    "./src/app/components/empty/empty.component.ts");
    /* harmony import */


    var _components_movie_room_movie_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/movie-room/movie-room.component */
    "./src/app/components/movie-room/movie-room.component.ts");

    var routes = [{
      path: "",
      component: _components_empty_empty_component__WEBPACK_IMPORTED_MODULE_3__["EmptyComponent"],
      canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
    }, {
      path: "movies",
      children: [{
        path: ":room-id",
        component: _components_movie_room_movie_room_component__WEBPACK_IMPORTED_MODULE_4__["MovieRoomComponent"],
        pathMatch: "full",
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
      }]
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: provideConfig, AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "provideConfig", function () {
      return provideConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./components/login/login.component */
    "./src/app/components/login/login.component.ts");
    /* harmony import */


    var _components_movielist_movielist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./components/movielist/movielist.component */
    "./src/app/components/movielist/movielist.component.ts");
    /* harmony import */


    var _components_movie_room_movie_room_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./components/movie-room/movie-room.component */
    "./src/app/components/movie-room/movie-room.component.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _components_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./components/app.component */
    "./src/app/components/app.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/__ivy_ngcc__/fesm2015/angularx-social-login.js");
    /* harmony import */


    var _components_empty_empty_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./components/empty/empty.component */
    "./src/app/components/empty/empty.component.ts");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var mat_video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! mat-video */
    "./node_modules/mat-video/__ivy_ngcc__/fesm2015/mat-video.js");

    var config = new angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["AuthServiceConfig"]([{
      id: angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["GoogleLoginProvider"].PROVIDER_ID,
      provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["GoogleLoginProvider"]("989131655048-3aj5o2omgm1fht1itf1v4j8r6lutnoss.apps.googleusercontent.com")
    }]);

    function provideConfig() {
      return config;
    }

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [{
        provide: angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["AuthServiceConfig"],
        useFactory: provideConfig
      }],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["SocialLoginModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"], mat_video__WEBPACK_IMPORTED_MODULE_11__["MatVideoModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"], _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"], _components_movielist_movielist_component__WEBPACK_IMPORTED_MODULE_1__["MovielistComponent"], _components_movie_room_movie_room_component__WEBPACK_IMPORTED_MODULE_2__["MovieRoomComponent"], _components_empty_empty_component__WEBPACK_IMPORTED_MODULE_9__["EmptyComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["SocialLoginModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"], mat_video__WEBPACK_IMPORTED_MODULE_11__["MatVideoModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
        args: [{
          declarations: [_components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"], _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"], _components_movielist_movielist_component__WEBPACK_IMPORTED_MODULE_1__["MovielistComponent"], _components_movie_room_movie_room_component__WEBPACK_IMPORTED_MODULE_2__["MovieRoomComponent"], _components_empty_empty_component__WEBPACK_IMPORTED_MODULE_9__["EmptyComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["SocialLoginModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"], mat_video__WEBPACK_IMPORTED_MODULE_11__["MatVideoModule"]],
          providers: [{
            provide: angularx_social_login__WEBPACK_IMPORTED_MODULE_8__["AuthServiceConfig"],
            useFactory: provideConfig
          }],
          bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/app.component.ts":
  /*!*********************************************!*\
    !*** ./src/app/components/app.component.ts ***!
    \*********************************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppComponentsAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/__ivy_ngcc__/fesm2015/angularx-social-login.js");
    /* harmony import */


    var _services_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services/websocket.service */
    "./src/app/services/websocket.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = /*#__PURE__*/function () {
      function AppComponent(authService, webSocketService) {
        _classCallCheck(this, AppComponent);

        this.authService = authService;
        this.webSocketService = webSocketService;
        this.title = 'videostreamer';
      }

      _createClass(AppComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.webSocketService.start();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.webSocketService.stop();
        } // signInWithGoogle(): void {
        //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        // }

      }, {
        key: "signOut",
        value: function signOut() {
          this.authService.signOut();
        }
      }]);

      return AppComponent;
    }();

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angularx_social_login__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebSocketsService"]));
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.scss']
        }]
      }], function () {
        return [{
          type: angularx_social_login__WEBPACK_IMPORTED_MODULE_1__["AuthService"]
        }, {
          type: _services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebSocketsService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/empty/empty.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/components/empty/empty.component.ts ***!
    \*****************************************************/

  /*! exports provided: EmptyComponent */

  /***/
  function srcAppComponentsEmptyEmptyComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EmptyComponent", function () {
      return EmptyComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _movielist_movielist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../movielist/movielist.component */
    "./src/app/components/movielist/movielist.component.ts");

    var EmptyComponent = /*#__PURE__*/function () {
      function EmptyComponent() {
        _classCallCheck(this, EmptyComponent);
      }

      _createClass(EmptyComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return EmptyComponent;
    }();

    EmptyComponent.ɵfac = function EmptyComponent_Factory(t) {
      return new (t || EmptyComponent)();
    };

    EmptyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: EmptyComponent,
      selectors: [["app-empty"]],
      decls: 1,
      vars: 0,
      template: function EmptyComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "movie-list");
        }
      },
      directives: [_movielist_movielist_component__WEBPACK_IMPORTED_MODULE_1__["MovielistComponent"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW1wdHkvZW1wdHkuY29tcG9uZW50LnNjc3MifQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EmptyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-empty',
          templateUrl: './empty.component.html',
          styleUrls: ['./empty.component.scss']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/login/login.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/components/login/login.component.ts ***!
    \*****************************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppComponentsLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var LoginComponent = /*#__PURE__*/function () {
      function LoginComponent() {
        _classCallCheck(this, LoginComponent);
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return LoginComponent;
    }();

    LoginComponent.ɵfac = function LoginComponent_Factory(t) {
      return new (t || LoginComponent)();
    };

    LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LoginComponent,
      selectors: [["app-login"]],
      decls: 2,
      vars: 0,
      template: function LoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "login works!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MifQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-login',
          templateUrl: './login.component.html',
          styleUrls: ['./login.component.scss']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/movie-room/movie-room.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/components/movie-room/movie-room.component.ts ***!
    \***************************************************************/

  /*! exports provided: MovieRoomComponent */

  /***/
  function srcAppComponentsMovieRoomMovieRoomComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomComponent", function () {
      return MovieRoomComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/websocket.service */
    "./src/app/services/websocket.service.ts");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/__ivy_ngcc__/fesm2015/angularx-social-login.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var mat_video__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! mat-video */
    "./node_modules/mat-video/__ivy_ngcc__/fesm2015/mat-video.js");

    var _c0 = ["video"];

    function MovieRoomComponent_div_2_li_9_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var message_r4 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r4.User.name);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r4.Message);
      }
    }

    function MovieRoomComponent_div_2_Template(rf, ctx) {
      if (rf & 1) {
        var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 1, 2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup.enter", function MovieRoomComponent_div_2_Template_input_keyup_enter_5_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r5.sendMessage(_r1.value);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ul");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MovieRoomComponent_div_2_li_9_Template, 5, 2, "li", 3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-video", 5, 6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mutedChange", function MovieRoomComponent_div_2_Template_mat_video_mutedChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);

          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r7.muted = $event;
        })("timeChange", function MovieRoomComponent_div_2_Template_mat_video_timeChange_11_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);

          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r8.currentTime = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.room.Users);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.room.Id);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.chatMessages);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.src)("title", ctx_r0.title)("autoplay", ctx_r0.autoplay)("preload", ctx_r0.preload)("loop", ctx_r0.loop)("fullscreen", ctx_r0.fullscreen)("download", ctx_r0.download)("quality", ctx_r0.quality)("keyboard", ctx_r0.keyboard)("color", ctx_r0.color)("spinner", ctx_r0.spinner)("poster", ctx_r0.poster)("overlay", ctx_r0.overlay)("muted", ctx_r0.muted)("showFrameByFrame", ctx_r0.showFrameByFrame)("time", ctx_r0.currentTime);
      }
    }

    var MovieRoomComponent = /*#__PURE__*/function () {
      function MovieRoomComponent(route, changeDetector, webSocketService, authService) {
        var _this = this;

        _classCallCheck(this, MovieRoomComponent);

        this.route = route;
        this.changeDetector = changeDetector;
        this.webSocketService = webSocketService;
        this.authService = authService;
        this.chatMessages = [];
        this.src = "http://static.videogular.com/assets/videos/videogular.mp4";
        this.title = this.room ? this.room.Movie.Title : "Not loaded yet";
        this.autoplay = true;
        this.preload = true;
        this.loop = false;
        this.fullscreen = false;
        this.download = false;
        this.quality = true;
        this.keyboard = true;
        this.muted = true;
        this.overlay = true;
        this.showFrameByFrame = false;
        this.currentTime = 1;
        this.seekedByWS = false;
        this.route.params.subscribe(function (params) {
          console.log(params);

          _this.authService.authState.subscribe(function (user) {
            if (user !== null && user !== undefined) {
              _this.user = user;
              _this.roomId = params["room-id"];
              console.log(_this.roomId);

              _this.webSocketService.sendMovieRoomWithIdRequest(_this.roomId);

              _this.webSocketService.sendChatMessagesRequest(_this.roomId);
            }
          });
        });
      }

      _createClass(MovieRoomComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.createMovieRoomResponsesSubscription();
          this.createMovieRoomUpdatesSubscription();
          this.createMovieRoomPauseUpdatesSubscription();
          this.createMovieRoomPlayUpdatesSubscription();
          this.createMovieRoomSeekUpdatesSubscription();
          this.createChatMessagesReponsesSubscription();
          this.createChatMessageUpdatesSubscription();
        }
      }, {
        key: "sendMessage",
        value: function sendMessage(value) {
          var chatMessage = {
            Id: "",
            RoomId: this.roomId,
            User: this.user,
            Message: value,
            VoiceMessage: "voice message cica",
            DateTime: new Date(),
            MovieCurrentTime: this.currentTime // seconds into the movie

          };
          this.chatMessages.push(chatMessage);
          this.webSocketService.sendChatMessageRequest(this.roomId, chatMessage);
        }
      }, {
        key: "processMovieRoom",
        value: function processMovieRoom(room) {
          var _this2 = this;

          console.debug('Movie Room received through the observer:\n%o', room);
          this.room = room;
          this.title = room.Movie.Title;
          this.changeDetector.detectChanges();
          this.currentTime = room.TimeWatched;
          this.video.timeChange.subscribe(function () {// send ws request to update timewatched 
          });

          this.video.getVideoTag().onpause = function () {
            // check if it's on pause already-> don't make request
            console.log("on pause called, current time: ".concat(_this2.video.getVideoTag().currentTime)); // send ws request to pause video for all

            _this2.webSocketService.sendPauseRequest(_this2.roomId, _this2.video.getVideoTag().currentTime);
          };

          this.video.getVideoTag().onplay = function () {
            console.log("on play called, current time: ".concat(_this2.video.getVideoTag().currentTime)); // send ws reuqest to play the video

            _this2.webSocketService.sendPlayRequest(_this2.roomId, _this2.video.getVideoTag().currentTime);
          };

          this.video.getVideoTag().onseeked = function () {
            console.log("on seeked moved called, current time: ".concat(_this2.video.getVideoTag().currentTime));

            if (!_this2.seekedByWS) {
              // send ws request to update the time
              _this2.webSocketService.sendSeekRequest(_this2.roomId, _this2.video.getVideoTag().currentTime);
            }

            _this2.seekedByWS = false;
          };

          console.log("title: ".concat(this.video.title));
        }
      }, {
        key: "pause",
        value: function pause(roomId, currentTime) {
          if (roomId !== this.roomId) {
            return;
          }

          this.changeDetector.detectChanges();
          this.video.getVideoTag().pause();
          this.currentTime = currentTime;
        }
      }, {
        key: "play",
        value: function play(roomId, currentTime) {
          if (roomId !== this.roomId) {
            return;
          }

          this.changeDetector.detectChanges();
          this.video.getVideoTag().play();
          this.currentTime = currentTime;
        }
      }, {
        key: "seek",
        value: function seek(roomId, currentTime) {
          if (roomId !== this.roomId) {
            return;
          }

          this.changeDetector.detectChanges();
          this.seekedByWS = true;
          this.video.getVideoTag().currentTime = currentTime;
          this.currentTime = currentTime;
        }
      }, {
        key: "setChatMessages",
        value: function setChatMessages(roomId, chatMessages) {
          if (roomId !== this.roomId) {
            return;
          }

          if (!chatMessages) {
            return;
          }

          this.chatMessages = chatMessages;
        }
      }, {
        key: "addChatMessage",
        value: function addChatMessage(chatMessage) {
          if (!chatMessage) {
            return;
          }

          if (chatMessage.RoomId !== this.roomId) {
            return;
          }

          this.chatMessages.push(chatMessage);
        }
      }, {
        key: "createMovieRoomResponsesSubscription",
        value: function createMovieRoomResponsesSubscription() {
          var self = this;
          var movieRoomResponsesObserver = {
            next: function next(room) {
              self.processMovieRoom(room);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomResponses(movieRoomResponsesObserver);
        }
      }, {
        key: "createMovieRoomUpdatesSubscription",
        value: function createMovieRoomUpdatesSubscription() {
          var self = this;
          var movieRoomUpdatesObserver = {
            next: function next(room) {
              if (room.Id !== self.roomId) {
                return;
              }

              self.processMovieRoom(room);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomUpdates(movieRoomUpdatesObserver);
        }
      }, {
        key: "createMovieRoomPauseUpdatesSubscription",
        value: function createMovieRoomPauseUpdatesSubscription() {
          var self = this;
          var movieRoomResponsesObserver = {
            next: function next(room) {
              self.pause(room.Id, room.TimeWatched);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomPauseUpdates(movieRoomResponsesObserver);
        }
      }, {
        key: "createMovieRoomPlayUpdatesSubscription",
        value: function createMovieRoomPlayUpdatesSubscription() {
          var self = this;
          var movieRoomUpdatesObserver = {
            next: function next(room) {
              self.play(room.Id, room.TimeWatched);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomPlayUpdates(movieRoomUpdatesObserver);
        }
      }, {
        key: "createMovieRoomSeekUpdatesSubscription",
        value: function createMovieRoomSeekUpdatesSubscription() {
          var self = this;
          var movieRoomUpdatesObserver = {
            next: function next(room) {
              self.seek(room.Id, room.TimeWatched);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomSeekUpdates(movieRoomUpdatesObserver);
        }
      }, {
        key: "createChatMessagesReponsesSubscription",
        value: function createChatMessagesReponsesSubscription() {
          var self = this;
          var chatMessagesResponseObserver = {
            next: function next(messages) {
              if (!messages || messages.length === 0) {
                return;
              }

              self.setChatMessages(messages[0].RoomId, messages);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more chat messages responses');
            }
          };
          this.webSocketService.subscribeToChatMessagesReponses(chatMessagesResponseObserver);
        }
      }, {
        key: "createChatMessageUpdatesSubscription",
        value: function createChatMessageUpdatesSubscription() {
          var self = this;
          var chatMessagesUpdateObserver = {
            next: function next(message) {
              if (!message) {
                return;
              }

              self.addChatMessage(message);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more chat message updates');
            }
          };
          this.webSocketService.subscribeToChatMessageUpdates(chatMessagesUpdateObserver);
        }
      }, {
        key: "matVideo",
        set: function set(matVideo) {
          if (matVideo) {
            // initially setter gets called with undefined
            this.video = matVideo;
          }
        }
      }]);

      return MovieRoomComponent;
    }();

    MovieRoomComponent.ɵfac = function MovieRoomComponent_Factory(t) {
      return new (t || MovieRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebSocketsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"]));
    };

    MovieRoomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MovieRoomComponent,
      selectors: [["app-movie-room"]],
      viewQuery: function MovieRoomComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.matVideo = _t.first);
        }
      },
      decls: 3,
      vars: 1,
      consts: [[4, "ngIf"], [3, "keyup.enter"], ["box", ""], [4, "ngFor", "ngForOf"], ["margin", "100px"], [3, "src", "title", "autoplay", "preload", "loop", "fullscreen", "download", "quality", "keyboard", "color", "spinner", "poster", "overlay", "muted", "showFrameByFrame", "time", "mutedChange", "timeChange"], ["video", ""]],
      template: function MovieRoomComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "movie-room works!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MovieRoomComponent_div_2_Template, 13, 19, "div", 0);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room !== undefined);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], mat_video__WEBPACK_IMPORTED_MODULE_5__["ɵb"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbW92aWUtcm9vbS9tb3ZpZS1yb29tLmNvbXBvbmVudC5zY3NzIn0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MovieRoomComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-movie-room',
          templateUrl: './movie-room.component.html',
          styleUrls: ['./movie-room.component.scss']
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
        }, {
          type: src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebSocketsService"]
        }, {
          type: angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
        }];
      }, {
        matVideo: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: ['video']
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/components/movielist/movielist.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/components/movielist/movielist.component.ts ***!
    \*************************************************************/

  /*! exports provided: MovielistComponent */

  /***/
  function srcAppComponentsMovielistMovielistComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovielistComponent", function () {
      return MovielistComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! src/app/services/websocket.service */
    "./src/app/services/websocket.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    function MovielistComponent_div_2_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Movies");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function MovielistComponent_li_7_Template(rf, ctx) {
      if (rf & 1) {
        var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MovielistComponent_li_7_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);

          var movie_r3 = ctx.$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r4.goToMovie(movie_r3);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var movie_r3 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](movie_r3.Title);
      }
    }

    function MovielistComponent_li_12_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var room_r6 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](room_r6.Id);
      }
    }

    var MovielistComponent = /*#__PURE__*/function () {
      function MovielistComponent(webSocketService, router) {
        _classCallCheck(this, MovielistComponent);

        this.webSocketService = webSocketService;
        this.router = router;
        this.movies = [];
        this.movieRooms = [];
      }

      _createClass(MovielistComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.createMovieListResponsesSubscription();
          this.createMovieListUpdatesSubscription();
          this.createMovieRoomsResponsesSubscription();
          this.createMovieRoomsUpdatesSubscription();
          this.createMovieRoomResponsesSubscription();
          this.createMovieRoomUpdatesSubscription();
          this.webSocketService.sendMovieListRequest();
          this.webSocketService.sendMovieRoomsRequest();
        }
      }, {
        key: "goToMovie",
        value: function goToMovie(movie) {
          console.log(movie);
          this.webSocketService.sendMovieRoomRequest(movie.Id);
        }
      }, {
        key: "processMovies",
        value: function processMovies(movieList) {
          console.debug('Movies received through the observer:\n%o', movieList);
          this.movies = movieList;
        }
      }, {
        key: "processMovieRoom",
        value: function processMovieRoom(room) {
          console.debug('Movie Room received through the observer:\n%o', room);
          this.router.navigate(["movies/".concat(room.Id)]);
        }
      }, {
        key: "processMovieRooms",
        value: function processMovieRooms(rooms) {
          console.debug('Movie Rooms received through the observer:\n%o', rooms);
          this.movieRooms = rooms;
        }
      }, {
        key: "createMovieListResponsesSubscription",
        value: function createMovieListResponsesSubscription() {
          var self = this;
          var movieListResponsesObserver = {
            next: function next(movies) {
              self.processMovies(movies);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieListResponses(movieListResponsesObserver);
        }
      }, {
        key: "createMovieListUpdatesSubscription",
        value: function createMovieListUpdatesSubscription() {
          var self = this;
          var movieListUpdatesObserver = {
            next: function next(movies) {
              self.processMovies(movies);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies updates');
            }
          };
          this.webSocketService.subscribeToMovieListUpdates(movieListUpdatesObserver);
        }
      }, {
        key: "createMovieRoomsResponsesSubscription",
        value: function createMovieRoomsResponsesSubscription() {
          var self = this;
          var movieRoomsResponsesObserver = {
            next: function next(movieRooms) {
              self.processMovieRooms(movieRooms);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomsResponses(movieRoomsResponsesObserver);
        }
      }, {
        key: "createMovieRoomsUpdatesSubscription",
        value: function createMovieRoomsUpdatesSubscription() {
          var self = this;
          var movieRoomsUpdatesObserver = {
            next: function next(movieRooms) {
              self.processMovieRooms(movieRooms);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies updates');
            }
          };
          this.webSocketService.subscribeToMovieRoomsUpdates(movieRoomsUpdatesObserver);
        }
      }, {
        key: "createMovieRoomResponsesSubscription",
        value: function createMovieRoomResponsesSubscription() {
          var self = this;
          var movieRoomResponsesObserver = {
            next: function next(room) {
              self.processMovieRoom(room);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomResponses(movieRoomResponsesObserver);
        }
      }, {
        key: "createMovieRoomUpdatesSubscription",
        value: function createMovieRoomUpdatesSubscription() {
          var self = this;
          var movieRoomUpdatesObserver = {
            next: function next(room) {
              self.processMovieRoom(room);
            },
            error: function error(err) {
              console.error('Error: %o', err);
            },
            complete: function complete() {
              console.log('No more movies responses');
            }
          };
          this.webSocketService.subscribeToMovieRoomUpdates(movieRoomUpdatesObserver);
        }
      }]);

      return MovielistComponent;
    }();

    MovielistComponent.ɵfac = function MovielistComponent_Factory(t) {
      return new (t || MovielistComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebSocketsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]));
    };

    MovielistComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MovielistComponent,
      selectors: [["movie-list"]],
      decls: 13,
      vars: 5,
      consts: [["class", "bold", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "bold"], [3, "click"]],
      template: function MovielistComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "movielist works!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MovielistComponent_div_2_Template, 3, 0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MovielistComponent_li_7_Template, 3, 1, "li", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, MovielistComponent_li_12_Template, 3, 1, "li", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.movies.length > 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Movies count:", ctx.movies.length, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.movies);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Movie rooms count: ", ctx.movieRooms.length, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.movieRooms);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbW92aWVsaXN0L21vdmllbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MovielistComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'movie-list',
          templateUrl: './movielist.component.html',
          styleUrls: ['./movielist.component.scss']
        }]
      }], function () {
        return [{
          type: src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebSocketsService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/entities/messageType.ts":
  /*!*****************************************!*\
    !*** ./src/app/entities/messageType.ts ***!
    \*****************************************/

  /*! exports provided: MessageType */

  /***/
  function srcAppEntitiesMessageTypeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessageType", function () {
      return MessageType;
    });

    var MessageType;

    (function (MessageType) {
      MessageType["SAVE_USER_REQUEST"] = "SAVE_USER_REQUEST";
      MessageType["MOVIE_LIST_REQUEST"] = "MOVIE_LIST_REQUEST";
      MessageType["MOVIE_LIST_RESPONSE"] = "MOVIE_LIST_RESPONSE";
      MessageType["MOVIE_LIST_UPDATE"] = "MOVIE_LIST_UPDATE";
      MessageType["MOVIE_ROOMS_REQUEST"] = "MOVIE_ROOMS_REQUEST";
      MessageType["MOVIE_ROOMS_RESPONSE"] = "MOVIE_ROOMS_RESPONSE";
      MessageType["MOVIE_ROOMS_UPDATE"] = "MOVIE_ROOMS_UPDATE";
      MessageType["MOVIE_ROOM_REQUEST"] = "MOVIE_ROOM_REQUEST";
      MessageType["MOVIE_ROOM_WITH_ID_REQUEST"] = "MOVIE_ROOM_WITH_ID_REQUEST";
      MessageType["MOVIE_ROOM_RESPONSE"] = "MOVIE_ROOM_RESPONSE";
      MessageType["MOVIE_ROOM_UPDATE"] = "MOVIE_ROOM_UPDATE";
      MessageType["MOVIE_STREAM_REQUEST"] = "MOVIE_STREAM_REQUEST";
      MessageType["MOVIE_STREAM_RESPONSE"] = "MOVIE_STREAM_RESPONSE";
      MessageType["MOVIE_STREAM_UPDATE"] = "MOVIE_STREAM_UPDATE";
      MessageType["MOVIE_CHAT_REQUEST"] = "MOVIE_CHAT_REQUEST";
      MessageType["MOVIE_CHAT_RESPONSE"] = "MOVIE_CHAT_RESPONSE";
      MessageType["MOVIE_CHAT_UPDATE"] = "MOVIE_CHAT_UPDATE";
      MessageType["SEND_CHAT_MESSAGE_REQUEST"] = "SEND_CHAT_MESSAGE_REQUEST";
      MessageType["CHAT_MESSAGES_REQUEST"] = "CHAT_MESSAGES_REQUEST";
      MessageType["CHAT_MESSAGES_RESPONSE"] = "CHAT_MESSAGES_RESPONSE";
      MessageType["CHAT_MESSAGE_UPDATE"] = "CHAT_MESSAGE_UPDATE";
      MessageType["SEND_MOVIE_COMMENT_REQUEST"] = "SEND_MOVIE_COMMENT_REQUEST";
      MessageType["MOVIE_COMMENTS_REQUEST"] = "MOVIE_COMMENTS_REQUEST";
      MessageType["MOVIE_COMMENTS_RESPONSE"] = "MOVIE_COMMENTS_RESPONSE";
      MessageType["MOVIE_COMMENT_UPDATE"] = "MOVIE_COMMENT_UPDATE";
      MessageType["MOVIE_ROOM_PAUSE_REQUEST"] = "MOVIE_ROOM_PAUSE_REQUEST";
      MessageType["MOVIE_ROOM_PAUSE_UPDATE"] = "MOVIE_ROOM_PAUSE_UPDATE";
      MessageType["MOVIE_ROOM_PLAY_REQUEST"] = "MOVIE_ROOM_PLAY_REQUEST";
      MessageType["MOVIE_ROOM_PLAY_UPDATE"] = "MOVIE_ROOM_PLAY_UPDATE";
      MessageType["MOVIE_ROOM_SEEK_REQUEST"] = "MOVIE_ROOM_SEEK_REQUEST";
      MessageType["MOVIE_ROOM_SEEK_UPDATE"] = "MOVIE_ROOM_SEEK_UPDATE";
      MessageType["MOVIE_CLOSE_REQUEST"] = "MOVIE_CLOSE_REQUEST";
      MessageType["MOVIE_CLOSE_RESPONSE"] = "MOVIE_CLOSE_RESPONSE"; // hmm............... idk if personal is needed or doable in the current implementation

      MessageType["MOVIE_CLOSE_PERSONAL_REQUEST"] = "MOVIE_CLOSE_PERSONAL_REQUEST";
      MessageType["MOVIE_CLOSE_PERSONAL_RESPONSE"] = "MOVIE_CLOSE_PERSONAL_RESPONSE";
    })(MessageType || (MessageType = {}));
    /***/

  },

  /***/
  "./src/app/entities/messageWrapper.ts":
  /*!********************************************!*\
    !*** ./src/app/entities/messageWrapper.ts ***!
    \********************************************/

  /*! exports provided: MessageWrapper */

  /***/
  function srcAppEntitiesMessageWrapperTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessageWrapper", function () {
      return MessageWrapper;
    });

    var MessageWrapper = function MessageWrapper(messageType, payload) {
      _classCallCheck(this, MessageWrapper);

      this.type = messageType;
      this.payload = JSON.stringify(payload);
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/chatMessagesRequest.ts":
  /*!**********************************************************!*\
    !*** ./src/app/entities/requests/chatMessagesRequest.ts ***!
    \**********************************************************/

  /*! exports provided: ChatMessagesRequest */

  /***/
  function srcAppEntitiesRequestsChatMessagesRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChatMessagesRequest", function () {
      return ChatMessagesRequest;
    });

    var ChatMessagesRequest = function ChatMessagesRequest(roomId, userId) {
      _classCallCheck(this, ChatMessagesRequest);

      this.roomId = roomId;
      this.userId = userId;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieCommentsRequest.ts":
  /*!***********************************************************!*\
    !*** ./src/app/entities/requests/movieCommentsRequest.ts ***!
    \***********************************************************/

  /*! exports provided: MovieCommentsRequest */

  /***/
  function srcAppEntitiesRequestsMovieCommentsRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieCommentsRequest", function () {
      return MovieCommentsRequest;
    });

    var MovieCommentsRequest = function MovieCommentsRequest(movieId) {
      _classCallCheck(this, MovieCommentsRequest);

      this.movieId = movieId;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieListRequest.ts":
  /*!*******************************************************!*\
    !*** ./src/app/entities/requests/movieListRequest.ts ***!
    \*******************************************************/

  /*! exports provided: MovieListRequest */

  /***/
  function srcAppEntitiesRequestsMovieListRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieListRequest", function () {
      return MovieListRequest;
    });

    var MovieListRequest = function MovieListRequest() {
      _classCallCheck(this, MovieListRequest);
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomPauseRequest.ts":
  /*!************************************************************!*\
    !*** ./src/app/entities/requests/movieRoomPauseRequest.ts ***!
    \************************************************************/

  /*! exports provided: MovieRoomPauseRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomPauseRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomPauseRequest", function () {
      return MovieRoomPauseRequest;
    });

    var MovieRoomPauseRequest = function MovieRoomPauseRequest(roomId, userId, currentTime) {
      _classCallCheck(this, MovieRoomPauseRequest);

      this.roomId = roomId;
      this.userId = userId;
      this.currentTime = currentTime;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomPlayRequest.ts":
  /*!***********************************************************!*\
    !*** ./src/app/entities/requests/movieRoomPlayRequest.ts ***!
    \***********************************************************/

  /*! exports provided: MovieRoomPlayRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomPlayRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomPlayRequest", function () {
      return MovieRoomPlayRequest;
    });

    var MovieRoomPlayRequest = function MovieRoomPlayRequest(roomId, userId, currentTime) {
      _classCallCheck(this, MovieRoomPlayRequest);

      this.roomId = roomId;
      this.userId = userId;
      this.currentTime = currentTime;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomRequest.ts":
  /*!*******************************************************!*\
    !*** ./src/app/entities/requests/movieRoomRequest.ts ***!
    \*******************************************************/

  /*! exports provided: MovieRoomRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomRequest", function () {
      return MovieRoomRequest;
    });

    var MovieRoomRequest = function MovieRoomRequest(movieId, userId) {
      _classCallCheck(this, MovieRoomRequest);

      this.movieId = movieId;
      this.userId = userId;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomSeekRequest.ts":
  /*!***********************************************************!*\
    !*** ./src/app/entities/requests/movieRoomSeekRequest.ts ***!
    \***********************************************************/

  /*! exports provided: MovieRoomSeekRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomSeekRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomSeekRequest", function () {
      return MovieRoomSeekRequest;
    });

    var MovieRoomSeekRequest = function MovieRoomSeekRequest(roomId, userId, currentTime) {
      _classCallCheck(this, MovieRoomSeekRequest);

      this.roomId = roomId;
      this.userId = userId;
      this.currentTime = currentTime;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomWithIdRequest.ts":
  /*!*************************************************************!*\
    !*** ./src/app/entities/requests/movieRoomWithIdRequest.ts ***!
    \*************************************************************/

  /*! exports provided: MovieRoomWithIdRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomWithIdRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomWithIdRequest", function () {
      return MovieRoomWithIdRequest;
    });

    var MovieRoomWithIdRequest = function MovieRoomWithIdRequest(roomId, userId) {
      _classCallCheck(this, MovieRoomWithIdRequest);

      this.roomId = roomId;
      this.userId = userId;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/movieRoomsRequest.ts":
  /*!********************************************************!*\
    !*** ./src/app/entities/requests/movieRoomsRequest.ts ***!
    \********************************************************/

  /*! exports provided: MovieRoomsRequest */

  /***/
  function srcAppEntitiesRequestsMovieRoomsRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MovieRoomsRequest", function () {
      return MovieRoomsRequest;
    });

    var MovieRoomsRequest = function MovieRoomsRequest(userId) {
      _classCallCheck(this, MovieRoomsRequest);

      this.userId = userId;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/saveUserRequest.ts":
  /*!******************************************************!*\
    !*** ./src/app/entities/requests/saveUserRequest.ts ***!
    \******************************************************/

  /*! exports provided: SaveUserRequest */

  /***/
  function srcAppEntitiesRequestsSaveUserRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SaveUserRequest", function () {
      return SaveUserRequest;
    });

    var SaveUserRequest = function SaveUserRequest(user) {
      _classCallCheck(this, SaveUserRequest);

      this.user = user;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/sendChatMessageRequest.ts":
  /*!*************************************************************!*\
    !*** ./src/app/entities/requests/sendChatMessageRequest.ts ***!
    \*************************************************************/

  /*! exports provided: SendChatMessageRequest */

  /***/
  function srcAppEntitiesRequestsSendChatMessageRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SendChatMessageRequest", function () {
      return SendChatMessageRequest;
    });

    var SendChatMessageRequest = function SendChatMessageRequest(roomId, userId, chatMessage) {
      _classCallCheck(this, SendChatMessageRequest);

      this.roomId = roomId;
      this.userId = userId;
      this.chatMessage = chatMessage;
    };
    /***/

  },

  /***/
  "./src/app/entities/requests/sendMovieCommentRequest.ts":
  /*!**************************************************************!*\
    !*** ./src/app/entities/requests/sendMovieCommentRequest.ts ***!
    \**************************************************************/

  /*! exports provided: SendMovieCommentRequest */

  /***/
  function srcAppEntitiesRequestsSendMovieCommentRequestTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SendMovieCommentRequest", function () {
      return SendMovieCommentRequest;
    });

    var SendMovieCommentRequest = function SendMovieCommentRequest(movieId, movieComment) {
      _classCallCheck(this, SendMovieCommentRequest);

      this.movieId = movieId;
      this.movieComment = movieComment;
    };
    /***/

  },

  /***/
  "./src/app/guards/auth.guard.ts":
  /*!**************************************!*\
    !*** ./src/app/guards/auth.guard.ts ***!
    \**************************************/

  /*! exports provided: AuthGuard */

  /***/
  function srcAppGuardsAuthGuardTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthGuard", function () {
      return AuthGuard;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/__ivy_ngcc__/fesm2015/angularx-social-login.js");
    /* harmony import */


    var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-cookie-service */
    "./node_modules/ngx-cookie-service/__ivy_ngcc__/fesm2015/ngx-cookie-service.js");
    /* harmony import */


    var _services_websocket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../services/websocket.service */
    "./src/app/services/websocket.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AuthGuard = /*#__PURE__*/function () {
      function AuthGuard(authService, cookieService, webSocketService, router) {
        var _this3 = this;

        _classCallCheck(this, AuthGuard);

        this.authService = authService;
        this.cookieService = cookieService;
        this.webSocketService = webSocketService;
        this.router = router;
        this.authService.authState.subscribe(function (user) {
          _this3.user = user;
          _this3.loggedIn = user != null;

          if (_this3.loggedIn) {
            console.log(_this3.user);
            webSocketService.sendSaveUserRequest(user);

            _this3.saveToCookie("authToken", _this3.user.authToken);

            _this3.saveToCookie("idToken", _this3.user.idToken);
          }
        });
      }

      _createClass(AuthGuard, [{
        key: "canActivate",
        value: function canActivate(next, state) {
          var existentCookie = this.cookieService.get("authToken");

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

      }, {
        key: "saveToCookie",
        value: function saveToCookie(name, value) {
          if (!value || value === "invalid") {
            return;
          }

          var existentCookie = this.cookieService.get(name);

          if (existentCookie === value) {
            return;
          }

          this.cookieService.set(name, value, 1, "/");
        }
      }, {
        key: "signInWithGoogle",
        value: function signInWithGoogle() {
          var _this4 = this;

          return this.authService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_1__["GoogleLoginProvider"].PROVIDER_ID, {
            ux_mode: "redirect"
          }).then(function (user) {
            if (user !== null && user.authToken) {
              _this4.router.navigateByUrl('/', {
                skipLocationChange: true
              }).then(function () {
                return _this4.router.navigate([""]);
              });
            }
          });
        }
      }]);

      return AuthGuard;
    }();

    AuthGuard.ɵfac = function AuthGuard_Factory(t) {
      return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](angularx_social_login__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_websocket_service__WEBPACK_IMPORTED_MODULE_3__["WebSocketsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]));
    };

    AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AuthGuard,
      factory: AuthGuard.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: angularx_social_login__WEBPACK_IMPORTED_MODULE_1__["AuthService"]
        }, {
          type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"]
        }, {
          type: _services_websocket_service__WEBPACK_IMPORTED_MODULE_3__["WebSocketsService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/services/appConfig.service.ts":
  /*!***********************************************!*\
    !*** ./src/app/services/appConfig.service.ts ***!
    \***********************************************/

  /*! exports provided: AppConfigService */

  /***/
  function srcAppServicesAppConfigServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppConfigService", function () {
      return AppConfigService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var AppConfigService = /*#__PURE__*/function () {
      function AppConfigService() {
        _classCallCheck(this, AppConfigService);
      } // public loadAppConfig(): Promise<string | void> {
      //   // return this.httpClient.get('/assets/config.json')
      //   //   .toPromise()
      //   //   .then(data => {
      //   //     this.appConfig = data;
      //   // });
      // }


      _createClass(AppConfigService, [{
        key: "webSocketsServerUrl",
        get: function get() {
          // if (!this.appConfig) {
          //   throw Error('Config file not loaded!');
          // }
          // return "ws://echo.websocket.org";
          return "wss://localhost:44343/movies";
        }
      }]);

      return AppConfigService;
    }();

    AppConfigService.ɵfac = function AppConfigService_Factory(t) {
      return new (t || AppConfigService)();
    };

    AppConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AppConfigService,
      factory: AppConfigService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppConfigService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/services/websocket.service.ts":
  /*!***********************************************!*\
    !*** ./src/app/services/websocket.service.ts ***!
    \***********************************************/

  /*! exports provided: WebSocketsService */

  /***/
  function srcAppServicesWebsocketServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WebSocketsService", function () {
      return WebSocketsService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../entities/messageWrapper */
    "./src/app/entities/messageWrapper.ts");
    /* harmony import */


    var _entities_messageType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../entities/messageType */
    "./src/app/entities/messageType.ts");
    /* harmony import */


    var _entities_requests_movieListRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../entities/requests/movieListRequest */
    "./src/app/entities/requests/movieListRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomRequest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../entities/requests/movieRoomRequest */
    "./src/app/entities/requests/movieRoomRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomsRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../entities/requests/movieRoomsRequest */
    "./src/app/entities/requests/movieRoomsRequest.ts");
    /* harmony import */


    var _entities_requests_saveUserRequest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../entities/requests/saveUserRequest */
    "./src/app/entities/requests/saveUserRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomWithIdRequest__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../entities/requests/movieRoomWithIdRequest */
    "./src/app/entities/requests/movieRoomWithIdRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomPauseRequest__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../entities/requests/movieRoomPauseRequest */
    "./src/app/entities/requests/movieRoomPauseRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomPlayRequest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../entities/requests/movieRoomPlayRequest */
    "./src/app/entities/requests/movieRoomPlayRequest.ts");
    /* harmony import */


    var _entities_requests_movieRoomSeekRequest__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../entities/requests/movieRoomSeekRequest */
    "./src/app/entities/requests/movieRoomSeekRequest.ts");
    /* harmony import */


    var _entities_requests_sendChatMessageRequest__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ../entities/requests/sendChatMessageRequest */
    "./src/app/entities/requests/sendChatMessageRequest.ts");
    /* harmony import */


    var _entities_requests_chatMessagesRequest__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ../entities/requests/chatMessagesRequest */
    "./src/app/entities/requests/chatMessagesRequest.ts");
    /* harmony import */


    var _entities_requests_movieCommentsRequest__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ../entities/requests/movieCommentsRequest */
    "./src/app/entities/requests/movieCommentsRequest.ts");
    /* harmony import */


    var _entities_requests_sendMovieCommentRequest__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ../entities/requests/sendMovieCommentRequest */
    "./src/app/entities/requests/sendMovieCommentRequest.ts");
    /* harmony import */


    var _appConfig_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./appConfig.service */
    "./src/app/services/appConfig.service.ts");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/__ivy_ngcc__/fesm2015/angularx-social-login.js");

    var WebSocketsService = /*#__PURE__*/function () {
      function WebSocketsService(appConfigService, authService) {
        var _this5 = this;

        _classCallCheck(this, WebSocketsService);

        this.appConfigService = appConfigService;
        this.authService = authService;
        this.authService.authState.subscribe(function (user) {
          if (user !== null && user !== undefined) {
            _this5.user = user;
            console.log(_this5.user);
          }
        });
        this.movieListResponseSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieListUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomsResponseSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomsUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomResponseSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomPauseUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomPlayUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.movieRoomSeekUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.chatMessagesReponseSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.chatMessageUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.commentsReponseSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.commentUpdateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
      }

      _createClass(WebSocketsService, [{
        key: "start",
        value: function start() {
          console.debug('Going to connect to the websockets server');
          this.connect(this.appConfigService.webSocketsServerUrl);
        }
      }, {
        key: "stop",
        value: function stop() {
          if (this.webSocket != null) {
            this.webSocket.close();
          }
        }
      }, {
        key: "subscribeToMovieListResponses",
        value: function subscribeToMovieListResponses(observer) {
          this.movieListResponseSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieListUpdates",
        value: function subscribeToMovieListUpdates(observer) {
          this.movieListUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomsResponses",
        value: function subscribeToMovieRoomsResponses(observer) {
          this.movieRoomsResponseSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomsUpdates",
        value: function subscribeToMovieRoomsUpdates(observer) {
          this.movieRoomsUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomResponses",
        value: function subscribeToMovieRoomResponses(observer) {
          this.movieRoomResponseSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomUpdates",
        value: function subscribeToMovieRoomUpdates(observer) {
          this.movieRoomUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomPauseUpdates",
        value: function subscribeToMovieRoomPauseUpdates(observer) {
          this.movieRoomPauseUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomPlayUpdates",
        value: function subscribeToMovieRoomPlayUpdates(observer) {
          this.movieRoomPlayUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieRoomSeekUpdates",
        value: function subscribeToMovieRoomSeekUpdates(observer) {
          this.movieRoomSeekUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToChatMessagesReponses",
        value: function subscribeToChatMessagesReponses(observer) {
          this.chatMessagesReponseSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToChatMessageUpdates",
        value: function subscribeToChatMessageUpdates(observer) {
          this.chatMessageUpdateSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieCommentsReponses",
        value: function subscribeToMovieCommentsReponses(observer) {
          this.commentsReponseSubject.subscribe(observer);
        }
      }, {
        key: "subscribeToMovieCommentUpdates",
        value: function subscribeToMovieCommentUpdates(observer) {
          this.commentUpdateSubject.subscribe(observer);
        }
      }, {
        key: "connect",
        value: function connect(url) {
          this.webSocket = new WebSocket(url);

          this.webSocket.onopen = function (messageEvent) {
            console.info('WebSocket connection has been opened: %o', messageEvent);
          }; // we need the "self" constant because we cannot use "this" inside the function below


          var self = this;

          this.webSocket.onmessage = function (messageEvent) {
            var jsonReceived = messageEvent.data;
            console.debug('WebSocket message received: %s', jsonReceived);
            self.authService.authState.subscribe(function (user) {
              if (user !== undefined && user !== null) {
                self.user = user;
                self.handleMessage(jsonReceived);
              }
            });
          };

          ;

          this.webSocket.onerror = function (messageEvent) {
            console.error('WebSocket error observed: %o', messageEvent);
          };

          this.webSocket.onclose = function (closeEvent) {
            console.info('WebSocket connection has been closed: %o', closeEvent);
          };
        }
      }, {
        key: "sendSaveUserRequest",
        value: function sendSaveUserRequest(user) {
          var request = new _entities_requests_saveUserRequest__WEBPACK_IMPORTED_MODULE_8__["SaveUserRequest"](user);
          var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].SAVE_USER_REQUEST, request);
          this.sendMessage(this.webSocket, message);
        }
      }, {
        key: "sendMovieListRequest",
        value: function sendMovieListRequest() {
          var request = new _entities_requests_movieListRequest__WEBPACK_IMPORTED_MODULE_5__["MovieListRequest"]();
          var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_LIST_REQUEST, request);
          this.sendMessage(this.webSocket, message);
        }
      }, {
        key: "sendMovieStreamRequest",
        value: function sendMovieStreamRequest() {
          var request = new _entities_requests_movieListRequest__WEBPACK_IMPORTED_MODULE_5__["MovieListRequest"]();
          var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_LIST_REQUEST, request);
          this.sendMessage(this.webSocket, message);
        }
      }, {
        key: "sendMovieRoomsRequest",
        value: function sendMovieRoomsRequest() {
          var _this6 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomsRequest__WEBPACK_IMPORTED_MODULE_7__["MovieRoomsRequest"](user.id);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOMS_REQUEST, request);

            _this6.sendMessage(_this6.webSocket, message);
          });
        }
      }, {
        key: "sendMovieRoomRequest",
        value: function sendMovieRoomRequest(movieId) {
          var _this7 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomRequest__WEBPACK_IMPORTED_MODULE_6__["MovieRoomRequest"](movieId, user.id);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_REQUEST, request);

            _this7.sendMessage(_this7.webSocket, message);
          });
        }
      }, {
        key: "sendMovieRoomWithIdRequest",
        value: function sendMovieRoomWithIdRequest(roomId) {
          var _this8 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomWithIdRequest__WEBPACK_IMPORTED_MODULE_9__["MovieRoomWithIdRequest"](roomId, user.id);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_WITH_ID_REQUEST, request);

            _this8.sendMessage(_this8.webSocket, message);
          });
        }
      }, {
        key: "sendPauseRequest",
        value: function sendPauseRequest(roomId, currentTime) {
          var _this9 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomPauseRequest__WEBPACK_IMPORTED_MODULE_10__["MovieRoomPauseRequest"](roomId, user.id, currentTime);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_PAUSE_REQUEST, request);

            _this9.sendMessage(_this9.webSocket, message);
          });
        }
      }, {
        key: "sendPlayRequest",
        value: function sendPlayRequest(roomId, currentTime) {
          var _this10 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomPlayRequest__WEBPACK_IMPORTED_MODULE_11__["MovieRoomPlayRequest"](roomId, user.id, currentTime);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_PLAY_REQUEST, request);

            _this10.sendMessage(_this10.webSocket, message);
          });
        }
      }, {
        key: "sendSeekRequest",
        value: function sendSeekRequest(roomId, currentTime) {
          var _this11 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_movieRoomSeekRequest__WEBPACK_IMPORTED_MODULE_12__["MovieRoomSeekRequest"](roomId, user.id, currentTime);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_SEEK_REQUEST, request);

            _this11.sendMessage(_this11.webSocket, message);
          });
        }
      }, {
        key: "sendChatMessagesRequest",
        value: function sendChatMessagesRequest(roomId) {
          var _this12 = this;

          this.authService.authState.subscribe(function (user) {
            var request = new _entities_requests_chatMessagesRequest__WEBPACK_IMPORTED_MODULE_14__["ChatMessagesRequest"](roomId, user.id);
            var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CHAT_MESSAGES_REQUEST, request);

            _this12.sendMessage(_this12.webSocket, message);
          });
        }
      }, {
        key: "sendChatMessageRequest",
        value: function sendChatMessageRequest(roomId, chatMessage) {
          var _this13 = this;

          this.authService.authState.subscribe(function (user) {
            if (user) {
              chatMessage.User = user;
              var request = new _entities_requests_sendChatMessageRequest__WEBPACK_IMPORTED_MODULE_13__["SendChatMessageRequest"](roomId, user.id, chatMessage);
              var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].SEND_CHAT_MESSAGE_REQUEST, request);

              _this13.sendMessage(_this13.webSocket, message);
            }
          });
        }
      }, {
        key: "sendMovieCommentsRequest",
        value: function sendMovieCommentsRequest(movieId) {
          var request = new _entities_requests_movieCommentsRequest__WEBPACK_IMPORTED_MODULE_15__["MovieCommentsRequest"](movieId);
          var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_COMMENTS_REQUEST, request);
          this.sendMessage(this.webSocket, message);
        }
      }, {
        key: "sendMovieCommentRequest",
        value: function sendMovieCommentRequest(movieId, comment) {
          var _this14 = this;

          this.authService.authState.subscribe(function (user) {
            if (user) {
              var request = new _entities_requests_sendMovieCommentRequest__WEBPACK_IMPORTED_MODULE_16__["SendMovieCommentRequest"](movieId, comment);
              var message = new _entities_messageWrapper__WEBPACK_IMPORTED_MODULE_3__["MessageWrapper"](_entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].SEND_MOVIE_COMMENT_REQUEST, request);

              _this14.sendMessage(_this14.webSocket, message);
            }
          });
        }
      }, {
        key: "waitForOpenConnection",
        value: function waitForOpenConnection(socket) {
          return new Promise(function (resolve, reject) {
            var maxNumberOfAttempts = 10;
            var intervalTime = 200; //ms

            var currentAttempt = 0;
            var interval = setInterval(function () {
              if (currentAttempt > maxNumberOfAttempts - 1) {
                clearInterval(interval);
                reject(new Error('Maximum number of attempts exceeded'));
              } else if (socket.readyState === socket.OPEN) {
                clearInterval(interval);
                resolve();
              }

              currentAttempt++;
            }, intervalTime);
          });
        }
      }, {
        key: "sendMessage",
        value: function sendMessage(socket, message) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(socket.readyState !== socket.OPEN)) {
                      _context.next = 10;
                      break;
                    }

                    _context.prev = 1;
                    _context.next = 4;
                    return this.waitForOpenConnection(socket);

                  case 4:
                    _context.next = 10;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](1);
                    console.error(_context.t0);
                    return _context.abrupt("return");

                  case 10:
                    socket.send(JSON.stringify(message));

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[1, 6]]);
          }));
        }
      }, {
        key: "handleMessage",
        value: function handleMessage(messageRecieved) {
          var messageWrapper = this.validateAndGetMessage(messageRecieved);

          switch (messageWrapper.type) {
            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_LIST_RESPONSE:
              var movies = [];

              try {
                movies = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Movie list reponse: Unable to deserialize Movie[] object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Movies message received: %o', movies);
              this.movieListResponseSubject.next(movies);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOMS_RESPONSE:
              var rooms;

              try {
                rooms = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Room reponse: Unable to deserialize MovieRoom object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Room received: %o', rooms);
              this.movieRoomsResponseSubject.next(rooms);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOMS_UPDATE:
              var roomsUpdated;

              try {
                roomsUpdated = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Room reponse: Unable to deserialize MovieRoom object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Room received: %o', roomsUpdated);
              this.movieRoomsUpdateSubject.next(roomsUpdated);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_RESPONSE:
              var room;

              try {
                room = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Room reponse: Unable to deserialize MovieRoom object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Room received: %o', room);
              this.movieRoomResponseSubject.next(room);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_UPDATE:
              var roomUpdated;

              try {
                roomUpdated = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Room update: Unable to deserialize MovieRoom object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Room received: %o', roomUpdated);
              this.movieRoomUpdateSubject.next(roomUpdated);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_PLAY_UPDATE:
              var roomActionPlay;

              try {
                roomActionPlay = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Play video: Unable to deserialize MovieRoomAction object: %s', messageWrapper.payload);
                return;
              }

              if (roomActionPlay.UserId === this.user.id) {
                return;
              }

              console.debug('Room received: %o', roomActionPlay.Room);
              this.movieRoomPlayUpdateSubject.next(roomActionPlay.Room);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_PAUSE_UPDATE:
              var roomActionPause;

              try {
                roomActionPause = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Pause video: Unable to deserialize MovieRoomAction object: %s', messageWrapper.payload);
                return;
              }

              if (roomActionPause.UserId === this.user.id) {
                return;
              }

              console.debug('Room received: %o', roomActionPause.Room);
              this.movieRoomPauseUpdateSubject.next(roomActionPause.Room);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_ROOM_SEEK_UPDATE:
              var roomActionSeek;

              try {
                roomActionSeek = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Seek video: Unable to deserialize MovieRoomAction object: %s', messageWrapper.payload);
                return;
              }

              if (roomActionSeek.UserId === this.user.id) {
                return;
              }

              console.debug('Room received: %o', roomActionSeek.Room);
              this.movieRoomSeekUpdateSubject.next(roomActionSeek.Room);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CHAT_MESSAGES_RESPONSE:
              var messages;

              try {
                messages = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Get chat messages response: Unable to deserialize ChatMessage[] object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Chat Message received: %o', messages);
              this.chatMessagesReponseSubject.next(messages);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CHAT_MESSAGE_UPDATE:
              var message;

              try {
                message = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Get chat message rupdate : Unable to deserialize ChatMessage object: %s', messageWrapper.payload);
                return;
              }

              if (message.User.id === this.user.id) {
                // if the message was sent by the current user, exit
                return;
              }

              console.debug('Chat Message received: %o', message);
              this.chatMessageUpdateSubject.next(message);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_COMMENTS_RESPONSE:
              var comments;

              try {
                comments = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Get movie comments response: Unable to deserialize MovieComment[] object: %s', messageWrapper.payload);
                return;
              }

              console.debug('Movie comments received: %o', comments);
              this.commentsReponseSubject.next(comments);
              break;

            case _entities_messageType__WEBPACK_IMPORTED_MODULE_4__["MessageType"].MOVIE_COMMENT_UPDATE:
              var comment;

              try {
                comment = JSON.parse(messageWrapper.payload);
              } catch (error) {
                console.error('Get movie comment update : Unable to deserialize MovieComment object: %s', messageWrapper.payload);
                return;
              }

              if (comment.User.id === this.user.id) {
                // if the message was sent by the current user, exit
                return;
              }

              console.debug('Chat Message received: %o', comment);
              this.commentUpdateSubject.next(comment);
              break;

            default:
              break;
          }
        }
      }, {
        key: "validateAndGetMessage",
        value: function validateAndGetMessage(messageReceived) {
          var messageWrapper;

          try {
            messageWrapper = JSON.parse(messageReceived);
          } catch (error) {
            console.error('Unable to parse received JSON string: %s\n%o', messageReceived, error);
            return;
          }

          if (!messageWrapper.hasOwnProperty('type') || !messageWrapper.hasOwnProperty('payload')) {
            console.error('Invalid message received, not the correct properties: %s', messageReceived);
            return;
          }

          return messageWrapper;
        }
      }]);

      return WebSocketsService;
    }();

    WebSocketsService.ɵfac = function WebSocketsService_Factory(t) {
      return new (t || WebSocketsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_appConfig_service__WEBPACK_IMPORTED_MODULE_17__["AppConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](angularx_social_login__WEBPACK_IMPORTED_MODULE_18__["AuthService"]));
    };

    WebSocketsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: WebSocketsService,
      factory: WebSocketsService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](WebSocketsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _appConfig_service__WEBPACK_IMPORTED_MODULE_17__["AppConfigService"]
        }, {
          type: angularx_social_login__WEBPACK_IMPORTED_MODULE_18__["AuthService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\_CodePersonal\Disertatie\videoStreamer\VideoStreamerUI\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map