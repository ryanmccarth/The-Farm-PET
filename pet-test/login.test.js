test("Login correct credentials", async () => {
  let res = await fetch("http://api:3001/api/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Reed_Fischer@bluellamaconsultingco.com",
      password: "fischerre",
    }),
  });
  expect(res).toContain("token");
  let token = res.token;
  expect(token).toBeTruthy();
});
