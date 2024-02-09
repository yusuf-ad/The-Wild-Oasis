import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // !  this function needs to return a promise
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
