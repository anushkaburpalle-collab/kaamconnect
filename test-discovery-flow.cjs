// Verification script for Customer Discovery Flow
const fs = require('fs');
const path = require('path');

console.log('--- TESTING CUSTOMER DISCOVERY FLOW ---');

// Load seed providers
const seedPath = path.join(__dirname, 'src', 'data', 'seedProviders.ts');
const content = fs.readFileSync(seedPath, 'utf8');

// Simple parser for seed data in Node test environment
const providers = [];
const providerBlocks = content.split(/\{\s*id:\s*'/).slice(1);

for (const b of providerBlocks) {
  const idMatch = b.match(/^([^']+)'/);
  const nameMatch = b.match(/name:\s*'([^']+)'/);
  const catMatch = b.match(/category:\s*'([^']+)'/);
  const locMatch = b.match(/locality:\s*'([^']+)'/);
  const cityMatch = b.match(/city:\s*'([^']+)'/);
  const priceMatch = b.match(/priceStarting:\s*(\d+)/);
  const ratingMatch = b.match(/rating:\s*([0-9.]+)/);
  const expMatch = b.match(/experienceYears:\s*(\d+)/);
  const descMatch = b.match(/shortDescription:\s*'([^']+)'/);

  if (idMatch && nameMatch && catMatch) {
    providers.push({
      id: idMatch[1],
      name: nameMatch[1],
      category: catMatch[1],
      locality: locMatch ? locMatch[1] : '',
      city: cityMatch ? cityMatch[1] : '',
      priceStarting: priceMatch ? Number(priceMatch[1]) : 0,
      rating: ratingMatch ? Number(ratingMatch[1]) : 0,
      experienceYears: expMatch ? Number(expMatch[1]) : 0,
      shortDescription: descMatch ? descMatch[1] : '',
      servicesOffered: []
    });
  }
}

console.log(`Loaded ${providers.length} providers for discovery simulation.`);

// Filter helper mirroring src/components/Marketplace.tsx
function filterProviders(filters) {
  return providers
    .filter((p) => {
      // Category filter
      if (filters.category && p.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      // Locality filter
      if (filters.locality && filters.locality.trim()) {
        const loc = filters.locality.toLowerCase().trim();
        const matchesLocality = p.locality.toLowerCase().includes(loc);
        const matchesCity = p.city.toLowerCase().includes(loc);
        if (!matchesLocality && !matchesCity) return false;
      }
      // Search query
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q) || q.includes(p.category.toLowerCase());
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesLocality = p.locality.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);

        let matchesStem = false;
        if (q.startsWith('plumb') && p.category === 'Plumber') matchesStem = true;
        if (q.startsWith('electr') && p.category === 'Electrician') matchesStem = true;
        if (q.startsWith('cook') && p.category === 'Cook') matchesStem = true;
        if ((q.startsWith('clean') || q.startsWith('maid')) && p.category === 'Maid / House Cleaning') matchesStem = true;
        if ((q.startsWith('tutor') || q.startsWith('teach')) && p.category === 'Tutor') matchesStem = true;
        if (q.startsWith('carpent') && p.category === 'Carpenter') matchesStem = true;
        if (q.startsWith('paint') && p.category === 'Painter') matchesStem = true;
        if ((q.startsWith('appliance') || q.includes('ac')) && p.category === 'Appliance Repair') matchesStem = true;

        if (!matchesName && !matchesCategory && !matchesDesc && !matchesLocality && !matchesCity && !matchesStem) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'price-asc':
          return a.priceStarting - b.priceStarting;
        case 'price-desc':
          return b.priceStarting - a.priceStarting;
        case 'experience-desc':
          return b.experienceYears - a.experienceYears;
        case 'recommended':
        default:
          return b.rating - a.rating;
      }
    });
}

// TEST 1: Searching for 'plumber' shows plumbers
const plumberResults = filterProviders({ searchQuery: 'plumber', category: '', locality: '', sortBy: 'recommended' });
console.log(`\nTEST 1: Searching for 'plumber' returned ${plumberResults.length} results:`);
plumberResults.forEach(p => console.log(`  - [${p.category}] ${p.name} (${p.locality}) - Starts ₹${p.priceStarting}`));
if (plumberResults.length < 2 || !plumberResults.every(p => p.category === 'Plumber')) {
  console.error('FAIL: Searching for plumber did not return plumbers properly');
  process.exit(1);
}
console.log('PASS: Searching for "plumber" shows only plumbers.');

// TEST 2: Selecting 'Electrician' shows electricians
const electricianResults = filterProviders({ searchQuery: '', category: 'Electrician', locality: '', sortBy: 'recommended' });
console.log(`\nTEST 2: Selecting 'Electrician' category returned ${electricianResults.length} results:`);
electricianResults.forEach(p => console.log(`  - [${p.category}] ${p.name} (${p.locality})`));
if (electricianResults.length < 2 || !electricianResults.every(p => p.category === 'Electrician')) {
  console.error('FAIL: Selecting Electrician did not return electricians properly');
  process.exit(1);
}
console.log('PASS: Selecting "Electrician" shows electricians.');

// TEST 3: Entering a locality filters results (e.g. 'Koramangala')
const koramangalaResults = filterProviders({ searchQuery: '', category: '', locality: 'Koramangala', sortBy: 'recommended' });
console.log(`\nTEST 3: Entering locality 'Koramangala' returned ${koramangalaResults.length} results:`);
koramangalaResults.forEach(p => console.log(`  - ${p.name} (${p.locality}) - ${p.category}`));
if (koramangalaResults.length === 0 || !koramangalaResults.every(p => p.locality.includes('Koramangala'))) {
  console.error('FAIL: Entering locality Koramangala failed');
  process.exit(1);
}
console.log('PASS: Locality filtering works for "Koramangala".');

// TEST 4: Price low-to-high sorting
const priceAsc = filterProviders({ searchQuery: '', category: '', locality: '', sortBy: 'price-asc' });
console.log(`\nTEST 4: Sorting by price-asc:`);
priceAsc.slice(0, 5).forEach(p => console.log(`  - ₹${p.priceStarting} | ${p.name} (${p.category})`));
for (let i = 0; i < priceAsc.length - 1; i++) {
  if (priceAsc[i].priceStarting > priceAsc[i + 1].priceStarting) {
    console.error(`FAIL: Price sort error at index ${i}: ₹${priceAsc[i].priceStarting} > ₹${priceAsc[i+1].priceStarting}`);
    process.exit(1);
  }
}
console.log('PASS: Price Low-to-High sorting correctly verified.');

// TEST 5: Rating high-to-low sorting
const ratingDesc = filterProviders({ searchQuery: '', category: '', locality: '', sortBy: 'rating-desc' });
console.log(`\nTEST 5: Sorting by rating-desc:`);
ratingDesc.slice(0, 5).forEach(p => console.log(`  - ${p.rating.toFixed(1)} ★ | ${p.name} (${p.category})`));
for (let i = 0; i < ratingDesc.length - 1; i++) {
  if (ratingDesc[i].rating < ratingDesc[i + 1].rating) {
    console.error(`FAIL: Rating sort error at index ${i}: ${ratingDesc[i].rating} < ${ratingDesc[i+1].rating}`);
    process.exit(1);
  }
}
console.log('PASS: Rating High-to-Low sorting correctly verified.');

// TEST 6: Empty state when no matches
const emptyResults = filterProviders({ searchQuery: 'astrophysicist', category: 'Plumber', locality: 'Pali Hill', sortBy: 'recommended' });
console.log(`\nTEST 6: Zero matches test returned ${emptyResults.length} results.`);
if (emptyResults.length !== 0) {
  console.error('FAIL: Expected 0 results for non-existent criteria');
  process.exit(1);
}
console.log('PASS: Correctly triggers empty state condition.');

// TEST 7: Check ProviderCard onclick functionality
const cardFile = fs.readFileSync(path.join(__dirname, 'src', 'components', 'ProviderCard.tsx'), 'utf8');
if (!cardFile.includes('onClick={() => onViewProfile(provider)}') || !cardFile.includes('e.stopPropagation()')) {
  console.error('FAIL: ProviderCard is missing root onClick or e.stopPropagation()');
  process.exit(1);
}
console.log('PASS: ProviderCard opens detailed profile on card click and protects Book button.');

console.log('\n--- ALL CUSTOMER DISCOVERY FLOW CHECKS PASSED ---');
