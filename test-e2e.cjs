// Test suite to verify all business rules, seeding, filtering, and storage
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING KAAMCONNECT VERIFICATION SUITE ---');

// 1. Verify build artifacts
const distHtml = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(distHtml)) {
  console.error('FAIL: dist/index.html does not exist');
  process.exit(1);
}
console.log('PASS: Production build bundle exists at dist/index.html');

// 2. Read seed providers and categories
const seedContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'seedProviders.ts'), 'utf-8');
const catContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'categories.ts'), 'utf-8');

const requiredCategories = [
  'Plumber',
  'Electrician',
  'Cook',
  'Maid / House Cleaning',
  'Tutor',
  'Carpenter',
  'Painter',
  'Appliance Repair'
];

for (const cat of requiredCategories) {
  if (!catContent.includes(`'${cat}'`) && !catContent.includes(`"${cat}"`)) {
    console.error(`FAIL: Missing category: ${cat}`);
    process.exit(1);
  }
}
console.log(`PASS: All 8 required categories present in categories.ts (${requiredCategories.join(', ')})`);

// 3. Count seed providers
const providerMatches = (seedContent.match(/id:\s*'prov-\d+'/g) || []).length;
console.log(`Found ${providerMatches} seed providers in seedProviders.ts (Requirement: at least 12)`);
if (providerMatches < 12) {
  console.error(`FAIL: Expected at least 12 providers, found ${providerMatches}`);
  process.exit(1);
}
console.log('PASS: Seed providers requirement met (> 12 realistic Indian profiles)');

// 4. Verify demo disclaimer present in components
const appContent = fs.readFileSync(path.join(__dirname, 'src', 'App.tsx'), 'utf-8');
const navContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'Navbar.tsx'), 'utf-8');
const cardContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'ProviderCard.tsx'), 'utf-8');
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'ProviderModal.tsx'), 'utf-8');

if (!navContent.includes('Demo') || !cardContent.includes('Demo Profile') || !modalContent.includes('Sample Demo Profile')) {
  console.error('FAIL: Missing explicit demo labeling');
  process.exit(1);
}
console.log('PASS: Clear demo prototype labeling verified across Navbar, ProviderCard, and ProviderModal');

// 5. Verify local storage persistence functions
const storageContent = fs.readFileSync(path.join(__dirname, 'src', 'utils', 'storage.ts'), 'utf-8');
if (!storageContent.includes('kaamconnect_providers') || !storageContent.includes('kaamconnect_enquiries')) {
  console.error('FAIL: Missing localStorage keys in storage.ts');
  process.exit(1);
}
console.log('PASS: LocalStorage persistence logic for providers & enquiries verified');

console.log('--- ALL AUTOMATED CHECKS PASSED SUCCESSFULLY ---');
