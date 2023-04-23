import moment from 'moment-timezone';
import connectToDatabase from '@/db/phrase';
import Phrase from '../../models/phrase';
import cron from 'node-cron';

let phrase = '';
let whoAuthor = '';
let isFirstTime = true;

const scrapeData = async () => {
  const [ { phrase: newPhrase, author: newAuthor } ] = await Phrase.aggregate([{ $sample: { size: 1 } }]);
  phrase = newPhrase;
  whoAuthor = newAuthor;
  if (isFirstTime) {
    console.log(`La frase se actualizó por primera vez a las ${moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss')}.`);
    isFirstTime = false;
  }
};

const startScheduledTasks = () => {
  cron.schedule('0 0 * * *', async () => {
    await scrapeData();
    console.log("Frase actualizada a medianoche.");
  }, {
    scheduled: true,
    timezone: 'America/Argentina/Buenos_Aires'
  });
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
