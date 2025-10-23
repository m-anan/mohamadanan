export default async function login(credentials: {
  username: string;
  password: string;
}) {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username, // Using the email field as the username
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}
