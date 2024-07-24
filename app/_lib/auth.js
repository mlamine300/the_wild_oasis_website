import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
//auth?.user.name === "mohamed lamine laoufi2"
function checkAuthorization(auth, request) {
  switch (request.nextUrl.pathname) {
    case "/cabins":
      return true;
    case "/account":
      return String(auth?.user?.name).includes("lamine");

    default:
      return false;
  }
}
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return checkAuthorization(auth, request);
    },
    async signIn({ user }) {
      // console.log("user 0000000");
      // console.log(user);
      // console.log("acount 0000000");
      // console.log(account);
      // console.log("profile 0000000");
      // console.log(profile);
      // console.log("0000000 :" + email);
      // console.log("0000000 :" + credentials);

      try {
        const guest = await getGuest(user.email);

        try {
          if (!guest) {
            await createGuest({ email: user.email, fullName: user.name });
          }
        } catch (error) {
          console.error(error);
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
