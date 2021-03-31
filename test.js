
//let { MakeAlias } = require('./lib/MakeAlias');
//MakeAlias = new MakeAlias();

let { CopyVhost } = require('./lib/CopyVhost');
CopyVhost = new CopyVhost();

process.on( 'unhandledRejection', error => {
	console.log( 'unhandledRejection', error.message );
} );

//MakeAlias.init( { 'path': 'eit8i', 'linkedin_url': 'http://www.linkedin.com/now' } );
CopyVhost.init( { 'sub_domain': 'eit8i', 'linkedin_url': 'http://www.linkedin.com/now', 'domain': 'fkrt.com' } );

/*
let { Mongo } = require('./lib/DB/Mongo');
Mongo = new Mongo();

process.on( 'unhandledRejection', error => {
	console.log( 'unhandledRejection', error.message );
} );

( async() => { 
	try { 
		let data = { 'testing': 1 };
		//let res  = await Mongo.save( { 'db_name': 'lktd', 'collection': 'redir', 'data': data } );
		let res  = await Mongo.save( { 'data': data } );
		console.log( res );
	} catch ( error ) { 
		console.log( error );
	}
} )();
*/
