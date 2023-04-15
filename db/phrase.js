const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos exitosamente.');
  } catch (error) {
    console.error('Ocurrio un error, mientras se conectaba a la base de datos:', error);
  }
};

module.exports = connectToDatabase;