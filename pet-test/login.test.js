test("Login correct credentials", async () => {
  let res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  expect(res).toContain("token");
  let token = res.token;
  expect(token).toBeTruthy();
});
