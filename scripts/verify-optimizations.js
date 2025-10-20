#!/usr/bin/env node

/**
 * Performance Optimization Verification Script
 * Checks if all optimizations are properly implemented
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Performance Optimizations...\n');

let allChecks = true;

// Check 1: GSAP removed from package.json
console.log('1. Checking GSAP removal...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.dependencies.gsap) {
  console.log('   ❌ GSAP still in dependencies');
  allChecks = false;
} else {
  console.log('   ✅ GSAP removed');
}

// Check 2: Bundle analyzer added
console.log('\n2. Checking bundle analyzer...');
if (packageJson.devDependencies['@next/bundle-analyzer']) {
  console.log('   ✅ Bundle analyzer added');
} else {
  console.log('   ❌ Bundle analyzer missing');
  allChecks = false;
}

// Check 3: Analyze script added
if (packageJson.scripts.analyze) {
  console.log('   ✅ Analyze script added');
} else {
  console.log('   ❌ Analyze script missing');
  allChecks = false;
}

// Check 4: Font optimization files
console.log('\n3. Checking font optimization...');
if (fs.existsSync('src/lib/fonts.ts')) {
  console.log('   ✅ Font configuration file exists');
} else {
  console.log('   ❌ Font configuration file missing');
  allChecks = false;
}

// Check 5: Blur placeholder utilities
console.log('\n4. Checking blur placeholder utilities...');
if (fs.existsSync('src/lib/blur-placeholder.ts')) {
  console.log('   ✅ Blur placeholder utilities exist');
} else {
  console.log('   ❌ Blur placeholder utilities missing');
  allChecks = false;
}

// Check 6: Optimized Image component
console.log('\n5. Checking OptimizedImage component...');
if (fs.existsSync('src/components/OptimizedImage.tsx')) {
  console.log('   ✅ OptimizedImage component exists');
} else {
  console.log('   ❌ OptimizedImage component missing');
  allChecks = false;
}

// Check 7: Next config has bundle analyzer
console.log('\n6. Checking next.config.ts...');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes('@next/bundle-analyzer')) {
  console.log('   ✅ Bundle analyzer configured');
} else {
  console.log('   ❌ Bundle analyzer not configured');
  allChecks = false;
}

if (nextConfig.includes('removeConsole')) {
  console.log('   ✅ Console.log removal configured');
} else {
  console.log('   ⚠️  Console.log removal not configured (optional)');
}

// Check 8: Layout has fonts
console.log('\n7. Checking layout.tsx...');
const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (layout.includes('from \'@/lib/fonts\'')) {
  console.log('   ✅ Fonts imported in layout');
} else {
  console.log('   ❌ Fonts not imported in layout');
  allChecks = false;
}

if (layout.includes('fonts.className')) {
  console.log('   ✅ Font className applied');
} else {
  console.log('   ❌ Font className not applied');
  allChecks = false;
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecks) {
  console.log('✅ All optimizations properly implemented!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run start');
  console.log('4. Test all pages');
  console.log('5. Run bundle analyzer: set ANALYZE=true && npm run build');
} else {
  console.log('❌ Some checks failed. Please review the output above.');
  console.log('\nRefer to PERFORMANCE_OPTIMIZATION_IMPLEMENTATION.md for details.');
}
console.log('='.repeat(50));

process.exit(allChecks ? 0 : 1);
