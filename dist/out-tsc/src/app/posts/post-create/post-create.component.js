"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var posts_service_1 = require("../posts.service");
var PostCreateComponent = /** @class */ (function () {
    function PostCreateComponent(postsService, route) {
        this.postsService = postsService;
        this.route = route;
        this.enteredTitle = "";
        this.enteredContent = "";
        this.isLoading = false;
        this.mode = "create";
    }
    PostCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has("postId")) {
                _this.mode = "edit";
                _this.postId = paramMap.get("postId");
                _this.isLoading = true;
                _this.postsService.getPost(_this.postId).subscribe(function (postData) {
                    _this.isLoading = false;
                    _this.post = { id: postData._id, title: postData.title, content: postData.content };
                });
            }
            else {
                _this.mode = "create";
                _this.postId = null;
            }
        });
    };
    PostCreateComponent.prototype.onSavePost = function (form) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === "create") {
            this.postsService.addPost(form.value.title, form.value.content);
        }
        else {
            this.postsService.updatePost(this.postId, form.value.title, form.value.content);
        }
        form.resetForm();
    };
    PostCreateComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-post-create",
            templateUrl: "./post-create.component.html",
            styleUrls: ["./post-create.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [posts_service_1.PostsService,
            router_1.ActivatedRoute])
    ], PostCreateComponent);
    return PostCreateComponent;
}());
exports.PostCreateComponent = PostCreateComponent;
//# sourceMappingURL=post-create.component.js.map