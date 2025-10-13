import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}

// Database collections
export const COLLECTIONS = {
  ADMIN_USERS: 'admin_users',
  VISION_IMAGES: 'vision_images',
  SERVICES_IMAGES: 'services_images',
  WORK_IMAGES: 'work_images',
} as const;
