export type SearchQueryType = {
  startDay: string,
  endDay: string,
};

export type GetListPayloadType = {
  username: string,
  startDay: string,
  endDay: string,
};

export type DutyListType = {
  id: number,
  name: string,
  Mon: string[],
  Tue: string[],
  Wed: string[],
  Thu: string[],
  Fri: string[],
  Sat: string[],
  Sun: string[],
  maintain: string[],
  maintain_afternoon: string[],
};

export type DutyDataType = {
  content: string,
  date: string,
  isDuty: boolean,
};

export type GroupMemberType = {
  id: number
  name: string
};

export type PayloadType = {
  method: string,
  headers?: Record<string, any>,
  body?: string,
};

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type GenerateCsvPayloadType = {
  startDay: string,
  endDay: string,
  maintain: string[],
};
