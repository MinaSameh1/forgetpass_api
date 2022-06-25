import { FilterQuery, QueryOptions, QuerySelector } from "mongoose";
import TokenModel, { tokenDocuement } from "./token.model";

// Function overloads
// TODO Remove this ANY!
export function findToken(query: FilterQuery<tokenDocuement>, select?: QuerySelector<tokenDocuement>, options?: QueryOptions<tokenDocuement>): any
export function findToken(query: FilterQuery<tokenDocuement>): any
export function findToken(query: FilterQuery<tokenDocuement>, options?: QueryOptions<tokenDocuement>): any
export function findToken(query: string): any

export function findToken(
  query: FilterQuery<tokenDocuement> | string,
  select?: unknown,
  options?: unknown
) {
  let Select: QuerySelector<tokenDocuement> = {}
  let Options: QueryOptions<tokenDocuement> = {}
  if (select) {
    Select = select as QuerySelector<tokenDocuement>
    Options = options as QueryOptions<tokenDocuement>
    if (typeof query === "string") {
      return TokenModel.findOne({ token: query }, Select, Options || { lean: true })
    }
    else {
      return TokenModel.findOne(query, Select, Options || { lean: true })
    }
  } else {
    Options = options as QueryOptions<tokenDocuement>
    if (typeof query === "string") {
      return TokenModel.findOne({ token: query }, {}, Options || { lean: true })
    }
    else {
      return TokenModel.findOne(query, {}, Options || { lean: true })
    }
  }
}

export function createToken({
  uid,
  token
}: {
  uid: string,
  token: string
}) {
  return TokenModel.create({ token: token, uid: uid })
}