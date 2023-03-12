import MacDB from "./macdb.js"
import Webserver from "./webserver.js";

async function main() {
    let db = new MacDB();
    await db.loadFromFile('oui.csv')
    let webserver = new Webserver(db);
    webserver.start();
}
await main()
