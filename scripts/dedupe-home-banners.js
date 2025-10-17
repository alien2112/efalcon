const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const files = db.collection('images.files');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    // Fetch all home banners with order 1 or 2
    const home = await files
      .find({ 'metadata.page': 'home', 'metadata.order': { $in: [1, 2] } })
      .sort({ uploadDate: 1 })
      .toArray();

    const toDelete = [];
    const keepByOrder = new Map();
    for (const f of home) {
      const ord = f.metadata?.order || 0;
      if (!keepByOrder.has(ord)) {
        keepByOrder.set(ord, f._id.toString());
      } else {
        toDelete.push(f._id);
      }
    }

    // Delete extras
    for (const id of toDelete) {
      try {
        await bucket.delete(new ObjectId(id));
        console.log('Deleted duplicate home banner:', id.toString());
      } catch (e) {
        console.error('Failed to delete', id.toString(), e.message);
      }
    }

    // Report
    const after = await files
      .find({ 'metadata.page': 'home', 'metadata.order': { $in: [1, 2, 3] } })
      .project({ filename: 1, 'metadata.order': 1 })
      .toArray();
    console.log('Remaining home banners:', after);
    console.log('Deleted count:', toDelete.length);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();












