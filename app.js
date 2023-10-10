import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({   
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: false, 
  // cookieSameSite: 'None',
}));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.get('/', (req, res) => {
  res.render('homepage.html.njk', {name: req.session.name, title: 'Homepage'})
})


app.post('/get-name', (req, res) => {
  req.session.name = req.body.name
  res.redirect('/')
})



const fossilsArray =["aust", "quetz", "steg", "trex"]

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587, 
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

// const MOST_LIKED_FOSSILS = [
//  {
//     img: '/img/australopith.png',
//     name: 'Australopithecus',
//     num_likes: 584,
//   },
// {
//     img: '/img/quetzal_torso.png',
//     name: 'Quetzal',
//     num_likes: 587, 
//   },
//  {
//     img: '/img/stego_skull.png',
//     name: 'Stegosaurus',
//     num_likes: 598,
//   },
//  {
//     img: '/img/trex_skull.png',
//     name: 'Tyrannosaurus Rex',
//     num_likes: 601,
//   },
// ]


app.get('/top-fossils', (req, res) => {
  const name = req.session.name;

  if(!name){
    return res.redirect('/')
  }

  res.render('top-fossils.html.njk', {
    name: req.session.name,
    fossils: Object.keys(MOST_LIKED_FOSSILS).map((key) => MOST_LIKED_FOSSILS[key])
  })
})

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];
// const { fossilChoice } = req.body

// MOST_LIKED_FOSSILS(fossilChoice).num_likes += 1


// TODO: Replace this comment with your code

app.post('/like-fossil', (req, res) => {
  const key = req.body.key

  MOST_LIKED_FOSSILS[key].num_likes += 1
  
  res.redirect('/thank-you')
})

app.get('/thank-you', (req, res) => {
  res.render('thank-you.html.njk', {
    name: req.session.name,
    title: 'Thank you'
  })
})

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
