import mongoose from 'mongoose';

export async function connectToDatabase() {
  // Debug mode for non-production environment
  if (process.env.NODE_ENV === 'dev') {
    mongoose.set('debug', true);
  }

  // Connection events
  mongoose.connection
    .once('open', () => console.info('Sucessfully connected to database'))
    .on('error', () => {
      throw new Error('Unable to connect to database');
    });

  await mongoose.connect(
    process.env.DB_UR,
    // Fix deprecation warnings
    { useNewUrlParser: true, useCreateIndex: true },
  );
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
}
