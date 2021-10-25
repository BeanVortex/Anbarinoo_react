export const baseUrl = "http://localhost:8080";

export const loginUrl = "/api/user/login/";
export const signupUrl = "/api/user/signup/";
export const baseUserProfileImageUrl = baseUrl + "/user/profile_images/";
export const getUserInfoUrl = "/api/user/info/";

export const getByUser_CategoryUrl = "/api/category/user/";
export const save_CategoryUrl = "/api/category/save/";
export const getOrDeleteById_CategoryUrl = (id) => `/api/category/${id}/`;
export const save_SubCategoryUrl = (parentId) =>
  `/api/category/sub-category/save/${parentId}/`;

export const save_ProductUrl = "/api/category/products/save/";
export const getAllByUser_ProductUrl = "/api/category/products/user/";
export const search_ProductUrl = "/api/category/products/search/";
export const getOrDelete_ProductUrl = (id) => `/api/category/products/${id}/`;
export const update_ProductUrl = (id) => `/api/category/products/update/${id}/`;
export const updateDeleteImages_ProductUrl = (id) =>
  `/api/category/products/update/delete-images/${id}/`;
export const updateImages_ProductUrl = (id) =>
  `api/category/products/update/images/${id}/`;
