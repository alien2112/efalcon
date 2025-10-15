/**
 * Script to create an admin user in the database
 * Run with: node scripts/create-admin.js
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/petrowebsite?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
    family: 4,
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db(MONGODB_DB);
    const adminCollection = db.collection('admin_users');

    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      console.log('Username: admin');
      console.log('If you want to reset the password, please delete the user first.');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@petrowebsite.com',
      createdAt: new Date(),
      lastLogin: null
    };

    await adminCollection.insertOne(adminUser);

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@petrowebsite.com');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!');
    console.log('Login at: http://localhost:3000/admin\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

createAdminUser();
