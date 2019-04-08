"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var PostsService = /** @class */ (function () {
    function PostsService(http, router) {
        this.http = http;
        this.router = router;
        this.posts = [];
        this.postsUpdated = new rxjs_1.Subject();
    }
    PostsService.prototype.getPosts = function () {
        var _this = this;
        this.http
            .get("http://localhost:3000/api/posts")
            .pipe(operators_1.map(function (postData) {
            return postData.posts.map(function (post) {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
            .subscribe(function (transformedPosts) {
            _this.posts = transformedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    PostsService.prototype.getPostUpdateListener = function () {
        return this.postsUpdated.asObservable();
    };
    PostsService.prototype.getPost = function (id) {
        return this.http.get("http://localhost:3000/api/posts/" + id);
    };
    PostsService.prototype.addPost = function (title, content) {
        var _this = this;
        var post = { id: null, title: title, content: content };
        this.http
            .post("http://localhost:3000/api/posts", post)
            .subscribe(function (responseData) {
            var id = responseData.postId;
            post.id = id;
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
            _this.router.navigate(["/"]);
        });
    };
    PostsService.prototype.updatePost = function (id, title, content) {
        var _this = this;
        var post = { id: id, title: title, content: content };
        this.http
            .put("http://localhost:3000/api/posts/" + id, post)
            .subscribe(function (response) {
            var updatedPosts = _this.posts.slice();
            var oldPostIndex = updatedPosts.findIndex(function (p) { return p.id === post.id; });
            updatedPosts[oldPostIndex] = post;
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
            _this.router.navigate(["/"]);
        });
    };
    PostsService.prototype.deletePost = function (postId) {
        var _this = this;
        this.http
            .delete("http://localhost:3000/api/posts/" + postId)
            .subscribe(function () {
            var updatedPosts = _this.posts.filter(function (post) { return post.id !== postId; });
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    PostsService = tslib_1.__decorate([
        core_1.Injectable({ providedIn: "root" }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient, router_1.Router])
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map