"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var posts_service_1 = require("../posts.service");
var PostListComponent = /** @class */ (function () {
    function PostListComponent(postsService) {
        this.postsService = postsService;
        // posts = [
        //   { title: "First Post", content: "This is the first post's content" },
        //   { title: "Second Post", content: "This is the second post's content" },
        //   { title: "Third Post", content: "This is the third post's content" }
        // ];
        this.posts = [];
        this.isLoading = false;
    }
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe(function (posts) {
            _this.isLoading = false;
            _this.posts = posts;
        });
    };
    PostListComponent.prototype.onDelete = function (postId) {
        this.postsService.deletePost(postId);
    };
    PostListComponent.prototype.ngOnDestroy = function () {
        this.postsSub.unsubscribe();
    };
    PostListComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-post-list",
            templateUrl: "./post-list.component.html",
            styleUrls: ["./post-list.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [posts_service_1.PostsService])
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
//# sourceMappingURL=post-list.component.js.map