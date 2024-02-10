import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Setting succesfully edited");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      //   reset(getValues());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateSetting };
}
