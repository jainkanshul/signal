"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var post_list_component_1 = require("./posts/post-list/post-list.component");
var post_create_component_1 = require("./posts/post-create/post-create.component");
var routes = [
    { path: '', component: post_list_component_1.PostListComponent },
    { path: 'create', component: post_create_component_1.PostCreateComponent },
    { path: 'edit/:postId', component: post_create_component_1.PostCreateComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map