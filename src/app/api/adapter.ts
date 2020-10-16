export interface Adapter<T> {
  adapt(item: any): T;
}

export function adaptList(adapter) {
  return (data: any[]) => data.map(item => adapter.adapt(item));
}

