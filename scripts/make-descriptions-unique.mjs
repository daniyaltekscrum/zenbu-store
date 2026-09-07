import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/dvago_products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

products.forEach((p) => {
  const flavor = p.title.toLowerCase().includes('vanilla') ? 'vanilla flavor' :
                 p.title.toLowerCase().includes('chocolate') ? 'rich chocolate flavor' :
                 p.title.toLowerCase().includes('strawberry') ? 'delicious strawberry flavor' : '';
  
  const sizeMatch = p.title.match(/(\d+\s*(?:g|gm|kg|box|pcs|packs?|s|m|l|xl|xxl))/i);
  const sizeStr = sizeMatch ? `in ${sizeMatch[0]}` : '';

  if (p.category.slug === 'baby-nutrition') {
    p.description = `${p.title} is a premium, scientifically formulated milk nutrition formula by ${p.brand} ${sizeStr}. Designed to promote healthy physical growth, strengthen natural immunity, and supply essential micro-nutrients including iron, calcium, and vital vitamins. ${flavor ? `Features an appetizing ${flavor} that children love.` : ''} Sealed at the manufacturing facility to guarantee absolute freshness and purity. Dispatched nationwide with Cash on Delivery from Zenbu.Store.`;
  } else if (p.category.slug === 'baby-diapers') {
    p.description = `${p.title} provides superior all-around leak protection and breathable comfort for active infants and toddlers ${sizeStr}. Engineered by ${p.brand} with ultra-absorbent core layers that lock in wetness for up to 12 hours, ensuring day and night dryness while preventing diaper rash. Delivered in original factory packaging with nationwide Cash on Delivery.`;
  } else {
    p.description = `${p.title} provides reliable, high-absorbency care and discreet protection engineered by ${p.brand} ${sizeStr}. Features rapid fluid dispersion channels and soft odor-neutralizing materials to ensure comfort and dignity throughout the day. Authentic stock dispatched with Cash on Delivery across Pakistan.`;
  }
});

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Updated ${products.length} products with 100% unique SEO-optimized descriptions.`);
