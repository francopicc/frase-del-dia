import axios from 'axios';
import cheerio from 'cheerio';

let phrase = '';
let whoAuthor = '';
let lastScrapedTime = 0;

const scrapeData = async () => {
  const url = await axios.get('https://proverbia.net/');
  const html = url.data;
  const $ = cheerio.load(html);
  const data = $('.bsquote', html);
  const author = $('.bsquote footer', html);
  const scraped = data[0].children[0].next.children[0].data;
  const isfrom = author[0].children[0].next.children[0].data;
  phrase = scraped;
  whoAuthor = isfrom;
  lastScrapedTime = Date.now();
};

setInterval(async () => {
  await scrapeData();
}, 1000 * 60 * 60); // Ejecutar cada hora

scrapeData(); // Ejecutar una vez al inicio del servidor

export default async function handler(req, res) {
  // Verificar si ha pasado una hora desde la última vez que se hizo el scraping
  const now = Date.now();
  const elapsed = now - lastScrapedTime;
  if (elapsed >= 60 * 60 * 1000) {
    // Si ha pasado una hora, hacer una nueva solicitud de scraping
    await scrapeData();
  }
  
  res.status(200).json({
    phrase: phrase,
    author: whoAuthor,
  });
}