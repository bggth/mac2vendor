import * as readline from 'node:readline/promises';
import * as fs from 'fs';

export default class MacDB {
	constructor() {
		this.db = [];
	}

	loadFromFile(filename) {
		let readInterface = readline.createInterface({
			input: fs.createReadStream(filename)
		})

		readInterface.on('line', (line) => {
			let assign = line.substring(5, 11)
			let organization = line.substring(12)
			let record = new Record(assign, organization);
			this.db.push(record);
		})
	}
}

class Record {
	constructor(assign, organization) {
		this.assign = assign;
		this.organization = organization
	}
}
