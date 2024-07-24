"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings, getGuest } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function CreateBooking(booking, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged to do this action");

  const bookingToCreate = {
    ...booking,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakFast: false,
    isPaid: false,
    guestId: session.user.guestId,
  };

  const { error } = await supabase.from("booking").insert([bookingToCreate]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${booking.cabinId}`);

  redirect("/cabins/thankyou");

  //		extrasPrice		status	hasBreakFast	isPaid

  console.log(bookingToCreate);
}
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged to do this action");
  const x = formData.get("nationality");
  const [nationality, countryFlag] = String(x).split("%");
  const nationalID = formData.get("nationalID");
  const updatedGuest = { nationality, nationalID, countryFlag };
  const { error } = await supabase
    .from("guest")
    .update(updatedGuest)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  const bookingList = await getBookings(session.user.guestId);

  if (!bookingList.map((c) => c.id).includes(bookingId)) {
    throw new Error("you don't have the permission for this action");
  }
  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("http://localhost:3000/account/reservations");
}

export async function updateReservation(formData) {
  const observations = formData.get("observations");
  const numGuests = formData.get("numGuests");
  const id = formData.get("id");
  const updatedFields = { id, numGuests, observations };
  const session = await auth();
  const bookingList = await getBookings(session.user.guestId);
  if (!bookingList.map((b) => b.id + "").includes(id + "")) {
    console.log("id====================>" + id);
    console.log(bookingList.map((b) => b.id));
    throw new Error("you don't have permission");
  }

  const { error } = await supabase
    .from("booking")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("http://localhost:3000/account/reservations");
  revalidatePath(`http://localhost:3000/account/reservations/edit/${id}`);
  redirect("http://localhost:3000/account/reservations");
}
