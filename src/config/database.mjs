import mongoose from 'mongoose';

export async function connectToDatabase() {
  // Debug mode for non-production environment
  if (process.env.NODE_ENV === 'dev') {
    mongoose.set('debug', true);
  }

  // Connection events
  mongoose.connection
    .once('open', () => console.log('Sucessfully connected to database'))
    .on('error', () => {
      throw new Error('Unable to connect to database');
    });

  await mongoose.connect(
    process.env.DB_URL,
    // Fix deprecation warnings
    { useUnifiedTopology: true, useNewUrlParser: true },
  );
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
}
