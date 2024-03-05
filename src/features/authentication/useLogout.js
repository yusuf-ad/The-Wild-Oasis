import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queyrClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,

    onSuccess: () => {
      queyrClient.removeQueries();

      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
