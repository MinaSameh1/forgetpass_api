import { FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "./user.model";

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }

){
  return UserModel.find(query, {}, options)
}

export async function findOneUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }

){
  return UserModel.findOne(query, {}, options)
}

