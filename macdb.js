import * as readline from 'readline';
import * as fs from 'fs';

export default class MacDB {
	constructor() {
		this.db = [];
	}

	async loadFromFile(filename) {

		let promise = new Promise((resolve, reject) => {
			let readInterface = readline.createInterface({
				input: fs.createReadStream(filename)
			})
	
			readInterface.on('line', (line) => {
				let assign = line.substring(5, 11)
				let organization = line.substring(12)
				let record = new Record(assign, organization);
				this.db.push(record);
				//console.log(assign);
			})

			readInterface.on('close', () => {
				resolve();
			})
		})

		await promise;
	}

	searchByAssign(assign) {
		let result = null;

		for (let i = 0; i < this.db.length; i++) {
			if (this.db[i].assign == assign)
				return this.db[i];
		}

		return result;
	}
}

class Record {
	constructor(assign, organization) {
		this.assign = assign;
		this.organization = organization
	}
}
