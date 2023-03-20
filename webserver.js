import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

export default class Webserver {
	constructor(db) {
		this.host = '0.0.0.0';
		this.port = 3000;
		this.db = db;
	}

	start() {
		this.server = http.createServer((req, res) => {
			let statusCode = 404;
			let resultData = '404\n';
			let __dirname = path.resolve();
			if (req.method == 'POST') {

				let body = '';
				req.on('data', (data) => {
					body += data;
				})

				req.on('end', () => {
					if (req.url == '/mac') {
						let args = JSON.parse(body);
						//console.log(args.assigns)
						if (args.assigns != null) {
							let result = this.db.searchByAssign(args.assigns)
							if (result != null) {
								statusCode = 200
								resultData = JSON.stringify(result);
								//console.log('ok', resultData)
							}
							res.statusCode = statusCode;
							res.setHeader('Content-Type', 'text/plain');
							res.end(resultData);
						}
					} else {
						res.statusCode = statusCode;
						res.setHeader('Content-Type', 'text/plain');
						res.end(resultData);
					}
				})
			} else if(req.method == 'GET') {
				let whiteListUrls = ['/', '/index.html', '/styles.css', '/main.js'];
				console.log(req.url, __dirname + '/static' + req.url)
				if (whiteListUrls.includes(req.url)) {
					let fileName = req.url;
					if (req.url == '/') 
						fileName = '/index.html';	
	
					fs.readFile(__dirname + '/static' + fileName, (err, data) => {
						console.log(data)
						if (err) {
							console.log('err', err)
						} else {
							console.log(data)
							statusCode = 200;
							resultData = data;
							res.statusCode = statusCode;
							//res.setHeader('Content-Type', 'text/html');
							res.end(resultData);
						}
					});

				} else {
					res.statusCode = statusCode;
					res.setHeader('Content-Type', 'text/plain');
					res.end(resultData);
				}

			} else {
				res.statusCode = statusCode;
				res.setHeader('Content-Type', 'text/plain');
				res.end(resultData);
			}
		});

		this.server.listen(this.port, this.host, () => {
			console.log('server started');
		})
	}
}