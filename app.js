const express = require("express")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/blog",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("MongoDB conectado")
}).catch((err)=>{
    console.log("Houve um erro" + err)
})

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    text: {
        type: String,
        require: true
    }
})

mongoose.model("posts", PostSchema)

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/",(req,res)=> {
    res.render("index.ejs")
})

app.post("/show", (req,res)=> {
    const novoPost = mongoose.model("posts")
    new novoPost({
        title: req.body.title,
        text: req.body.text
    }).save()
    console.log("Adicionado com sucesso")
    res.send("Obrigado por postar")
})

app.listen(port,()=> {
    console.log("Server is running at port 3001")
})