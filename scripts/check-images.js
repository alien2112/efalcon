const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);

    const imagesCount = await db.collection('images.files').countDocuments();
    const services = await db.collection('services').find({}).project({ slug: 1, imageFileId: 1, galleryFileIds: 1 }).toArray();
    const projects = await db.collection('projects').find({}).project({ slug: 1, imageFileId: 1, galleryFileIds: 1 }).toArray();

    const summarize = (arr, type) => arr.map(d => ({
      type,
      slug: d.slug,
      hasImageId: !!d.imageFileId,
      galleryCount: Array.isArray(d.galleryFileIds) ? d.galleryFileIds.length : 0
    }));

    const serviceSummary = summarize(services, 'service');
    const projectSummary = summarize(projects, 'project');

    console.log(JSON.stringify({ imagesCount, serviceSummary, projectSummary }, null, 2));
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();















