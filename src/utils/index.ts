import { ISortingParams } from "../interface"

export const parseSortingParams = (sortingParams: string | null): ISortingParams[] => {
    if (sortingParams) {
      return sortingParams.split(",").map((param) => {
        const [id, desc] = param.split(":");
        return { id, desc: desc === "desc" };
      });
    }
    return [];
  };