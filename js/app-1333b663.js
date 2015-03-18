/**
 * getPix - An app use to search pictures in flickr using javascript stacks.
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.dashboard","app.detail","app.layout"])}(),function(t){"use strict";t.module("blocks.exception",["blocks.logger"])}(angular),function(t){"use strict";t.module("blocks.logger",[])}(angular),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","angular-storage"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.data","ng-isotope"])}(),function(){"use strict";angular.module("app.data",["app.core"]).constant("API_CONFIG",{URL:"https://api.flickr.com/services/rest/",KEY:"1ae573065e51e6cc93f8313699226a02"})}(),function(){"use strict";angular.module("app.detail",["app.core","app.data"])}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),function(){"use strict";function t(){this.config={appErrorPrefix:void 0},this.configure=function(t){this.config.appErrorPrefix=t},this.$get=function(){return{config:this.config}}}function e(t){t.decorator("$exceptionHandler",a)}function a(t,e,a){return function(o,r){var i=e.config.appErrorPrefix||"",n={exception:o,cause:r};o.message=i+o.message,t(o,r),a.error(o.message,n)}}angular.module("blocks.exception").provider("exceptionHandler",t).config(e),e.$inject=["$provide"],a.$inject=["$delegate","exceptionHandler","logger"]}(),function(t){"use strict";function e(t){function e(e){return function(a){t.error(e,a)}}var a={catcher:e};return a}e.$inject=["logger"],t.module("blocks.exception").factory("exception",e)}(angular),function(t){"use strict";function e(t,e){function a(a,o,r){e.error(a,r),t.error("Error: "+a,o)}function o(a,o,r){e.info(a,r),t.info("Info: "+a,o)}function r(a,o,r){e.success(a,r),t.info("Success: "+a,o)}function i(a,o,r){e.warning(a,r),t.warn("Warning: "+a,o)}var n={showToasts:!0,error:a,info:o,success:r,warning:i,log:t.log};return n}e.$inject=["$log","toastr"],t.module("blocks.logger").factory("logger",e)}(angular),function(){"use strict";function t(t,e,a){function o(t,o,i,n){function s(t,o){t.forEach(function(t){t.config.resolve=angular.extend(t.config.resolve||{},r.resolveAlways),e.state(t.state,t.config)}),o&&!g&&(g=!0,a.otherwise(o))}function c(){o.$on("$stateChangeError",function(e,a,o,r,i,s){if(!p){f.errors++,p=!0;var c=a&&(a.title||a.name||a.loadedTemplateUrl)||"unknown target",l="Error routing to "+c+". "+(s.data||"")+". <br/>"+(s.statusText||"")+": "+(s.status||"");n.warning(l,[a]),t.path("/")}})}function l(){c(),d()}function u(){return i.get()}function d(){o.$on("$stateChangeSuccess",function(t,e){f.changes++,p=!1;var a=r.docTitle+" "+(e.title||"");o.title=a})}var p=!1,g=!1,f={errors:0,changes:0},h={configureStates:s,getStates:u,stateCounts:f};return l(),h}var r={docTitle:void 0,resolveAlways:{}};t.html5Mode(!0),this.configure=function(t){angular.extend(r,t)},this.$get=o,o.$inject=["$location","$rootScope","$state","logger"]}t.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"],angular.module("blocks.router").provider("routerHelper",t)}(angular),function(){"use strict";function t(t){t.options.timeOut=4e3,t.options.positionClass="toast-bottom-right"}function e(t,e,a){t.debugEnabled&&t.debugEnabled(!0),a.configure(o.appErrorPrefix),e.configure({docTitle:o.appTitle+": "})}t.$inject=["toastr"],e.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"];var a=angular.module("app.core");a.config(t);var o={appErrorPrefix:"[client Error] ",appTitle:"getPix"};a.value("config",o),a.config(e)}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t){var a="/404";t.configureStates(e(),a)}function e(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}t.$inject=["routerHelper"],angular.module("app.core").run(t)}(),function(){"use strict";function t(t,e,a){function o(t,e){a.searchFlickr(t,e).then(function(t){n.photos=t.photos.photo,n.page=t.photos.page,n.pages=t.photos.pages,n.total=t.photos.total,r()})["catch"](i)}function r(){var t=[];n.page>1&&t.push({text:"<<",number:n.page-1,current:!1});for(var e=1;e<=n.pages;e++)e===n.page?1===n.page&&t.push({text:n.page,number:n.page,current:!0}):e>=n.page-4&&e<n.page+4&&t.push({text:e,number:e,current:!0});n.page<n.pages&&t.push({text:">>",number:n.page+1,current:!1}),n.pageNav=t}function i(){var a="Error in fetching data";return e.error(a),t.reject(a)}var n=this;n.photos=[],n.currentPhoto=null,n.pageNav=[],n.text="",n.title="Dashboard",n.searchFlickr=o,n.paginator=r,o()}t.$inject=["$q","logger","FlickrService"],angular.module("app.dashboard").controller("DashboardController",t)}(),function(){"use strict";function t(){return[{state:"dashboard",config:{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"dashboard",title:"dashboard"}}]}function e(e){e.configureStates(t())}e.$inject=["routerHelper"],angular.module("app.dashboard").run(e)}(),function(){"use strict";function t(t,e,a){function o(a,o){a=a||"";var r=e.defer(),n={api_key:i.API_KEY,per_page:i.perPage,format:"json",nojsoncallback:1,page:null!==o&&o>0?o:1,method:null!==a&&a.length>0?"flickr.photos.search":"flickr.photos.getRecent"};return null!==a&&a.length>0&&(n.text=a),t.get(i.API_URL,{params:n}).success(function(t){r.resolve(t)}).error(function(){r.reject(status)}),r.promise}function r(a){var o=e.defer(),r={api_key:i.API_KEY,photo_id:a,format:"json",nojsoncallback:1,method:"flickr.photos.getInfo"};return t.get(i.API_URL,{params:r}).success(function(t){o.resolve(t.photo)}).error(function(){o.reject(status)}),o.promise}var i=this;i.perPage=10,i.API_KEY=a.KEY,i.API_URL=a.URL;var n={searchFlickr:o,getPhotoDetail:r};return n}t.$inject=["$http","$q","API_CONFIG","$state"],angular.module("app.data").factory("FlickrService",t)}(),function(){"use strict";function t(t,e,a,o){function r(t){a.getPhotoDetail(t).then(function(t){i.photoSrc="http://farm"+t.farm+".static.flickr.com/"+t.server+"/"+t.id+"_"+t.secret+"_b.jpg",i.title=t.title._content,i.posted=t.dates.posted,i.owner=t.owner.username,i.nsid=t.owner.nsid,i.comments=t.comments._content,i.views=t.views})}var i=this;r(o.photoId)}t.$inject=["$q","logger","FlickrService","$stateParams"],angular.module("app.detail").controller("DetailController",t)}(),function(){"use strict";function t(){return[{state:"detail",config:{url:"/photo/:photoId",templateUrl:"app/detail/detail.html",controller:"DetailController",controllerAs:"detail",title:"detail"}}]}function e(e){e.configureStates(t())}e.$inject=["routerHelper"],angular.module("app.detail").run(e)}(),function(){"use strict";function t(t,e,a,o){function r(){o.success(a.appTitle+" loaded!",null)}r()}t.$inject=["$rootScope","$timeout","config","logger"],angular.module("app.layout").controller("LayoutController",t)}(),angular.module("app.core").run(["$templateCache",function(t){t.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header="" title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/dashboard/dashboard.html",'<section id=dashboard-view><div class=container><div class=row><h1 class=text-center>Search thousands of images at your own taste.</h1></div><div class="row col-md-12 text-center"><form role=search class="form-inline search-form" ng-submit="dashboard.searchFlickr( searchText )"><div class="input-group input-group-lg"><input type=search class="form-control search-field" ng-model=searchText placeholder=Search...> <span class=input-group-btn><button type=submit class="btn btn-default search-submit"><i class="fa fa-search"></i></button></span></div></form></div><div class=clearfix></div><hr><div class="row col-md-12"><ul class=breadcrumb><li ng-repeat="pageNav in dashboard.pageNav"><a href ng-click="dashboard.searchFlickr( searchText, pageNav.number )">{{ pageNav.text }}</a></li><span class="pages pull-right">Page {{dashboard.page}} of {{dashboard.pages}}</span></ul></div><div ui-view=""></div><div class=gallery><div ng-show=loading><img src=images/loader.gif></div><div class="col-lg-3 col-md-3 col-xs-6 col-center image-holder" ng-repeat="photo in dashboard.photos"><a class=thumbnail ui-sref="detail({photoId: \'{{photo.id}}\'})"><img class="thumb img-thumbnail img-responsive" ng-src=http://farm{{photo.farm}}.static.flickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}_b.jpg></a></div></div></div></section>'),t.put("app/detail/detail.html",'<div class=container><div class="panel panel-default"><div class=panel-body><div class=row><div class=col-xs-6><img ng-src={{detail.photoSrc}} class=img-responsive></div><div class=col-xs-6><div class=caption><h5><a href=https://www.flickr.com/photos/{{detail.nsid}} target=_blank>by: {{detail.owner}}</a></h5><h6 class=text-muted>Posted: <i class="fa fa-clock-o"></i> {{detail.posted * 1000 | date:\'short\'}}</h6><p>{{detail.title}}</p></div></div></div><div class=row><div class=col-xs-12><h5><i class="fa fa-eye"></i> {{detail.views}} view(s)</h5><hr class=soften><ul class=media-list><i class="fa fa-comments text-primary"></i> {{detail.comments}} Comment(s)</ul></div></div></div></div></div>'),t.put("app/layout/layout.html",'<div ng-controller="LayoutController as layout"><header class=clearfix><div ng-include="\'app/layout/top-nav.html\'"></div></header><section id=content class=container><div ui-view="" class=shuffle-animation></div></section></div>'),t.put("app/layout/top-nav.html",'<div class="navbar navbar-default navbar-static-top"><div class=container><ul class="nav navbar-nav"><a href=# class=navbar-brand><i class="fa fa-picture-o fa-2x"></i> getPix</a><li><a ui-sref=dashboard>Home</a></li></ul></div></div>')}]);