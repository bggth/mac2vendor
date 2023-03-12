import MacDB from "./macdb.js"

function main() {
    let db = new MacDB();
    db.loadFromFile('oui.csv')
}

main()
