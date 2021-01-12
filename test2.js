const  ipfsClient =require('ipfs-http-client');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload =require('express-fileupload');
const ipfs = ipfsClient({ host: 'localhost', port: 5001 , protocol: 'https'});
const app = express();
const fs = require('fs');
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.get('/',(req,res)=>{
    res.render('home');

});
app.post('/upload' , (req, res)=>{
    const file = req.files.file;
    const fileName = req.body.fileName;
    const filePath = 'files/' + fileName;

    file.mv(filePath, async(err)=>{
        if (err){
            console.log('Error: failed to download the file');
            return res.status(500).send(err);
        }

        const fileHash = await addFile(fileName, filePath);
        fs.unlike(filePath,(err)=>{
            if (err) console.log(err);
        });

        res,render('upload', { fileName, fileHash});
    });

});
 const addFile = async (filename,filePath) =>{
  const file =   fs.readFileSync(filePath);
     const fileAdded = await ipfs.add({path: filename, content:file});
     const fileHash = fileAdded[0].hash;
     return fileHash;
 };
 app.listen(3001,()=>{
     console.log('server is running');
 });
 console.log('rohan is hear')

