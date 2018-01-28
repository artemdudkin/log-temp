const querystring = require('querystring');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data/db.json')
const db = low(adapter)



const MARKS = ['200iwi'];

function log2(req, cb){
	const qs = querystring.parse( req.url.split('?')[1]);

//	console.log("qs", qs);
			
	var ret = {resultCode:-2, err:"Unknown error"};
	if (MARKS.indexOf(qs.source)!=-1) {
		if (!db.get(qs.source).value()) {
			db.set(qs.source, []).write();
		}

		db.get(qs.source)
		  .push({ time: Date.now(), data:qs.data.split(';')})
		  .write();

		const count = db.get(qs.source).value().length;

		ret = {resultCode:0, count:count};    	    
	} else {
		ret = {resultCode:-1, err:"Unknown source"};
	}
	cb(ret);
}

function get2(req, cb){
	const qs = querystring.parse( req.url.split('?')[1]);
	const source = qs.source;
        
        var now = new Date();
        var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const data = (db.get(source).value() || []).filter(_=>{return _.time > startOfDay})
	const ret = {source:source, data:data || []}
	cb(ret);
}

//log2({url:"https://www.google.ru/search?source=1200iwi&data=b;c"}, (x)=>{console.log("log>>", x)})
//get2({url:"https://www.google.ru/search?source=1200iwi&data=b;c"}, (x)=>{console.log("get>>", x)})

module.exports = {log2, get2}
