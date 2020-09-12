const http = require('http')
var fs = require('fs');
// var formidable = require('formidable');

// var upload_html = fs.readFileSync("index.html");
 
// replace this with the location to save uploaded files
// var upload_path = "/home/ayham/Pro-2020/pro-2020-woche6/Node-Server/upload_html";


function sendFile(path, response){
    const fileReader =fs.createReadStream(path)

    fileReader.on('error',err =>{
        response.statusCode= 404
            response.end(`Die dati ${path} wurde nicht gefunden , geh bitte auf <a href= "/" >start Seite</a>`)
            })
        fileReader.pipe(response)
    
}
const server = http.createServer((request,response) =>{
    const url = request.url
    console.log(request.url)
    response.setHeader("Content-Type", "text/html; charset= utf-8")
    

    if(url == "/"){
        // <p>${request.url}</p>
        // response.write(upload_html)
        // return response.end()
        // fs.readFile('./index.html', (err, data) =>{
        //     response.end(data)
        // }) Maxim besser way to load a file  because its more save 
        sendFile('./index.html',response)
           
    }else if(url == "/fbw9"){
        
        sendFile('./fbw9.html',response)
        // fs.readFile('./fbw9.html', (err, data) =>{
        //     response.end(data) })
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