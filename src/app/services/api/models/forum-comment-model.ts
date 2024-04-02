import { Role } from "../../../enums/roles.enum";

export interface ForumCommentModel {
    postId?: Number,
    userId?: Number,
    role?: Role,
    message?: string,
    firstName?: string,
    username?: string,
    /* requset */
    commentId?: Number,
    createdDate?: string
}