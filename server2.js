const http = require('http')
const fs = require('fs')
const port = 3002

const writer = fs.createWriteStream('userdata.txt')
// writer.on('eror', err =>{
//     console.log(err)
// })

function sendFile(path, response) {
    const fileReader = fs.createReadStream(path)
    fileReader.on('error', err => {
        response.statusCode = 404
        response.end(`Die Datei ${path} wurde nicht gefunden, geh bitte auf <a href="/">Startseite</a>`)
    })
    
    fileReader.pipe(response)
}

const server = http.createServer((request, response) => {
    const url = request.url
    console.log(request.url)
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "Content-Type")
    response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD")
    response.setHeader('Access-Control-Allow-Headers', '*')
    if(url == '/') {
        //sendFile('./index.html', response)
        const myJSON = {
            message: "Hallo"
        }
        response.end(JSON.stringify(myJSON))
    } else if(url == '/fbw9') {
        const myJSON = {
            message: [{
                name: "Alex"
            }, {
                name: "Fatima"
            }, {
                name: "Ahmad Lojain"
            }]
        }
        response.end(JSON.stringify(myJSON.message))

    } else if(url.includes('/images/')) {
        response.setHeader("Content-Type", "image/jpeg")
        sendFile('./images/storm.jpg', response)

     } else if(url == '/send-data') {
        console.log('store data')
       request.on('error' ,err =>{
            console.log(err)
       })
       .on('end', () => {
           console.log('All Data received')
       })
       .pipe(writer)

       
        


     }else {
        response.statusCode = 404
        response.end(`Unter ${url} gibt es keine Seite, geh bitte auf <a href="/">Startseite</a>`)
    }
})

server.listen(port, (err) => {
    if(err) {
        return console.log('fehler', err)
    }
    console.log('Server running at Port ' + port)
})