import { redirect } from "next/navigation";

// El middleware normalmente redirige "/" a "/es" o "/en" antes de llegar aquí.
export default function RootIndex() {
  redirect("/es");
}
