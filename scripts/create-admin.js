const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = 'petrowebsite';

async function createAdminUser() {
  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(MONGODB_DB);
    const adminCollection = db.collection('admin_users');

    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@petro.com',
      createdAt: new Date()
    };

    await adminCollection.insertOne(adminUser);
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

createAdminUser();
