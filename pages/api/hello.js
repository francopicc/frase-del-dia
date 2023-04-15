import connectToDatabase from '@/db/phrase';
import Phrase from '../../models/phrase';

let phrase = '';
let whoAuthor = '';
let lastScrapedTime = 0;

const scrapeData = async () => {
  const scraped = await Phrase.aggregate([{ $sample: { size: 1 } }]);
  phrase = scraped[0].phrase;
  whoAuthor = scraped[0].author;
  lastScrapedTime = Date.now();
};

const startScrapingAtMidnight = () => {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeUntilMidnight = midnight - now;
  setTimeout(async () => {
    await scrapeData();
    setInterval(async () => {
      await scrapeData();
    }, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
};

export default async function handler(req, res) {
  await connectToDatabase();
  if (!req.headers.authorization) {
    res.status(401).json({
      error: 'Unauthorized',
    });
    return;
  }

  // Verificar si el valor del encabezado Authorization es válido
  const token = req.headers.authorization.split(' ')[1];
  if (token !== process.env.TOKEN_API) { // Reemplace 'myToken' con su token de autorización
    
    return;
  }
  if (lastScrapedTime === 0) {
    // Si es la primera vez que se ejecuta el servidor, hacer una nueva solicitud de scraping
    await scrapeData();
    startScrapingAtMidnight();
  }
  res.status(200).json({
    phrase: phrase,
    author: whoAuthor,
  });
}