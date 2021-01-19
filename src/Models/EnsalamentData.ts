export interface DataChildrenInterface {
  id: string;
  name: string;
  info: string;
}

export interface DataInterface {
  id: string;
  name: string;
  children?: DataChildrenInterface[];
}
