import * as http from 'http'

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