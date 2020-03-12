const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer();

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname + '/public')));

app.use('/user', (req, res, next) => {
  res.render('forbidden');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/dark', (req, res) => {
  res.render('index', {layout: 'dark'});
});

app.get('/dark/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.post('/contact/send-message', upload.single('avatar'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const fileName = req.file.originalname;

  if (author && sender && title && message && fileName) {
    res.render('contact', { isSent: true, file: fileName });
  } else {
    res.render('contact', { isError: true });
  }
});


app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});