import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    // return edilen dataya ulaşıyoruz
    onSuccess: (id) => {
      toast.success(`Booking #${id} successfully deleted`);

      queryClient.invalidateQueries({ queryKey: "bookings" });
    },

    onError: () => {
      toast.error("There was an error while deleting booking.");
    },
  });

  return { deleteBooking, isDeletingBooking };
}
