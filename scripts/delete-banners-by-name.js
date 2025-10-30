const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

// Usage examples:
//   node scripts/delete-banners-by-name.js --page work --name "flutter app.png"
//   node scripts/delete-banners-by-name.js --page services --name "animation desgin.png"
//   node scripts/delete-banners-by-name.js --page work --title "Flutter App"

function parseArgs() {
    const args = process.argv.slice(2);
    const out = { names: [], titles: [], page: '', containsNames: [], containsTitles: [] };
    for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === '--page') {
            out.page = (args[++i] || '').trim();
        } else if (a === '--name') {
            out.names.push((args[++i] || '').trim());
        } else if (a === '--title') {
            out.titles.push((args[++i] || '').trim());
        } else if (a === '--contains-name') {
            out.containsNames.push((args[++i] || '').trim());
        } else if (a === '--contains-title') {
            out.containsTitles.push((args[++i] || '').trim());
        }
    }
    return out;
}

function buildFilters({ page, names, titles, containsNames, containsTitles }) {
	const or = [];
	if (names && names.length) {
		for (const n of names) {
			// Case-insensitive exact filename match
			or.push({ filename: { $regex: `^${escapeRegex(n)}$`, $options: 'i' } });
		}
	}
    if (containsNames && containsNames.length) {
        for (const n of containsNames) {
            // Case-insensitive partial filename match
            or.push({ filename: { $regex: escapeRegex(n), $options: 'i' } });
        }
    }
	if (titles && titles.length) {
		for (const t of titles) {
			// Case-insensitive exact title match in metadata
			or.push({ 'metadata.title': { $regex: `^${escapeRegex(t)}$`, $options: 'i' } });
		}
	}
    if (containsTitles && containsTitles.length) {
        for (const t of containsTitles) {
            // Case-insensitive partial title match in metadata
            or.push({ 'metadata.title': { $regex: escapeRegex(t), $options: 'i' } });
        }
    }
	const base = {};
	if (page) base['metadata.page'] = page;
	return or.length ? { $and: [base, { $or: or }] } : base;
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
    const { page, names, titles, containsNames, containsTitles } = parseArgs();
	if (!page) {
		console.error('Error: --page is required');
		process.exit(1);
	}
    if ((!names || names.length === 0) && (!titles || titles.length === 0) && (!containsNames || containsNames.length === 0) && (!containsTitles || containsTitles.length === 0)) {
        console.error('Error: provide at least one --name, --title, --contains-name or --contains-title');
		process.exit(1);
	}

	const client = new MongoClient(MONGODB_URI);
	try {
		await client.connect();
		const db = client.db(MONGODB_DB);
		const filesCol = db.collection('images.files');
		const bucket = new GridFSBucket(db, { bucketName: 'images' });

        const filter = buildFilters({ page, names, titles, containsNames, containsTitles });
		const toDelete = await filesCol.find(filter).project({ _id: 1, filename: 1, metadata: 1 }).toArray();
		if (!toDelete.length) {
            console.log('No matching images found for deletion.', { page, names, titles, containsNames, containsTitles });
			return;
		}

		console.log(`Found ${toDelete.length} image(s) to delete:`);
		for (const f of toDelete) {
			console.log(`- ${f._id.toString()}  filename="${f.filename}"  page="${f.metadata?.page}"  title="${f.metadata?.title || ''}"`);
		}

		let deleted = 0;
		for (const f of toDelete) {
			try {
				await bucket.delete(new ObjectId(f._id));
				deleted++;
				console.log('Deleted', f._id.toString(), f.filename);
			} catch (e) {
				console.error('Failed to delete', f._id.toString(), e.message);
			}
		}

		console.log(`Completed. Deleted ${deleted}/${toDelete.length} image(s).`);
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
	} finally {
		await client.close();
	}
}

main();


