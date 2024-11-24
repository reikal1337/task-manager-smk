const sqlite = require("sqlite");

async function setup() {
  const db = await sqlite.open({
    filename: "db.dev",
  });
  await db.migrate({ force: "last" });
}
