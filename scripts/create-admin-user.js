const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = 'petrowebsite';

async function createAdminUser() {
  let client;
  
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      family: 4,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    const db = client.db(MONGODB_DB);
    const adminCollection = db.collection('admin_users');
    
    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      console.log('Created at:', existingAdmin.createdAt);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    const adminUser = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@petrowebsite.com',
      createdAt: new Date(),
      lastLogin: null
    };
    
    const result = await adminCollection.insertOne(adminUser);
    console.log('Admin user created successfully!');
    console.log('Admin ID:', result.insertedId);
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@petrowebsite.com');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed.');
    }
  }
}

createAdminUser();



