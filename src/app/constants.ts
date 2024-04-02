export const BASE_URL = 'http://localhost:8010';

export const LOCAL_STORAGE_KEY = 'token';
export const LOCAL_STORAGE_USER_DATA_KEY = 'userData';

/* register */
export const SIGNUP_URL = BASE_URL + '/register/signup';
export const LOGIN_URL = BASE_URL + '/register/login';

/* get user by id */
export const GET_USER_BY_USERNAME_URL = BASE_URL + '/register/user';

/* forum post */
export const CREATE_POST_URL = BASE_URL + '/post/create';
export const DELETE_POST_URL = BASE_URL + '/post/delete';
export const ALL_POSTS_URL = BASE_URL + '/post/all';
export const NAV_BAR_URL = BASE_URL + '/post/nav_item';
export const NAV_BAR_CREATE_ITEM_URL = BASE_URL + '/post/nav_item/create';

/* forum comment */
export const CREATE_COMMENT_URL = BASE_URL + '/comment/create';
export const DELETE_COMMENT_URL = BASE_URL + '/comment/delete';
export const ALL_COMMENTS_BY_ID_URL = BASE_URL + '/comment';
