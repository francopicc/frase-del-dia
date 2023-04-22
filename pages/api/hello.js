import moment from 'moment-timezone';
import connectToDatabase from '@/db/phrase';
import Phrase from '../../models/phrase';

let phrase = '';
let whoAuthor = '';

const nowww = moment().tz('America/Argentina/Buenos_Aires');
const scrapeData = async () => {
  const scraped = await Phrase.aggregate([{ $sample: { size: 1 } }]);
  phrase = scraped[0].phrase;
  whoAuthor = scraped[0].author;
};

const startScheduledTasks = () => {
  setInterval(async () => {
    const now = moment().tz('America/Argentina/Buenos_Aires');
    if (now.hour() === 0 && now.minute() === 0) {
      await scrapeData();
      console.log("Frase actualizada a las " + now.hour() + ":" + now.minute() + ":" + now.second)
    }
  }, 60000);
};

export default async function handler(req, res) {
  await connectToDatabase();

  // Verificar si el valor del encabezado Authorization es válido
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== process.env.TOKEN_API) {
    res.setHeader('Location', '/');
    res.status(302).send();
    return;
  }

  if (!phrase) {
    // Si es la primera vez que se ejecuta el servidor o se reinició, hacer una nueva solicitud de scraping
    await scrapeData();
  }

  startScheduledTasks();

  res.status(200).json({
    phrase,
    author: whoAuthor,
  });
}