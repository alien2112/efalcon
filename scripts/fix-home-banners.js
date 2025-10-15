const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:oneone2@cluster0.afyc9bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'petrowebsite';

const homeFiles = [
  {
    filename: 'logistic .webp',
    order: 1,
    title: 'Logistic Services',
    titleAr: 'خدمات اللوجستيات',
    description: 'Integrated logistics solutions across marine ports and inland operations',
    descriptionAr: 'حلول لوجستية متكاملة عبر الموانئ البحرية والعمليات الداخلية'
  },
  {
    filename: 'oil extraction.webp',
    order: 2,
    title: 'Oil & Gas Solutions',
    titleAr: 'حلول النفط والغاز',
    description: 'Comprehensive petroleum storage, trading, and distribution solutions',
    descriptionAr: 'حلول شاملة لتخزين وتداول وتوزيع المنتجات البترولية'
  },
  {
    filename: 'water purification1.webp',
    order: 3,
    title: 'Water Desalination',
    titleAr: 'تحلية المياه',
    description: 'Advanced water desalination systems for clean water supply',
    descriptionAr: 'أنظمة تحلية مياه متقدمة لإمداد مياه نظيفة'
  }
];

const pages = [
  {
    filename: 'about us banner .webp',
    page: 'about',
    order: 1,
    title: 'About Us',
    titleAr: 'من نحن',
    description: 'Learn more about Ebdaa Falcon and our mission',
    descriptionAr: 'تعرف على المزيد حول إبداع فالكون ورسالتنا'
  },
  {
    filename: 'ourservicesbanner.webp',
    page: 'contact',
    order: 1,
    title: 'Contact Us',
    titleAr: 'تواصل معنا',
    description: 'Get in touch with our team',
    descriptionAr: 'تواصل مع فريقنا'
  },
  {
    filename: 'blog banner.webp',
    page: 'blog',
    order: 1,
    title: 'Blog',
    titleAr: 'المدونة',
    description: 'Latest news and insights from our team',
    descriptionAr: 'آخر الأخبار والرؤى من فريقنا'
  }
];

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const files = db.collection('images.files');

    // Ensure home banners have page and order
    for (const f of homeFiles) {
      await files.updateMany(
        { filename: f.filename },
        {
          $set: {
            'metadata.page': 'home',
            'metadata.order': f.order,
            'metadata.title': f.title,
            'metadata.titleAr': f.titleAr,
            'metadata.description': f.description,
            'metadata.descriptionAr': f.descriptionAr,
            'metadata.isActive': true,
            'metadata.showTitle': true,
            'metadata.showDescription': true
          }
        }
      );
    }

    // Ensure other single-page banners are set
    for (const p of pages) {
      await files.updateMany(
        { filename: p.filename },
        {
          $set: {
            'metadata.page': p.page,
            'metadata.order': p.order,
            'metadata.title': p.title,
            'metadata.titleAr': p.titleAr,
            'metadata.description': p.description,
            'metadata.descriptionAr': p.descriptionAr,
            'metadata.isActive': true,
            'metadata.showTitle': true,
            'metadata.showDescription': true
          }
        }
      );
    }

    console.log('Metadata fix completed.');
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();


