//checando as variaveis de ambiente
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//importando as dependências
const express = require('express')
const app = express()
const expressLayouts = require ('express-ejs-layouts')
const mongoose = require('mongoose')
const BodyParser = require('body-parser')

//importando as rotas
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const booksRouter = require('./routes/books')

//configurações da aplicação
app.set('view engine','ejs') 
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(BodyParser.urlencoded({limit:'10mb',extended:false}))

//conectando no banco de dados
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Conectado ao mongoose'))

//inserindo as rotas
app.use('/',indexRouter.router)
app.use('/authors',authorRouter.router)
app.use('/books',booksRouter.router)

app.listen(process.env.PORT || 3014,()=>{
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})
