const dotenv = require('dotenv');
const connectDB = require('../db');
const Product = require('../models/Product');

dotenv.config();

// Sample dummy products data with SVG images
const dummyProducts = [
  {
    title: 'iPhone 13 Pro',
    price: 999.99,
    description: 'Latest iPhone with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion',
    category: 'Electronics',
    image: '/images/electronics/iphone.svg'
  },
  {
    title: 'Sony WH-1000XM4',
    price: 349.99,
    description: 'Industry-leading noise cancellation wireless headphones with 30 hour battery life and exceptional sound quality',
    category: 'Electronics',
    image: '/images/electronics/headphones.svg'
  },
  {
    title: 'Nike Air Zoom Pegasus 38',
    price: 120.99,
    description: 'Responsive running shoes with Nike React foam and Zoom Air unit for ultimate comfort and performance',
    category: 'Sports',
    image: '/images/sports/nike.svg'
  },
  {
    title: 'Breville Barista Express',
    price: 699.99,
    description: 'Semi-automatic espresso machine with built-in grinder, precise extraction, and micro-foam milk texturing',
    category: 'Home',
    image: '/images/home/espresso.svg'
  },
  {
    title: 'North Face Borealis Backpack',
    price: 89.99,
    description: 'Durable 28L backpack with FlexVent suspension system, padded laptop sleeve, and water-resistant finish',
    category: 'Fashion',
    image: '/images/fashion/backpack.svg'
  },
  {
    title: 'Apple Watch Series 7',
    price: 399.99,
    description: 'Advanced smartwatch with always-on Retina display, ECG app, blood oxygen sensor, and fitness tracking',
    category: 'Electronics',
    image: '/images/electronics/watch.svg'
  },
  {
    title: 'Samsung QLED 4K TV',
    price: 1299.99,
    description: '65-inch QLED 4K Smart TV with Quantum HDR, Adaptive Picture, and Object Tracking Sound',
    category: 'Electronics',
    image: '/images/electronics/tv.svg'
  },
  {
    title: 'Adidas Ultraboost 22',
    price: 189.99,
    description: 'High-performance running shoes with responsive Boost midsole, Primeknit+ upper, and Linear Energy Push system',
    category: 'Sports',
    image: '/images/sports/adidas.svg'
  },
  {
    title: 'Dyson V11 Absolute',
    price: 599.99,
    description: 'Cordless vacuum cleaner with intelligent suction, LCD screen, and up to 60 minutes of powerful cleaning',
    category: 'Home',
    image: '/images/home/vacuum.svg'
  },
  {
    title: 'Ray-Ban Aviator Sunglasses',
    price: 154.99,
    description: 'Classic aviator sunglasses with polarized lenses, metal frame, and 100% UV protection',
    category: 'Fashion',
    image: '/images/fashion/sunglasses.svg'
  },
  {
    title: 'Bose QuietComfort Earbuds',
    price: 279.99,
    description: 'True wireless noise cancelling earbuds with high-fidelity audio, touch controls, and weather-resistant design',
    category: 'Electronics',
    image: '/images/electronics/earbuds.svg'
  },
  {
    title: 'Levi\'s 501 Original Jeans',
    price: 69.99,
    description: 'Iconic straight fit jeans with button fly, five-pocket styling, and signature Levi\'s leather patch',
    category: 'Fashion',
    image: '/images/fashion/jeans.svg'
  }
];

async function fetchAndStoreProducts() {
  await connectDB();

  try {
    // Clear existing products
    await Product.deleteMany();
    
    // Insert dummy products
    await Product.insertMany(dummyProducts);

    console.log('✅ Dummy products saved to MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fetchAndStoreProducts();
