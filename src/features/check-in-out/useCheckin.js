import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // mutation function only receive 1 argument
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    //   it access the mutation fn's data
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked in`);

      //   The { active: true } option means that only active queries (queries that are currently being used by at least one component on the screen) will be invalidated.
      queryClient.invalidateQueries({ active: true });

      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in.");
    },
  });

  return { checkin, isCheckingIn };
}
