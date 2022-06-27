import { FilterQuery, QueryOptions, QuerySelector, Query, LeanDocument, Types, Document } from "mongoose";
import TokenModel, { tokenDocuement } from "./token.model";

type HasLean<
  Doc extends Document,
  O extends QueryOptions<Doc> | unknown
> = O extends QueryOptions<Doc>
  ? O["lean"] extends false
    ? false
    : true
  : true;

type FindResult<
  T extends Document,
  Opts extends QueryOptions<T> | unknown = undefined,
  // Need to kinda toggle this type condition
  Doc = HasLean<T, Opts> extends true ? LeanDocument<T> : T
> = Query<
  | (Doc & {
      _id: Types.ObjectId;
    })
  | null,
  Doc & {
    _id: Types.ObjectId;
  }
>

// Function overloads
export function findToken(query: FilterQuery<tokenDocuement>, select?: QuerySelector<tokenDocuement>, options?: QueryOptions<tokenDocuement>): FindResult<tokenDocuement>
export function findToken(query: FilterQuery<tokenDocuement>): FindResult<tokenDocuement>
export function findToken(query: FilterQuery<tokenDocuement>, options?: QueryOptions<tokenDocuement>): FindResult<tokenDocuement>
export function findToken(query: string): FindResult<tokenDocuement>

export function findToken(
  query: FilterQuery<tokenDocuement> | string,
  select?: unknown,
  options?: unknown
): FindResult<tokenDocuement> {
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