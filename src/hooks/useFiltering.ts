import { useState } from "react";

interface Filter<T> {
  name: string;
  value: string;
  condition: (item: T, value: string) => boolean;
}

const useFiltering = <T>(filters: Filter<T>[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    return filters.map((f) => ({ name: f.name, value: f.value }));
  });

  const filteringConditions = filters.map((f) => f.condition);

  const filterFunction = (collection: T[]): T[] =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item: T) => {
        return conditionFn(item, filterValues[index].value);
      });
    }, collection);

  return { filterValues, setFilterValues, filterFunction };
};

export default useFiltering;
