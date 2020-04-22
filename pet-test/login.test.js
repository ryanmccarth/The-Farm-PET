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
  });
  console.log(res + "\n");
  let resJson = res.json();
  let token = resJson.token;
  expect(token).toBeTruthy();
});
