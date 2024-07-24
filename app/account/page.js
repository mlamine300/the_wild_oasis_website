import { auth } from "../_lib/auth";

export const metadata = { title: "account" };
export default async function Page() {
  const session = await auth();
  console.log(session);
  const firstName = String(session?.user?.name).split(" ").at(0);
  return (
    <div>
      <h1>Welcome {firstName}</h1>
    </div>
  );
}
