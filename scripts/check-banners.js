const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const files = await db.collection('images.files').find({}).project({ filename: 1, 'metadata.page': 1, 'metadata.order': 1, 'metadata.isActive': 1 }).toArray();
    const byPage = files.reduce((acc, f) => {
      const p = (f.metadata && f.metadata.page) || 'home';
      acc[p] = acc[p] || [];
      acc[p].push({ filename: f.filename, order: f.metadata?.order, isActive: f.metadata?.isActive });
      return acc;
    }, {});
    console.log(JSON.stringify(byPage, null, 2));
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();




