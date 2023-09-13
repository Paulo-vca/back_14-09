

https://github.com/Paulo-vca/BACKBETO2/blob/main/backbeto/controller/product/productController.js


const bodyParser=require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ message: "Ëxpress is running..."});
});

app.get("/users", verifyJWT, (req, res, next) =>{
    console.log('show users')
    res.json([{id: 1, nome: 'Bruno'}])
});

app.post('/login', (req, res, next) => {
    if(req.body.user === 'Bruno' && req.body.pwd === '123'){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
    } 
    
    return res.json({auth: false, meng: "Login inválido"});
});

app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];

    if(!token)
        res.status(401).json({ auth: false, msg: 'No token provided.'});
    
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if(err) 
            res.status(500).json({ auth: false, msg: 'Failed to authenticate token.'});
        req.userId = decoded.id;
        next();
    });
}

const server = http.createServer(app);
server.listen(port);
console.log("Express is running..")
