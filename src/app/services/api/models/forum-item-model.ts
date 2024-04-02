import { Role } from "../../../enums/roles.enum";

export interface ForumItemModel {
    postId?: number,
    userId?: string,
    topicIdFk?: number,
    role?: Role,
    firstName?: string,
    username?: string,
    message?: string,
    createdDate?: string,
    commentsCount?: number
}