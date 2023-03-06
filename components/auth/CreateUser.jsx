import toast from "react-hot-toast";

export async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  toast.dismiss();
  toast.success("Success!", { duration: 1500 });
  const data = await response.json();

  if (!response.ok) {
    toast.dismiss();
    toast.error(data.message, { duration: 4000 });
    throw new Error(data.message || "Creating user failed");
  }

  return data;
}
