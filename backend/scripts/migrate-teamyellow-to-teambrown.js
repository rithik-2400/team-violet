// Migrates documents from DB `teamyellow` to DB `teambrown` on the same MongoDB server.
// Usage: node scripts/migrate-teamyellow-to-teambrown.js

const { MongoClient } = require('mongodb');

const SOURCE_DB = 'teamyellow';
const TARGET_DB = 'teambrown';

async function main() {
  const uri = process.env.MONGO_SERVER_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  await client.connect();
  const src = client.db(SOURCE_DB);
  const dst = client.db(TARGET_DB);

  const collections = await src.listCollections().toArray();
  if (collections.length === 0) {
    console.log(`No collections found in ${SOURCE_DB}. Nothing to migrate.`);
    return;
  }

  for (const { name } of collections) {
    const docs = await src.collection(name).find({}).toArray();
    if (docs.length === 0) {
      console.log(`Skipping ${name} (0 docs)`);
      continue;
    }

    // Preserve _id values by inserting as-is.
    await dst.collection(name).insertMany(docs, { ordered: false });
    console.log(`Migrated ${docs.length} docs: ${SOURCE_DB}.${name} -> ${TARGET_DB}.${name}`);
  }

  console.log('Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => process.exit());
