const http = require('http')
var fs = require('fs');
var formidable = require('formidable');

var upload_html = fs.readFileSync("index.html");
 
// replace this with the location to save uploaded files
var upload_path = "/home/ayham/Pro-2020/pro-2020-woche6/Node-Server/upload_html";


function sendFile(path, response){
    fs.readFile(path, (err, data) =>{
        if(err){
            response.statusCode= 404
            response.end(`Die dati ${path} wurde nicht gefunden , geh bitte auf <a href= "/" >start Seite</a>`)
        }
        response.end(data)
    })
    
}
const server = http.createServer((request,response) =>{
    const url = request.url
    console.log(request.url)
    response.setHeader("Content-Type", "text/html; charset= utf-8")
    

    if(url == "/"){
        // <p>${request.url}</p>
        response.write(upload_html)
        return response.end()

        // fs.readFile('./index.html', (err, data) =>{
        //     response.end(data)
        // }) Maxim besser way to load a file  because its more save 
        
           
    }else if(url == "/fbw9"){
        
            sendFile('./fbw9.html',response)

       // fs.readFile('./fbw9.html', (err, data) =>{
        //     response.end(data) })
    }else if (url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.filetoupload.path;
            var newpath = upload_path + files.filetoupload.name;
            // copy the file to a new location
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                // you may respond with another html page
                response.write(`File uploaded and moved!<p>back to start Page <a href= "/" >start Seite</a></p>`);
                response.end();
            });
        });
    }else if  (url.includes('/images/')){
        response.setHeader("Content-Type", "image/jpeg")
        sendFile('./images/upload_htmlchicago-skyline-engagement_0032.jpg',response)
    }else{
        response.statusCode= 404
        response.end(`Unter ${url} gibt kein Seite , geh bitte auf <a href= "/" >start Seite</a>`)
    }
    
    
    // response.end('<h1> Danke für die Anfrage</h1><script>alert("Surprise!");window.location.reload()</script>')
    // benuzen wir das wenn wir immer reload machen wollte
})

server.listen(3000, (err) => {
    if(err){
        return console.log('fehler', err)
    }
    console.log('server running at port 3000')
})