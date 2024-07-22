// app/auth/error/page.tsx
import { redirect } from "next/navigation";

export default function ErrorPage({ searchParams }) {
  const error = searchParams.error;
  console.log("error-=-=", error);
  if (error === "Callback") {
    redirect("/");
  }

  return (
    <div>
      <p>There was an error during authentication.</p>
    </div>
  );
}
