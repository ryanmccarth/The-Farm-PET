const fetch = require("node-fetch");

test("Login correct credentials", async () => {
  jest.setTimeout(10000);
  await sleep(5000);
  let res = await loginFetch(
    "Reed_Fischer@bluellamaconsultingco.com",
    "fischerre"
  );
  await sleep(1000);
  while (res.status !== 200) {
    let res = await loginFetch(
      "Reed_Fischer@bluellamaconsultingco.com",
      "fischerre"
    );
    await sleep(1000);
    console.log(res.status);
  }
  await sleep(1000);
  let body = await res.json();
  let token = body.token;
  expect(token).toBeTruthy();
});

// Helper functions ----------------------------------------------

async function sleep(timeMs) {
  await new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
  return;
}

async function loginFetch(username, password) {
  return await fetch("http://api:3001/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
}
