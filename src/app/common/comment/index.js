import Comment from "../../model/comment"
import CommentCtrl from "./commentCtrl"
import lcsComment from "./lcsComment"

// Create the module where our functionality can attach to
const commentModule = angular.module("app.comment", [])
commentModule.factory("Comment", Comment)
commentModule.controller("CommentCtrl", CommentCtrl)
commentModule.directive("lcsComment", lcsComment)

export default commentModule
