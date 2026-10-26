import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  ChevronDown,
  Menu,
  Filter,
  ArrowRight,
  Check,
  Star,
  RefreshCw,
  ShieldCheck,
  Truck,
  Sparkles,
  SlidersHorizontal,
  Plus,
  Minus,
  Eye,
  CheckCircle2,
  MapPin,
  Info,
  Users,
  Award,
  ChevronRight,
  Share2,
} from 'lucide-react';;
// --- CURRENCY & MOCK DATA ---
const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, code: 'INR' },
  USD: { symbol: '$', rate: 0.012, code: 'USD' }
};

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Zariya Bridal Silk Lehenga',
    category: 'Lehengas',
    occasion: 'Wedding Edit',
    priceINR: 185000,
    rating: 4.9,
    reviewsCount: 28,
    isNew: true,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Maroon', hex: '#682C35' },
      { name: 'Antique Gold', hex: '#B49A65' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Pure Mulberry Silk with Handcrafted Zardozi & Dori Embroidery',
    care: 'Dry clean only. Store wrapped in muslin fabric to retain lustre.',
    description: 'An ode to royal heritage, the Zariya Lehenga is crafted in sumptuous handloom silk, adorned with traditional dabka, sequins, and hand-embroidered floral motifs that evoke timeless grandeur.',
    craftsmanship: 'Hand-embroidered by master artisans over 320 hours in Jaipur.'
  },
  {
    id: 'p2',
    name: 'Gulnaar Chanderi Silk Saree',
    category: 'Sarees',
    occasion: 'Festive Classics',
    priceINR: 48500,
    rating: 4.8,
    reviewsCount: 42,
    isNew: true,
    isBestseller: false,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sandstone Beige', hex: '#C8AE8D' },
      { name: 'Soft Champagne', hex: '#E9DDC9' }
    ],
    sizes: ['Unstitched (With Blouse Piece)'],
    fabric: 'Chanderi Silk with Real Zari Woven Borders',
    care: 'Gentle dry clean only. Avoid spraying perfume directly on zari work.',
    description: 'Lightweight yet opulent, the Gulnaar Chanderi Silk Saree radiates understated sophistication. Featuring hand-woven zari motifs and an unstitched contrast silk blouse piece.',
    craftsmanship: 'Handwoven in the historic town of Chanderi, Madhya Pradesh.'
  },
  {
    id: 'p3',
    name: 'Noor Embroidered Anarkali',
    category: 'Anarkalis',
    occasion: 'Festive Classics',
    priceINR: 62000,
    rating: 5.0,
    reviewsCount: 19,
    isNew: false,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#F8F4ED' },
      { name: 'Deep Maroon', hex: '#682C35' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Georgette Silk with Organza Embroidered Dupatta',
    care: 'Dry clean recommended. Iron on low heat on reverse side.',
    description: 'Designed for effortless movement, the Noor Anarkali features a cascading floor-length silhouette enhanced with delicate pearl wirework, paired with tailored trousers and a sheer organza dupatta.',
    craftsmanship: 'Intricate chikankari motifs finished with subtle hand-sewn pearl beads.'
  },
  {
    id: 'p4',
    name: 'Meher Raw Silk Kurta Set',
    category: 'Kurta Sets',
    occasion: 'Everyday Elegance',
    priceINR: 34000,
    rating: 4.7,
    reviewsCount: 31,
    isNew: false,
    isBestseller: false,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Muted Antique Gold', hex: '#B49A65' },
      { name: 'Warm Ivory', hex: '#F8F4ED' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Handspun Raw Silk with Silk Pants',
    care: 'Dry clean only.',
    description: 'Clean architectural lines meet modern Indian tailoring. The Meher Kurta Set combines hand-embroidered neckline details with comfortable straight-fit trousers for versatile elegance.',
    craftsmanship: 'Tailored using traditional seam structures with modern relaxed fit.'
  },
  {
    id: 'p5',
    name: 'Ananya Zardozi Jacket Set',
    category: 'Contemporary Ethnic',
    occasion: 'Contemporary Ethnic',
    priceINR: 78000,
    rating: 4.9,
    reviewsCount: 15,
    isNew: true,
    isBestseller: false,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Noir', hex: '#292623' },
      { name: 'Champagne', hex: '#E9DDC9' }
    ],
    sizes: ['S', 'M', 'L'],
    fabric: 'Structured Velvet & Raw Silk Trousers',
    care: 'Dry clean only.',
    description: 'A fusion masterpiece featuring an embroidered open-front velvet jacket paired with cropped silk trousers and a minimalist silk inner tunic.',
    craftsmanship: 'Heavy metal thread zardozi work rendered on plush silk velvet.'
  },
  {
    id: 'p6',
    name: 'Tara Organza Tissue Saree',
    category: 'Sarees',
    occasion: 'Wedding Edit',
    priceINR: 52000,
    rating: 4.9,
    reviewsCount: 23,
    isNew: false,
    isBestseller: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Soft Champagne', hex: '#E9DDC9' },
      { name: 'Rose Gold', hex: '#C8AE8D' }
    ],
    sizes: ['Unstitched (With Blouse Piece)'],
    fabric: 'Pure Silk Organza Tissue with Cutwork Border',
    care: 'Dry clean only. Steam iron gently.',
    description: 'Ethereal and luminous, the Tara Saree features woven metallic metallic warp, creating a subtle shimmer that gracefully catches evening light.',
    craftsmanship: 'Hand-cut scalloped borders finished with micro-bead embellishments.'
  }
];

const REVIEWS_DATA = [
  {
    id: 'r1',
    author: 'Sunita Mehra',
    location: 'Mumbai, India',
    rating: 5,
    title: 'Exquisite Quality and Craftsmanship',
    comment: 'The Zariya Lehenga exceeded every expectation. The weight of the handloom silk and the precision of the zardozi embroidery felt royal. Beautifully packaged with pristine attention to detail.',
    productName: 'Zariya Bridal Silk Lehenga',
    date: 'October 12, 2026'
  },
  {
    id: 'r2',
    author: 'Rhea Kothari',
    location: 'London, UK',
    rating: 5,
    title: 'Timeless Elegance & Fast Shipping',
    comment: 'Ordered the Gulnaar Saree for my sister’s sangeet. The drape is lightweight yet structured, and the champagne tone is so regal. Arrived in London in just 4 days.',
    productName: 'Gulnaar Chanderi Silk Saree',
    date: 'September 28, 2026'
  },
  {
    id: 'r3',
    author: 'Priya Nambiar',
    location: 'Bengaluru, India',
    rating: 5,
    title: 'A Modern Heirloom',
    comment: 'The Noor Anarkali is a head-turner. Comfortable to dance in all evening while looking incredibly chic. Worth every single rupee!',
    productName: 'Noor Embroidered Anarkali',
    date: 'August 14, 2026'
  }
];

// Main Application Component
export default function App() {
  // State management
  const [currency, setCurrency] = useState('INR');
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeOccasion, setActiveOccasion] = useState('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Scroll listener for translucent/solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast notifier function
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Format currency helper
  const formatPrice = (priceINR) => {
    const curr = CURRENCIES[currency];
    const converted = Math.round(priceINR * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast('Removed from your Wishlist');
    } else {
      setWishlist([...wishlist, product]);
      showToast('Saved to your Wishlist');
    }
  };

  // Cart operations
  const addToCart = (product, size, color) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : 'Free Size');
    const chosenColor = color || (product.colors ? product.colors[0].name : '');

    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: 1
        }
      ]);
    }
    showToast('Added to Shopping Bag');
    setIsCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity = newQty;
    }
    setCart(updated);
  };

  // Cart totals
  const subtotalINR = cart.reduce((acc, item) => acc + (item.priceINR * item.quantity), 0);
  const discountAmountINR = (subtotalINR * discountPercent) / 100;
  const finalTotalINR = Math.max(0, subtotalINR - discountAmountINR);

  // Apply promo
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AAVIRA10') {
      setDiscountPercent(10);
      showToast('10% Heritage Discount Applied!');
    } else {
      showToast('Invalid Code. Try "AAVIRA10"');
    }
  };

  // Pincode Check Simulator
  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length >= 5) {
      setDeliveryResult(`Complimentary Express Delivery available to ${pincode} by 3-5 business days.`);
    } else {
      setDeliveryResult('Please enter a valid zip or pincode.');
    }
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchOcc = activeOccasion === 'All' || p.occasion === activeOccasion;
      const matchSize = selectedSizeFilter === 'All' || (p.sizes && p.sizes.includes(selectedSizeFilter));
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchOcc && matchSize && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceINR - b.priceINR;
      if (sortBy === 'price-high') return b.priceINR - a.priceINR;
      if (sortBy === 'newest') return b.isNew ? 1 : -1;
      return 0; // Default featured
    });
  }, [activeCategory, activeOccasion, selectedSizeFilter, searchQuery, sortBy]);

  return (
    <div className="bg-[#F8F4ED] text-[#292623] font-sans antialiased selection:bg-[#682C35] selection:text-[#F8F4ED] min-h-screen flex flex-col">

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292623] text-[#F8F4ED] px-6 py-3 rounded-none shadow-2xl flex items-center space-x-3 text-xs tracking-widest uppercase border-l-2 border-[#B49A65] animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#B49A65]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- 1. ANNOUNCEMENT BAR --- */}
      <div className="bg-[#292623] text-[#E9DDC9] text-[11px] font-medium tracking-[0.2em] py-2 px-4 text-center uppercase flex justify-between items-center border-b border-[#B49A65]/20">
        <div className="hidden sm:block w-1/4 text-left text-[10px] text-[#C8AE8D]">
          HANDLOOM ARTISANRY
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center space-x-2">
          <span>An ode to timeless Indian craftsmanship</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-[#B49A65]">Complimentary global express shipping on orders over ₹25,000</span>
        </div>
        <div className="hidden sm:flex w-1/4 justify-end items-center space-x-4 text-[10px]">
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="hover:text-[#B49A65] transition-colors flex items-center space-x-1"
          >
            <span>CURRENCY: {currency}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* --- 2. HEADER & NAVIGATION --- */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#F8F4ED]/95 backdrop-blur-md shadow-sm py-4 border-b border-[#C8AE8D]/30' : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-[0.18em] uppercase">
            <a href="#catalog" onClick={() => setActiveCategory('All')} className="hover:text-[#682C35] transition-colors">Shop</a>
            <a href="#catalog" onClick={() => { setActiveCategory('All'); setSortBy('newest'); }} className="hover:text-[#682C35] transition-colors">New Arrivals</a>
            <a href="#collections" className="hover:text-[#682C35] transition-colors">Collections</a>
            <a href="#story" className="hover:text-[#682C35] transition-colors">Our Story</a>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-[#292623] hover:text-[#682C35] p-1"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center Brand Logo */}
          <div className="text-center">
            <a href="#" className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] text-[#292623] font-light hover:opacity-80 transition-opacity uppercase">
              AAVIRA
            </a>
            <span className="block text-[8px] tracking-[0.4em] text-[#B49A65] uppercase font-sans -mt-1">HAUTE COUTURE</span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-5 sm:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-[#682C35] transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hover:text-[#682C35] transition-colors p-1 relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#682C35] text-[#F8F4ED] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[#682C35] transition-colors p-1 relative flex items-center space-x-1"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="text-xs font-semibold tracking-wider">({cart.reduce((a, c) => a + c.quantity, 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- 3. CINEMATIC HERO SECTION --- */}
      <section className="relative h-[85vh] sm:h-[90vh] w-full bg-[#292623] overflow-hidden flex items-center justify-center">
        {/* Editorial Fashion Photography Background with Pan/Zoom Fallback */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70 scale-105 animate-pulse transition-transform duration-10000" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80')`
        }}></div>

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#292623] via-[#292623]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#292623]/60 via-transparent to-[#292623]/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 text-[#F8F4ED]">
          <p className="text-[10px] sm:text-xs font-medium tracking-[0.4em] text-[#B49A65] uppercase mb-4">
            The Art of Indian Elegance
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight tracking-wide mb-6">
            Tradition, Woven <br className="hidden sm:inline" />
            <span className="italic font-light text-[#E9DDC9]">Into Tomorrow.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#E9DDC9]/90 font-light max-w-xl mx-auto leading-relaxed mb-8 tracking-wide">
            Discover thoughtfully crafted handloom ensembles that celebrate centuries of rich artistry, modern silhouettes, and the grandeur of every occasion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#682C35] text-[#F8F4ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B49A65] transition-all duration-300 shadow-lg border border-[#B49A65]/30"
            >
              Explore Collection
            </a>
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#F8F4ED] border border-[#E9DDC9]/40 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F8F4ED]/10 transition-all duration-300 backdrop-blur-xs"
            >
              Discover Our Story
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#E9DDC9]/60 text-[9px] tracking-[0.3em] uppercase">
          <span className="mb-2">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#B49A65] to-transparent animate-bounce"></div>
        </div>
      </section>

      {/* --- 4. FEATURED EDITORIAL COLLECTIONS ("Dressed in Heritage") --- */}
      <section id="collections" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Curated Edits</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292623] mt-2 mb-3">Dressed in Heritage</h2>
          <p className="text-xs text-[#292623]/70 leading-relaxed tracking-wider">
            Pieces that honour our roots while embracing the way we live today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Wedding Edit',
              desc: 'Bridal masterpieces & heirloom silks',
              img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
              occasion: 'Wedding Edit'
            },
            {
              title: 'Festive Classics',
              desc: 'Vibrant drapes & intricate zari details',
              img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
              occasion: 'Festive Classics'
            },
            {
              title: 'Everyday Elegance',
              desc: 'Refined handspun kurtas for fluid ease',
              img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
              occasion: 'Everyday Elegance'
            },
            {
              title: 'Contemporary Ethnic',
              desc: 'Modern tailored jackets & co-ord sets',
              img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
              occasion: 'Contemporary Ethnic'
            }
          ].map((col, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveOccasion(col.occasion);
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-[420px] overflow-hidden cursor-pointer shadow-sm border border-[#C8AE8D]/20"
            >
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292623]/80 via-[#292623]/20 to-transparent transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#F8F4ED] transform transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="font-serif text-2xl tracking-wide mb-1">{col.title}</h3>
                <p className="text-[11px] text-[#E9DDC9] font-light tracking-wider opacity-90 mb-4">{col.desc}</p>
                <span className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-[#B49A65] group-hover:text-[#F8F4ED] transition-colors">
                  Explore Edit <ChevronRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. INTERACTIVE PRODUCT CATALOG & FILTERS ("New Expressions of Tradition") --- */}
      <section id="catalog" className="py-16 bg-[#E9DDC9]/30 border-y border-[#C8AE8D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#C8AE8D]/30">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Handcrafted Masterpieces</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292623] mt-1">New Expressions of Tradition</h2>
            </div>

            {/* Sort & Count Controls */}
            <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end space-x-4">
              <span className="text-xs text-[#292623]/70 font-medium">
                Showing {filteredProducts.length} Creation{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-xs uppercase tracking-wider text-[#292623]/60 hidden sm:inline">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F4ED] text-xs border border-[#C8AE8D]/60 px-3 py-2 text-[#292623] focus:outline-none focus:border-[#682C35] rounded-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Pills / Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-[#292623]/60 mr-2 flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Category:
            </span>
            {['All', 'Sarees', 'Lehengas', 'Anarkalis', 'Kurta Sets', 'Contemporary Ethnic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 transition-all uppercase tracking-wider text-[11px] ${activeCategory === cat
                  ? 'bg-[#682C35] text-[#F8F4ED] shadow-sm'
                  : 'bg-[#F8F4ED] text-[#292623] hover:bg-[#C8AE8D]/30 border border-[#C8AE8D]/40'
                  }`}
              >
                {cat}
              </button>
            ))}

            {(activeCategory !== 'All' || activeOccasion !== 'All') && (
              <button
                onClick={() => { setActiveCategory('All'); setActiveOccasion('All'); }}
                className="ml-auto text-[11px] text-[#682C35] underline underline-offset-4 hover:text-[#292623]"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#F8F4ED] border border-dashed border-[#C8AE8D]">
              <p className="font-serif text-2xl text-[#292623] mb-2">No items match your selected filters</p>
              <p className="text-xs text-[#292623]/60 mb-6">Try clearing your filters or search terms to discover our full collection.</p>
              <button
                onClick={() => { setActiveCategory('All'); setActiveOccasion('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 bg-[#292623] text-[#F8F4ED] text-xs uppercase tracking-widest hover:bg-[#682C35] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#F8F4ED] border border-[#C8AE8D]/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#292623]/5 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} detail`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-[#682C35] text-[#F8F4ED] text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-[#B49A65] text-[#292623] text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                          Artisan Select
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F8F4ED]/80 backdrop-blur-xs flex items-center justify-center text-[#292623] hover:text-[#682C35] hover:bg-[#F8F4ED] transition-colors"
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === product.id) ? 'fill-[#682C35] text-[#682C35]' : ''}`} />
                    </button>

                    {/* Quick View Hover Overlay Button */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#292623]/80 via-[#292623]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="w-full py-2.5 bg-[#F8F4ED] text-[#292623] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#682C35] hover:text-[#F8F4ED] transition-colors flex items-center justify-center"
                      >
                        <Eye className="w-3.5 h-3.5 mr-2" /> Quick View Details
                      </button>
                    </div>
                  </div>

                  {/* Product Details Card Bottom */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#292623]/60 mb-1">
                        <span className="uppercase tracking-wider font-medium">{product.category}</span>
                        <div className="flex items-center text-[#B49A65]">
                          <Star className="w-3 h-3 fill-current mr-1" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="font-serif text-lg text-[#292623] hover:text-[#682C35] cursor-pointer transition-colors mb-2 font-medium"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-[#292623]/70 line-clamp-2 mb-4 leading-relaxed">
                        {product.fabric}
                      </p>
                    </div>

                    {/* Price and Add CTA */}
                    <div className="pt-3 border-t border-[#C8AE8D]/30 flex items-center justify-between">
                      <span className="font-serif text-base font-semibold text-[#292623]">
                        {formatPrice(product.priceINR)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="text-[10px] uppercase tracking-widest text-[#682C35] font-semibold hover:text-[#292623] transition-colors flex items-center"
                      >
                        Add to Bag <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- 6. BRAND STORYTELLING SECTION ("Rooted in Heritage. Made for Today.") --- */}
      <section id="story" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Asymmetrical Image Layout */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                alt="Artisan loom craftsmanship"
                className="w-full h-full object-cover shadow-xl border border-[#C8AE8D]/40"
              />
            </div>
            {/* Overlay Accent Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-8 bg-[#292623] text-[#F8F4ED] p-6 max-w-xs shadow-2xl border border-[#B49A65]/40 hidden sm:block">
              <p className="font-serif italic text-lg text-[#E9DDC9] mb-2">"300+ Hours of Craftsmanship"</p>
              <p className="text-[10px] text-[#C8AE8D] tracking-wider leading-relaxed">
                Every motif is individually traced and embroidered by third-generation master artisans across Rajasthan & Bengal.
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#292623] leading-tight font-normal">
              Rooted in Heritage. <br />
              <span className="italic font-light text-[#682C35]">Made for Today.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#292623]/80 leading-relaxed font-light tracking-wide">
              Every thread carries a story. Inspired by the architectural richness of Indian royal courtyards and the delicate artistry of handloom textiles, AAVIRA brings together centuries of craft with contemporary grace.
            </p>

            <p className="text-xs sm:text-sm text-[#292623]/80 leading-relaxed font-light tracking-wide">
              We design non-transient heirlooms — pieces created to be worn on cherished days and passed down through generations.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#C8AE8D]/30">
              <div>
                <h4 className="font-serif text-2xl text-[#682C35]">100%</h4>
                <p className="text-[10px] uppercase tracking-wider text-[#292623]/70">Pure Natural Silks & Cottons</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[#682C35]">450+</h4>
                <p className="text-[10px] uppercase tracking-wider text-[#292623]/70">Master Artisan Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. CRAFTSMANSHIP DETAILS HOTSPOT GALLERY --- */}
      <section className="py-20 bg-[#292623] text-[#F8F4ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">The Anatomy of Artistry</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#E9DDC9] mt-2 mb-3">Beauty in Every Detail</h2>
            <p className="text-xs text-[#E9DDC9]/70 leading-relaxed tracking-wider">
              Thoughtful details. Beautiful textures. Handcrafted elements designed to be treasured forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real Zari Metalwork',
                desc: 'Fine metallic threads spun around silk cores, woven seamlessly into ornate border motifs.',
                img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Hand-Cut Bandhani & Chikankari',
                desc: 'Painstaking tie-dye and delicate tonal embroidery executed entirely by master handcraft artists.',
                img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Pure Mulberry Silk',
                desc: 'Unadulterated organic weaves that breathe effortlessly and drape with unparalleled royal fluidity.',
                img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1f1d1b] border border-[#B49A65]/20 p-6 flex flex-col justify-between group hover:border-[#B49A65]/60 transition-colors">
                <div>
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#E9DDC9] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#E9DDC9]/70 leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#B49A65]/20 flex items-center text-[10px] uppercase tracking-widest text-[#B49A65]">
                  <Award className="w-3.5 h-3.5 mr-2" /> Certified Craftsmanship
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. CLIENT TESTIMONIALS --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Client Reflections</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292623] mt-2 mb-12">Voices of Elegance</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {REVIEWS_DATA.map((rev) => (
            <div key={rev.id} className="bg-[#F8F4ED] p-8 border border-[#C8AE8D]/30 flex flex-col justify-between relative shadow-xs">
              <div>
                <div className="flex text-[#B49A65] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-lg text-[#292623] mb-3 font-medium">"{rev.title}"</h3>
                <p className="text-xs text-[#292623]/80 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8AE8D]/20">
                <p className="text-xs font-semibold text-[#292623]">{rev.author}</p>
                <p className="text-[10px] text-[#292623]/50 uppercase tracking-wider">{rev.location} • <span className="text-[#682C35]">{rev.productName}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 9. NEWSLETTER SUBSCRIPTION --- */}
      <section className="py-16 bg-[#E9DDC9] border-t border-[#C8AE8D]/40">
        <div className="max-w-3xl mx-auto text-center px-4">
          <span className="text-[10px] tracking-[0.3em] text-[#682C35] uppercase font-semibold">Private Journal</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292623] mt-1 mb-3">A Note from Our World</h2>
          <p className="text-xs text-[#292623]/70 mb-8 max-w-md mx-auto leading-relaxed">
            Discover new collection previews, bridal styling consultations, and stories from the art of Indian dressing.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 bg-[#682C35] text-[#F8F4ED] text-xs tracking-widest uppercase flex items-center justify-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#B49A65]" />
              <span>Welcome to the AAVIRA Inner Circle. Check your inbox shortly.</span>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterSuccess(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-[#F8F4ED] border border-[#C8AE8D] px-4 py-3 text-xs text-[#292623] placeholder-[#292623]/50 focus:outline-none focus:border-[#682C35]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#682C35] text-[#F8F4ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#292623] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-[10px] text-[#292623]/50 mt-4">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* --- 10. MULTI-COLUMN FOOTER --- */}
      <footer className="bg-[#292623] text-[#F8F4ED] pt-16 pb-12 border-t border-[#B49A65]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#B49A65]/20">

            {/* Brand Intro */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-2xl tracking-[0.25em] text-[#E9DDC9]">AAVIRA</h3>
              <p className="text-xs text-[#E9DDC9]/70 max-w-sm leading-relaxed font-light">
                A contemporary haute couture house bridging classical Indian textile traditions with modern architectural silhouettes. Designed and hand-embroidered in India.
              </p>
              <div className="flex space-x-4 text-[#B49A65] pt-2">
                <a href="#" className="hover:text-[#F8F4ED] transition-colors"><Heart className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[#F8F4ED] transition-colors"><Share2 className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[#F8F4ED] transition-colors"><Users className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#B49A65] font-semibold mb-4">Boutique</h4>
              <ul className="space-y-2 text-xs text-[#E9DDC9]/80 font-light">
                <li><a href="#catalog" onClick={() => setActiveCategory('Sarees')} className="hover:text-[#B49A65] transition-colors">Sarees & Drapes</a></li>
                <li><a href="#catalog" onClick={() => setActiveCategory('Lehengas')} className="hover:text-[#B49A65] transition-colors">Bridal Lehengas</a></li>
                <li><a href="#catalog" onClick={() => setActiveCategory('Anarkalis')} className="hover:text-[#B49A65] transition-colors">Silk Anarkalis</a></li>
                <li><a href="#catalog" onClick={() => setActiveCategory('Kurta Sets')} className="hover:text-[#B49A65] transition-colors">Kurta Sets</a></li>
                <li><a href="#catalog" onClick={() => setActiveCategory('Contemporary Ethnic')} className="hover:text-[#B49A65] transition-colors">Contemporary Co-ords</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#B49A65] font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-xs text-[#E9DDC9]/80 font-light">
                <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#B49A65] transition-colors">Size & Fit Guide</button></li>
                <li><a href="#" className="hover:text-[#B49A65] transition-colors">Bespoke Bridal Appointments</a></li>
                <li><a href="#" className="hover:text-[#B49A65] transition-colors">Worldwide Shipping Info</a></li>
                <li><a href="#" className="hover:text-[#B49A65] transition-colors">Returns & Garment Care</a></li>
                <li><a href="#" className="hover:text-[#B49A65] transition-colors">Contact Our Stylists</a></li>
              </ul>
            </div>

            {/* Atelier Info */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#B49A65] font-semibold mb-4">Flagship Atelier</h4>
              <p className="text-xs text-[#E9DDC9]/80 leading-relaxed font-light mb-2">
                24 Heritage Courtyard, Mehrauli<br />
                New Delhi 110030, India
              </p>
              <p className="text-xs text-[#B49A65]">concierge@aavira.com</p>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#E9DDC9]/50 tracking-wider">
            <p>© 2026 AAVIRA HAUTE COUTURE. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-[#B49A65]">PRIVACY POLICY</a>
              <a href="#" className="hover:text-[#B49A65]">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-[#B49A65]">ARTISAN ETHICS</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* --- MODALS, DRAWERS & OVERLAYS --- */}
      {/* ========================================================================= */}

      {/* --- A. PRODUCT DETAIL MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#292623]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#F8F4ED] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#C8AE8D] relative shadow-2xl flex flex-col md:flex-row">

            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-[#F8F4ED] p-2 hover:bg-[#682C35] hover:text-[#F8F4ED] transition-colors"
              aria-label="Close product modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Gallery */}
            <div className="md:w-1/2 p-6 bg-[#292623]/5 space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-white">
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              {selectedProduct.images[1] && (
                <div className="grid grid-cols-2 gap-2">
                  <img src={selectedProduct.images[0]} alt="Angle 1" className="aspect-square object-cover cursor-pointer border border-[#C8AE8D]" />
                  <img src={selectedProduct.images[1]} alt="Angle 2" className="aspect-square object-cover cursor-pointer border border-[#C8AE8D]" />
                </div>
              )}
            </div>

            {/* Right Product Options & Details */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">
                  {selectedProduct.category} • {selectedProduct.occasion}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#292623] mt-1 mb-2 font-medium">
                  {selectedProduct.name}
                </h2>

                <p className="font-serif text-xl text-[#682C35] font-semibold mb-4">
                  {formatPrice(selectedProduct.priceINR)}
                </p>

                <p className="text-xs text-[#292623]/80 leading-relaxed font-light mb-6">
                  {selectedProduct.description}
                </p>

                {/* Color Swatches */}
                {selectedProduct.colors && (
                  <div className="mb-6">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292623] mb-2">
                      Color Motif: <span className="font-normal text-[#292623]/70">{selectedProduct.colors[0].name}</span>
                    </label>
                    <div className="flex space-x-3">
                      {selectedProduct.colors.map((clr, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: clr.hex }}
                          className="w-6 h-6 rounded-full border-2 border-[#F8F4ED] outline outline-1 outline-[#C8AE8D] cursor-pointer"
                          title={clr.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {selectedProduct.sizes && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#292623]">
                        Select Size
                      </label>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[10px] uppercase tracking-wider text-[#682C35] underline hover:text-[#292623]"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          className="px-3.5 py-2 border border-[#C8AE8D] text-xs hover:bg-[#682C35] hover:text-[#F8F4ED] hover:border-[#682C35] transition-colors"
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Checker */}
                <div className="p-4 bg-[#E9DDC9]/40 border border-[#C8AE8D]/40 mb-6">
                  <label className="block text-[10px] uppercase tracking-wider text-[#292623] font-semibold mb-2">
                    Check Delivery & Dispatch
                  </label>
                  <form onSubmit={checkDelivery} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Zip / Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="bg-[#F8F4ED] border border-[#C8AE8D] px-3 py-1.5 text-xs text-[#292623] w-full focus:outline-none"
                    />
                    <button type="submit" className="px-4 py-1.5 bg-[#292623] text-[#F8F4ED] text-[10px] uppercase tracking-wider">
                      Check
                    </button>
                  </form>
                  {deliveryResult && (
                    <p className="text-[10px] text-[#682C35] mt-2 font-medium">{deliveryResult}</p>
                  )}
                </div>

                {/* Craftsmanship Highlights */}
                <div className="space-y-2 text-xs text-[#292623]/70 border-t border-[#C8AE8D]/30 pt-4">
                  <p><strong>Fabric:</strong> {selectedProduct.fabric}</p>
                  <p><strong>Garment Care:</strong> {selectedProduct.care}</p>
                  <p><strong>Atelier Heritage:</strong> {selectedProduct.craftsmanship}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#C8AE8D]/40 flex gap-4">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-grow py-3.5 bg-[#682C35] text-[#F8F4ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#292623] transition-colors"
                >
                  Add to Shopping Bag
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="p-3.5 border border-[#C8AE8D] text-[#292623] hover:bg-[#682C35] hover:text-[#F8F4ED] transition-colors"
                  aria-label="Wishlist item"
                >
                  <Heart className={`w-5 h-5 ${wishlist.some(w => w.id === selectedProduct.id) ? 'fill-[#682C35] text-[#682C35]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- B. SHOPPING CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#292623]/60 backdrop-blur-xs flex justify-end">
          <div className="bg-[#F8F4ED] w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in">

            {/* Header */}
            <div className="p-6 border-b border-[#C8AE8D]/40 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#682C35]" />
                <h3 className="font-serif text-xl text-[#292623]">Your Shopping Bag</h3>
                <span className="text-xs text-[#292623]/60">({cart.reduce((a, c) => a + c.quantity, 0)})</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-[#682C35]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#E9DDC9]/50 p-3 text-center border-b border-[#C8AE8D]/30">
              {subtotalINR >= 25000 ? (
                <p className="text-[11px] text-[#682C35] font-semibold flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 mr-1" /> You qualify for Complimentary Global Express Delivery
                </p>
              ) : (
                <p className="text-[10px] text-[#292623]/80">
                  Add <span className="font-semibold text-[#682C35]">{formatPrice(25000 - subtotalINR)}</span> more to unlock Complimentary Express Shipping.
                </p>
              )}
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#292623]/60">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#682C35]" />
                  <p className="font-serif text-lg text-[#292623]">Your bag is currently empty</p>
                  <p className="text-xs mt-1 mb-6">Discover our latest silk sarees and bridal creations.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#292623] text-[#F8F4ED] text-xs uppercase tracking-widest"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex space-x-4 border-b border-[#C8AE8D]/30 pb-4">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover border border-[#C8AE8D]" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-base text-[#292623] font-medium">{item.name}</h4>
                          <button onClick={() => updateQuantity(idx, -item.quantity)} className="text-[#292623]/40 hover:text-[#682C35]">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase text-[#292623]/60">Size: {item.selectedSize}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#C8AE8D]">
                          <button onClick={() => updateQuantity(idx, -1)} className="px-2 py-0.5 text-xs hover:bg-[#E9DDC9]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(idx, 1)} className="px-2 py-0.5 text-xs hover:bg-[#E9DDC9]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif text-sm font-semibold text-[#682C35]">
                          {formatPrice(item.priceINR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#E9DDC9]/40 border-t border-[#C8AE8D]/40 space-y-4">

                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (Try AAVIRA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-[#F8F4ED] border border-[#C8AE8D] px-3 py-1.5 text-xs flex-grow focus:outline-none uppercase"
                  />
                  <button type="submit" className="px-4 py-1.5 bg-[#292623] text-[#F8F4ED] text-[10px] uppercase tracking-wider">
                    Apply
                  </button>
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-1.5 text-xs text-[#292623]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotalINR)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#682C35]">
                      <span>Heritage Discount ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmountINR)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Estimate</span>
                    <span>{subtotalINR >= 25000 ? 'Complimentary' : formatPrice(1500)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-semibold text-[#292623] pt-2 border-t border-[#C8AE8D]/40">
                    <span>Estimated Total</span>
                    <span>{formatPrice(finalTotalINR + (subtotalINR >= 25000 ? 0 : 1500))}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast('Redirecting to Secure Luxury Checkout Simulator...');
                  }}
                  className="w-full py-4 bg-[#682C35] text-[#F8F4ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#292623] transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B49A65]" />
                  <span>Proceed to Secure Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- C. WISHLIST DRAWER --- */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#292623]/60 backdrop-blur-xs flex justify-end">
          <div className="bg-[#F8F4ED] w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in">
            <div className="p-6 border-b border-[#C8AE8D]/40 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#682C35] fill-[#682C35]" />
                <h3 className="font-serif text-xl text-[#292623]">Saved Creations</h3>
                <span className="text-xs text-[#292623]/60">({wishlist.length})</span>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:text-[#682C35]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-[#292623]/60">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#682C35]" />
                  <p className="font-serif text-lg text-[#292623]">Your wishlist is empty</p>
                  <p className="text-xs mt-1 mb-6">Heart your favorite lehengas and sarees to view them later.</p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div key={item.id} className="flex space-x-4 border-b border-[#C8AE8D]/30 pb-4">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover border border-[#C8AE8D]" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-base text-[#292623] font-medium">{item.name}</h4>
                        <p className="font-serif text-sm text-[#682C35] font-semibold mt-1">{formatPrice(item.priceINR)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          className="text-[10px] uppercase tracking-wider text-[#682C35] font-semibold underline"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-[10px] uppercase tracking-wider text-[#292623]/50 hover:text-[#682C35]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- D. LIVE SEARCH OVERLAY --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8F4ED]/98 backdrop-blur-md p-6 sm:p-12 overflow-y-auto animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Search AAVIRA Archive</span>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:text-[#682C35]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-8">
              <input
                type="text"
                autoFocus
                placeholder="Search by weave, garment (e.g. Silk Saree, Lehenga, Chanderi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#292623] py-4 text-xl sm:text-2xl font-serif text-[#292623] placeholder-[#292623]/30 focus:outline-none"
              />
              <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#292623]/40" />
            </div>

            {/* Quick Trending Suggestions */}
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-widest text-[#292623]/50 block mb-3">Trending Searches:</span>
              <div className="flex flex-wrap gap-2">
                {['Bridal Lehenga', 'Chanderi Silk Saree', 'Anarkali', 'Zardozi Jacket', 'Raw Silk Kurta'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-[#E9DDC9]/50 text-xs text-[#292623] hover:bg-[#682C35] hover:text-[#F8F4ED] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Results */}
            {searchQuery && (
              <div>
                <p className="text-xs uppercase tracking-widest text-[#B49A65] mb-4">
                  Matching Results ({filteredProducts.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsSearchOpen(false);
                      }}
                      className="flex space-x-3 p-3 bg-[#E9DDC9]/30 border border-[#C8AE8D]/30 cursor-pointer hover:border-[#682C35] transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-14 h-18 object-cover" />
                      <div>
                        <h5 className="font-serif text-sm font-medium text-[#292623]">{p.name}</h5>
                        <p className="text-[10px] text-[#292623]/60 uppercase">{p.category}</p>
                        <p className="font-serif text-xs text-[#682C35] font-semibold mt-1">{formatPrice(p.priceINR)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- E. SIZE GUIDE MODAL --- */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-[#292623]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F8F4ED] max-w-2xl w-full p-8 border border-[#C8AE8D] relative shadow-2xl">
            <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 p-2 hover:text-[#682C35]">
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-[0.3em] text-[#B49A65] uppercase font-semibold">Atelier Standard</span>
            <h3 className="font-serif text-2xl text-[#292623] mt-1 mb-6">Size & Fit Measurement Guide</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#C8AE8D] bg-[#E9DDC9]/50 text-[#292623] uppercase text-[10px] tracking-wider">
                    <th className="p-3">Size</th>
                    <th className="p-3">Bust (Inches)</th>
                    <th className="p-3">Waist (Inches)</th>
                    <th className="p-3">Hip (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C8AE8D]/30">
                  <tr><td className="p-3 font-semibold">XS</td><td className="p-3">32</td><td className="p-3">26</td><td className="p-3">36</td></tr>
                  <tr><td className="p-3 font-semibold">S</td><td className="p-3">34</td><td className="p-3">28</td><td className="p-3">38</td></tr>
                  <tr><td className="p-3 font-semibold">M</td><td className="p-3">36</td><td className="p-3">30</td><td className="p-3">40</td></tr>
                  <tr><td className="p-3 font-semibold">L</td><td className="p-3">38</td><td className="p-3">32</td><td className="p-3">42</td></tr>
                  <tr><td className="p-3 font-semibold">XL</td><td className="p-3">40</td><td className="p-3">34</td><td className="p-3">44</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#292623]/70 leading-relaxed font-light">
              * Note: Custom bespoke tailoring is available for all bridal orders. Contact our concierge atelier post order for direct measurements customization.
            </p>
          </div>
        </div>
      )}

      {/* --- F. MOBILE NAVIGATION MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8F4ED] p-6 flex flex-col justify-between lg:hidden animate-slide-in">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#C8AE8D]/30">
              <span className="font-serif text-2xl tracking-[0.2em] text-[#292623]">AAVIRA</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-[#292623]" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 mt-8 font-serif text-2xl text-[#292623]">
              <a
                href="#catalog"
                onClick={() => { setActiveCategory('All'); setMobileMenuOpen(false); }}
                className="hover:text-[#682C35]"
              >
                Entire Collection
              </a>
              <a
                href="#catalog"
                onClick={() => { setActiveCategory('Sarees'); setMobileMenuOpen(false); }}
                className="hover:text-[#682C35]"
              >
                Sarees & Handloom
              </a>
              <a
                href="#catalog"
                onClick={() => { setActiveCategory('Lehengas'); setMobileMenuOpen(false); }}
                className="hover:text-[#682C35]"
              >
                Bridal Lehengas
              </a>
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#682C35]"
              >
                Curated Occasions
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#682C35]"
              >
                Artisan Story
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#C8AE8D]/30 space-y-4">
            <button
              onClick={() => { setCurrency(currency === 'INR' ? 'USD' : 'INR'); }}
              className="text-xs uppercase tracking-wider text-[#292623]/80"
            >
              Currency Switcher: <span className="font-bold text-[#682C35]">{currency}</span>
            </button>
            <p className="text-[10px] text-[#292623]/50">© 2026 AAVIRA HAUTE COUTURE</p>
          </div>
        </div>
      )}

    </div>
  );
}