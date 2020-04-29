const fetch = require("node-fetch");

test("Login correct credentials", async () => {
  jest.setTimeout(30000);
  await new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });
  let res = await fetch("api:3001/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Reed_Fischer@bluellamaconsultingco.com",
      password: "fischerre",
    }),
  }).json();
  console.log(res + "\n");
  let token = res.token;
  expect(token).toBeTruthy();
});
