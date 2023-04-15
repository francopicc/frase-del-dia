import mongoose from 'mongoose';
const { Schema } = mongoose;

const phraseSchema = new Schema({
  phrase: String,
  author: String,
});

const Phrase = mongoose.models.Phrase || mongoose.model('Phrase', phraseSchema);

export default Phrase;