const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const { requireAuth,currentUser } = require('./middleware/authMiddleware')  


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(logger('tiny'))
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://jheebolar:mskOwC48WFtXJca7@user.zdjk7vm.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
     useCreateIndex:true })
  .then((result) => {
    console.log('connection is successful')
    app.listen(3000)
  })
  .catch((err) => console.log(err.message));

// routes
app.get('*', currentUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth ,(req, res) => res.render('smoothies'));
app.use(authRouter)



