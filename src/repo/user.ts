import apiHelper, { END_POINTS } from "@/lib/api-helper";
import { APIResponse } from "@/types/app";
import { IUser, IUserCreate } from "@/types/user";

export async function createUser(user: IUserCreate) {
  const res = await apiHelper.post<APIResponse<IUser>, IUserCreate>(
    END_POINTS.CREATE_USER,
    user
  );
  return res.data;
}

export async function getUserById(id: string) {
  const res = await apiHelper.get<APIResponse<IUser>>(
    END_POINTS.GET_USER_BY_ID(id)
  );
  return res.data;
}

export async function getUserProfile() {
  const res = await apiHelper.get<APIResponse<IUser>>(
    END_POINTS.GET_USER_PROFILE
  );
  return res.data;
}

export async function updateUser(
  id: string,
  user: Omit<IUserCreate, "password" | "email">
) {
  const res = await apiHelper.update<
    APIResponse<IUser>,
    Omit<IUserCreate, "password" | "email">
  >(END_POINTS.UPDATE_USER(id), user);
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await apiHelper.delete<APIResponse<IUser>>(
    END_POINTS.DELETE_USER(id)
  );
  return res.data;
}
