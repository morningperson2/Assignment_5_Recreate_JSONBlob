const fs=require('fs');
const url=require('url');

function process(req,res){
	//Obtain request method
	console.log(req.method);
	
	//Parse the components of the URL
	let url_components=url.parse(req.url,true);
	console.log(url_components);
	console.log(url_components.pathname.split('/'));
	
	//Obtain the current timestamp (why do we need this?)
	const currentDate=new Date();
	const timestamp=currentDate.getTime();
	console.log(timestamp);
	
	
	//Write something in the header of the response
	res.writeHead(200,{'Content-Type':'application/json'});
	res.writeHead(200,{'Current-timestamp':timestamp});
	res.writeHead(200,{'Access-Control-Allow-Origin': '*'});
	res.writeHead(200,{'Access-Control-Request-Method': '*'});
	res.writeHead(200,{'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,DELETE,POST'});
	res.writeHead(200,{'Access-Control-Allow-Headers': '*'});
	

	switch(req.method){
		case 'GET':
			GET(req,res);
			break;
		case 'POST':
			POST(req,res, timestamp);
			break;
		case 'PUT':
			PUT(req,res);
			break;
		case 'DELETE':
			DELETE(req,res);
			break;
		default:
			res.end("Method not supported");
	
	/*//Write something in the body of the response
	res.write('x');
	
	//Process the body of the request
	var body=[];
	req.on('data',(chunk)=>{
		body.push(chunk);
	}).on('end',()=>{
		body=Buffer.concat(body).toString();
		res.end(body);
	});
	
	// Check if a file exists
	let myfile='file.json';
	console.log(fs.existsSync(`./data/${myfile}`));
	
	
	// Write to a file
	let my_other_file=`${timestamp}.json`;
	fs.writeFileSync(`./data/${my_other_file}`,timestamp+'');
	
	
	// Read data from a file
	console.log(fs.readFileSync(`./data/${my_other_file}`,'utf8'));
	
	//Encode a javascript data type into JSON
	const javascript_object={
		artist:'Rednex',
		title:'Cotton Eye Joe',
		url_video:'https://youtu.be/HAlspX_kjL4'
	};
	let json_string=JSON.stringify(javascript_object);
	console.log(json_string);
	fs.writeFileSync(`./data/${my_other_file}`,json_string);
	
	//Convert a JSON string into javascript
	let javascript_object_again=JSON.parse(json_string);
	console.log(javascript_object_again);
	*/
	}
}


function GET(req, res){
	//check if file exists
	let myfile=req.url.split('/')[2]+'.json';
	if(fs.existsSync(`./data/${myfile}`)){
		//console.log(fs.existsSync(`./data/${myfile}`));

		//read data from file
		let data = fs.readFileSync(`./data/${myfile}`,'utf8');

		//respond with data
		res.end(data);
	}
	else{
		//respond with error message
		res.end("File not found");
	}
}

function POST(req, res, timestamp){
	//generate unique name for file
	let myFile=`${timestamp}.json`;

	//read data from request
	//Process the body of the request
	let body=[];
	req.on('data',(chunk)=>{
		body.push(chunk);
	}).on('end',()=>{
		body=Buffer.concat(body).toString();
		console.log(body);
		res.write(body);
		try {
			let data = JSON.parse(body);
			//write data to file in json format
			fs.writeFileSync(`./data/${myFile}`,JSON.stringify(data));
			//respond with name of file
			//res.write('\n'+myFile);
			res.end();
		} catch (error) {
			console.error(error);
			res.end("Invalid JSON input");
		}
	});

}

function PUT(req, res){
	//check if file exists
	let myfile=req.url.split('/')[2]+'.json';
	if(fs.existsSync(`./data/${myfile}`)){
		//read data from request

		//convert JSON to javascript data type

		//take the body of the request and write it to the file

		//respond with success message
	}
	else{
		//respond with error message
		res.end("File not found");
	}	
}

function DELETE(req, res){
	//check if file exists
	let myfile=req.url.split('/')[2]+'.json';
	if(fs.existsSync(`./data/${myfile}`)){
		console.log(fs.existsSync(`./data/${myfile}`));

	//delete file
	fs.writeFileSync(`./data/${myfile}`,'');
	fs.unlinkSync(`./data/${myfile}`);

	//respond with success message
	res.end("SUCCESS");
	}
	else{
		//respond with error message
		res.end("File not found");
	}
}
module.exports=process;