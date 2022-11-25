const express = require("express")
const app = express()
//mongodb+srv://dbuser:dbuser@cluster0.3hyruhs.mongodb.net/?retryWrites=true&w=majority

const uri = "mongodb+srv://dbuser:dbuser@cluster0.3hyruhs.mongodb.net/?retryWrites=true&w=majority"
const {MongoClient} = require("mongodb-legacy")
const ObjectId = require('mongodb-legacy').ObjectId

const client = new MongoClient(uri)
const db = client.db("teste-db")
const collection = db.collection("crud")


 

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.listen(3000, function(){
console.log("Rodando no server 3000")
})
console.log("Bem vindo ao server")

app.get("/ler", (req, res) => {
res.send("Olá POVO DA ETE GP que adora JS")
})

app.get("/index", (req, res) => {
res.render("index.ejs")
})

//app.post("/show", (req, res)=> {console.log("Meu post")res.send("Vai dar tudo certo")})

app.post("/show", (req, res) => {
    collection.insertOne(req.body, (err, result)=> {
     if(err) return console.log(err)
     console.log("SALVOU COM SUCESSO NO NOSSO BANCO DE DADOS")
     res.redirect("/show")
     collection.find().toArray((err, results) =>{
         console.log(results)
     })
    })
 })//renderizar e retornar o conteúdo do nosso banco
 app.get('/', (req, res) => {
     let cursor = db.collection('crud').find()
 })
 
 //renderizar e retornar o conteúdo do nosso banco
 app.get('/show', (req, res) => {
     collection.find().toArray((err, results) => {
         if (err) return console.log(err)
         res.render('show.ejs', {crud: results})
     })
 })
 
 app.route('/edit/:id')
 .get((req, res) => {
     var id = req.params.id
 
     collection.find(ObjectId(id)).toArray((err, result) => {
         if(err) return res.send(err)
         res.render('edit.ejs', {crud: result})
     })
 })
 .post((req, res) => {
     var id = req.params.id
     var name = req.body.name
     var surname = req.body.surname
 
     collection.updateOne({_id: ObjectId(id)}, {
         $set: {
             name: name,
             surname: surname
         }
     }, (err, result) => {
         if(err) return res.send(err)
         res.redirect('/show')
         console.log('Banco de dados atualizado')
 
 })})

 //criando a nossa rota e comandos para deletar
app.route ('/delete/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('crud').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Deletando do nosso banco de dados!')
        res.redirect('/show')
    })
})
app.put('/updateuser/:id', function(req, res) {
    var db = req.db;
    var userToUpdate = req.params.id;
    db.collection('userlist').update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});
