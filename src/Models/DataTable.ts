export default interface DataTable {
  title: string;
  field: string;
  type?:
    | 'string'
    | 'boolean'
    | 'numeric'
    | 'date'
    | 'datetime'
    | 'time'
    | 'currency';
  lookup?: Record<number, string>;
}
