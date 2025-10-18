const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const files = db.collection('images.files');
    const chunks = db.collection('images.chunks');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    // 1) Delete current wrong services banner(s) using ourservicesbanner.webp
    const wrongFiles = await files.find({ 'metadata.page': 'services', filename: 'ourservicesbanner.webp' }).project({ _id: 1 }).toArray();
    for (const f of wrongFiles) {
      try {
        await bucket.delete(new ObjectId(f._id));
        console.log('Deleted wrong services banner:', f._id.toString());
      } catch (e) {
        console.error('Failed to delete', f._id.toString(), e.message);
      }
    }

    // 2) Upload the correct services banner from PNG (distinct from contact)
    const filePath = path.join(process.cwd(), 'public', 'ourservicesbanner.png');
    if (!fs.existsSync(filePath)) {
      console.error('Correct services banner asset not found:', filePath);
      process.exitCode = 1;
      return;
    }
    const buffer = fs.readFileSync(filePath);
    const uploadStream = bucket.openUploadStream('ourservicesbanner.png', {
      metadata: {
        title: 'Our Services',
        description: 'Comprehensive energy, logistics, and sustainability solutions',
        order: 1,
        isActive: true,
        showTitle: true,
        showDescription: true,
        page: 'services'
      }
    });
    uploadStream.end(buffer);
    await new Promise((resolve, reject) => {
      uploadStream.on('error', reject);
      uploadStream.on('finish', resolve);
    });
    console.log('Uploaded correct services banner: ourservicesbanner.png');

  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();













