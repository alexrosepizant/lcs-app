import Comment from "../../../factory/model/comment"
import CommentFactory from "../../../factory/api/comment"
import CommentCtrl from "./commentCtrl"
import lcsComment from "./lcsComment"

// Create the module where our functionality can attach to
const commentModule = angular.module("app.comment", [])
commentModule.factory("Comment", Comment)
commentModule.factory("CommentFactory", CommentFactory)
commentModule.controller("CommentCtrl", CommentCtrl)
commentModule.directive("lcsComment", lcsComment)

export default commentModule
