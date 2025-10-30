const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

// Usage examples:
//   node scripts/list-banners.js
//   node scripts/list-banners.js --page work
//   node scripts/list-banners.js --search "flutter"

function parseArgs() {
	const args = process.argv.slice(2);
	const out = { page: '', search: '' };
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === '--page') out.page = (args[++i] || '').trim();
		else if (a === '--search') out.search = (args[++i] || '').trim();
	}
	return out;
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
	const { page, search } = parseArgs();
	const client = new MongoClient(MONGODB_URI);
	try {
		await client.connect();
		const db = client.db(MONGODB_DB);
		const files = db.collection('images.files');

		const filter = {};
		if (page) filter['metadata.page'] = page;
		if (search) {
			const rx = { $regex: escapeRegex(search), $options: 'i' };
			filter['$or'] = [{ filename: rx }, { 'metadata.title': rx }];
		}

		const docs = await files
			.find(filter)
			.sort({ 'metadata.page': 1, 'metadata.order': 1, uploadDate: 1 })
			.project({ filename: 1, metadata: 1, uploadDate: 1 })
			.toArray();

		if (!docs.length) {
			console.log('No banners found.', { page, search });
			return;
		}

		const result = docs.map((d) => ({
			id: d._id.toString(),
			filename: d.filename,
			title: d.metadata?.title || '',
			page: d.metadata?.page || '',
			order: d.metadata?.order ?? null,
			isActive: d.metadata?.isActive !== false,
			uploadDate: d.uploadDate,
		}));

		console.log(JSON.stringify(result, null, 2));
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
	} finally {
		await client.close();
	}
}

main();


