import { QueryOptions } from "mongoose";
import { string } from "zod";
import TokenModel from "./token.model";

export function findToken(uid: string, options: QueryOptions = { lean: true }) {
  return TokenModel.findOne({ uid: uid }, {}, options)
}

export function createToken({
  uid,
  token
}: {
  uid:string,
  token: string
}) {
  return TokenModel.create({ token: token, uid: uid })
}