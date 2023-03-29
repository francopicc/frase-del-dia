import axios from 'axios';
import cheerio from 'cheerio';

let phrase = '';
let whoAuthor = '';

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
};

scrapeData();

setInterval(async () => {
  await scrapeData();
}, 1000 * 60 * 60); // Cada hora

export default async function handler(req, res) {
  res.status(200).json({
    phrase: phrase,
    author: whoAuthor,
  });
}