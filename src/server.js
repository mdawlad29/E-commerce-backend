const app = require("./app");
const mongoDBConnect = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, async () => {
  console.log(`E-commerce app listening on port ${serverPort}`);
  await mongoDBConnect();
});
