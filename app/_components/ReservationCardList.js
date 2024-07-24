"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
function ReservationCardList({ bookings }) {
  const [optimisticBookings, optimisticDeleteAction] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((b) => b.id != bookingId);
    }
  );
  const handleDelete = (bookingId) => {
    optimisticDeleteAction(bookingId);
    deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
export default ReservationCardList;
