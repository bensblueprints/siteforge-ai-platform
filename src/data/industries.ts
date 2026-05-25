export interface Industry {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  sections: string[];
  color: string;
}

export const industryCategories = [
  'Home Services',
  'Professional Services',
  'Health & Wellness',
  'Food & Beverage',
  'Retail & Shopping',
  'Automotive',
  'Beauty & Personal Care',
  'Fitness & Recreation',
  'Education & Training',
  'Technology',
  'Construction & Trades',
  'Entertainment',
  'Travel & Hospitality',
  'Real Estate',
  'Legal & Financial',
  'Arts & Creative',
  'Pet Services',
  'Events & Weddings',
  'Cleaning & Maintenance',
  'Medical & Dental',
  'Other',
];

export const industries: Industry[] = [
  // Home Services
  { id: 'hvac', name: 'HVAC Services', category: 'Home Services', icon: 'Wind', description: 'Heating, ventilation, and air conditioning services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#6b46c1' },
  { id: 'plumbing', name: 'Plumbing', category: 'Home Services', icon: 'Droplets', description: 'Residential and commercial plumbing services', sections: ['hero', 'services', 'emergency', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'electrical', name: 'Electrical Services', category: 'Home Services', icon: 'Zap', description: 'Electrical installation and repair', sections: ['hero', 'services', 'about', 'projects', 'contact'], color: '#eab308' },
  { id: 'roofing', name: 'Roofing', category: 'Home Services', icon: 'Home', description: 'Roof installation, repair, and maintenance', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'landscaping', name: 'Landscaping', category: 'Home Services', icon: 'TreePine', description: 'Landscape design and maintenance', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'pest-control', name: 'Pest Control', category: 'Home Services', icon: 'Shield', description: 'Pest removal and prevention services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#ea580c' },
  { id: 'painting', name: 'Painting Services', category: 'Home Services', icon: 'Paintbrush', description: 'Interior and exterior painting', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'flooring', name: 'Flooring Installation', category: 'Home Services', icon: 'Grid3x3', description: 'Hardwood, tile, and carpet installation', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'garage-doors', name: 'Garage Door Services', category: 'Home Services', icon: 'Warehouse', description: 'Garage door installation and repair', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#be185d' },
  { id: 'windows', name: 'Window Installation', category: 'Home Services', icon: 'Square', description: 'Window replacement and installation', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#0d9488' },
  { id: 'moving', name: 'Moving Services', category: 'Home Services', icon: 'Truck', description: 'Residential and commercial moving', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'junk-removal', name: 'Junk Removal', category: 'Home Services', icon: 'Trash2', description: 'Waste removal and hauling services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#65a30d' },
  { id: 'handyman', name: 'Handyman Services', category: 'Home Services', icon: 'Wrench', description: 'General home repair and maintenance', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'carpentry', name: 'Carpentry', category: 'Home Services', icon: 'Hammer', description: 'Custom woodworking and cabinetry', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#92400e' },
  { id: 'fencing', name: 'Fencing', category: 'Home Services', icon: 'Fence', description: 'Fence installation and repair', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#15803d' },

  // Professional Services
  { id: 'accounting', name: 'Accounting & Bookkeeping', category: 'Professional Services', icon: 'Calculator', description: 'Financial management and tax services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#0369a1' },
  { id: 'consulting', name: 'Business Consulting', category: 'Professional Services', icon: 'TrendingUp', description: 'Strategic business advisory services', sections: ['hero', 'services', 'case-studies', 'testimonials', 'contact'], color: '#6b46c1' },
  { id: 'marketing', name: 'Digital Marketing Agency', category: 'Professional Services', icon: 'Megaphone', description: 'SEO, PPC, and social media marketing', sections: ['hero', 'services', 'case-studies', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'insurance', name: 'Insurance Agency', category: 'Professional Services', icon: 'ShieldCheck', description: 'Home, auto, and life insurance', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#059669' },
  { id: 'photography', name: 'Photography Studio', category: 'Professional Services', icon: 'Camera', description: 'Professional photography services', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#be185d' },
  { id: 'videography', name: 'Videography', category: 'Professional Services', icon: 'Video', description: 'Video production and editing', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'it-support', name: 'IT Support', category: 'Professional Services', icon: 'Monitor', description: 'Technical support and managed IT', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'web-design', name: 'Web Design Agency', category: 'Professional Services', icon: 'Globe', description: 'Website design and development', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'hr-services', name: 'HR Services', category: 'Professional Services', icon: 'Users', description: 'Human resources consulting', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'tax-services', name: 'Tax Preparation', category: 'Professional Services', icon: 'FileText', description: 'Tax filing and preparation services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#15803d' },

  // Health & Wellness
  { id: 'chiropractor', name: 'Chiropractic', category: 'Health & Wellness', icon: 'Activity', description: 'Spinal adjustment and pain relief', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#059669' },
  { id: 'massage', name: 'Massage Therapy', category: 'Health & Wellness', icon: 'Heart', description: 'Therapeutic massage services', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#be185d' },
  { id: 'acupuncture', name: 'Acupuncture', category: 'Health & Wellness', icon: 'Pin', description: 'Traditional Chinese medicine', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'nutrition', name: 'Nutritionist', category: 'Health & Wellness', icon: 'Apple', description: 'Dietary counseling and planning', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#65a30d' },
  { id: 'mental-health', name: 'Mental Health Counseling', category: 'Health & Wellness', icon: 'Brain', description: 'Therapy and counseling services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'physical-therapy', name: 'Physical Therapy', category: 'Health & Wellness', icon: 'Dumbbell', description: 'Rehabilitation and movement therapy', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'yoga', name: 'Yoga Studio', category: 'Health & Wellness', icon: 'Sparkles', description: 'Yoga classes and meditation', sections: ['hero', 'schedule', 'classes', 'testimonials', 'contact'], color: '#6b46c1' },
  { id: 'med-spa', name: 'Medical Spa', category: 'Health & Wellness', icon: 'Flower2', description: 'Aesthetic and wellness treatments', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#be185d' },

  // Food & Beverage
  { id: 'restaurant', name: 'Restaurant', category: 'Food & Beverage', icon: 'UtensilsCrossed', description: 'Fine dining or casual restaurant', sections: ['hero', 'menu', 'about', 'reservations', 'contact'], color: '#dc2626' },
  { id: 'cafe', name: 'Cafe & Coffee Shop', category: 'Food & Beverage', icon: 'Coffee', description: 'Specialty coffee and pastries', sections: ['hero', 'menu', 'about', 'events', 'contact'], color: '#92400e' },
  { id: 'bakery', name: 'Bakery', category: 'Food & Beverage', icon: 'Cake', description: 'Fresh baked goods and custom cakes', sections: ['hero', 'products', 'gallery', 'order', 'contact'], color: '#ca8a04' },
  { id: 'catering', name: 'Catering Service', category: 'Food & Beverage', icon: 'ChefHat', description: 'Event and corporate catering', sections: ['hero', 'menus', 'gallery', 'testimonials', 'contact'], color: '#059669' },
  { id: 'food-truck', name: 'Food Truck', category: 'Food & Beverage', icon: 'Truck', description: 'Mobile food service', sections: ['hero', 'menu', 'locations', 'about', 'contact'], color: '#ea580c' },
  { id: 'brewery', name: 'Brewery', category: 'Food & Beverage', icon: 'Beer', description: 'Craft beer production and taproom', sections: ['hero', 'beers', 'tours', 'events', 'contact'], color: '#a16207' },
  { id: 'winery', name: 'Winery & Vineyard', category: 'Food & Beverage', icon: 'Wine', description: 'Wine tasting and vineyard tours', sections: ['hero', 'wines', 'tours', 'events', 'contact'], color: '#7c3aed' },
  { id: 'juice-bar', name: 'Juice Bar', category: 'Food & Beverage', icon: 'CupSoda', description: 'Fresh juices and smoothies', sections: ['hero', 'menu', 'about', 'locations', 'contact'], color: '#16a34a' },
  { id: 'ice-cream', name: 'Ice Cream Shop', category: 'Food & Beverage', icon: 'IceCreamCone', description: 'Artisan ice cream and desserts', sections: ['hero', 'flavors', 'about', 'locations', 'contact'], color: '#db2777' },

  // Retail & Shopping
  { id: 'boutique', name: 'Fashion Boutique', category: 'Retail & Shopping', icon: 'ShoppingBag', description: 'Clothing and accessories retail', sections: ['hero', 'collections', 'about', 'testimonials', 'contact'], color: '#be185d' },
  { id: 'jewelry', name: 'Jewelry Store', category: 'Retail & Shopping', icon: 'Diamond', description: 'Fine jewelry and watches', sections: ['hero', 'collections', 'about', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'florist', name: 'Florist & Flower Shop', category: 'Retail & Shopping', icon: 'Flower', description: 'Fresh flowers and arrangements', sections: ['hero', 'gallery', 'services', 'testimonials', 'order'], color: '#db2777' },
  { id: 'bookstore', name: 'Bookstore', category: 'Retail & Shopping', icon: 'BookOpen', description: 'New and used books retail', sections: ['hero', 'bestsellers', 'events', 'about', 'contact'], color: '#0891b2' },
  { id: 'furniture', name: 'Furniture Store', category: 'Retail & Shopping', icon: 'Armchair', description: 'Home and office furniture', sections: ['hero', 'catalog', 'about', 'testimonials', 'contact'], color: '#92400e' },
  { id: 'toy-store', name: 'Toy Store', category: 'Retail & Shopping', icon: 'Gamepad2', description: 'Toys, games, and hobbies', sections: ['hero', 'products', 'about', 'events', 'contact'], color: '#dc2626' },
  { id: 'bike-shop', name: 'Bicycle Shop', category: 'Retail & Shopping', icon: 'Bike', description: 'Bike sales, repair, and rentals', sections: ['hero', 'products', 'services', 'events', 'contact'], color: '#ea580c' },

  // Automotive
  { id: 'auto-repair', name: 'Auto Repair Shop', category: 'Automotive', icon: 'Car', description: 'Vehicle maintenance and repair', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'car-detailing', name: 'Car Detailing', category: 'Automotive', icon: 'Sparkles', description: 'Professional car cleaning and detailing', sections: ['hero', 'services', 'gallery', 'testimonials', 'booking'], color: '#0891b2' },
  { id: 'tire-shop', name: 'Tire Shop', category: 'Automotive', icon: 'CircleDot', description: 'Tire sales and installation', sections: ['hero', 'products', 'services', 'about', 'contact'], color: '#1f2937' },
  { id: 'auto-body', name: 'Auto Body Shop', category: 'Automotive', icon: 'Wrench', description: 'Collision repair and painting', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'car-dealership', name: 'Car Dealership', category: 'Automotive', icon: 'CarFront', description: 'New and used vehicle sales', sections: ['hero', 'inventory', 'financing', 'about', 'contact'], color: '#4f46e5' },

  // Beauty & Personal Care
  { id: 'hair-salon', name: 'Hair Salon', category: 'Beauty & Personal Care', icon: 'Scissors', description: 'Hair cutting, styling, and coloring', sections: ['hero', 'services', 'gallery', 'testimonials', 'booking'], color: '#be185d' },
  { id: 'barbershop', name: 'Barbershop', category: 'Beauty & Personal Care', icon: 'Crown', description: 'Men\'s grooming and haircuts', sections: ['hero', 'services', 'gallery', 'testimonials', 'booking'], color: '#1f2937' },
  { id: 'nail-salon', name: 'Nail Salon', category: 'Beauty & Personal Care', icon: 'Hand', description: 'Manicures, pedicures, and nail art', sections: ['hero', 'services', 'gallery', 'testimonials', 'booking'], color: '#db2777' },
  { id: 'spa', name: 'Day Spa', category: 'Beauty & Personal Care', icon: 'Bath', description: 'Relaxation and beauty treatments', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#7c3aed' },
  { id: 'tattoo', name: 'Tattoo Studio', category: 'Beauty & Personal Care', icon: 'PenTool', description: 'Custom tattoo artistry', sections: ['hero', 'portfolio', 'artists', 'testimonials', 'booking'], color: '#1f2937' },
  { id: 'tanning', name: 'Tanning Salon', category: 'Beauty & Personal Care', icon: 'Sun', description: 'UV and spray tanning services', sections: ['hero', 'services', 'pricing', 'testimonials', 'contact'], color: '#ca8a04' },

  // Fitness & Recreation
  { id: 'gym', name: 'Gym & Fitness Center', category: 'Fitness & Recreation', icon: 'Dumbbell', description: 'Fitness equipment and training', sections: ['hero', 'classes', 'trainers', 'membership', 'contact'], color: '#dc2626' },
  { id: 'crossfit', name: 'CrossFit Box', category: 'Fitness & Recreation', icon: 'Flame', description: 'High-intensity functional training', sections: ['hero', 'classes', 'coaches', 'testimonials', 'contact'], color: '#ea580c' },
  { id: 'martial-arts', name: 'Martial Arts Studio', category: 'Fitness & Recreation', icon: 'Swords', description: 'Karate, BJJ, and self-defense', sections: ['hero', 'programs', 'instructors', 'testimonials', 'contact'], color: '#1f2937' },
  { id: 'dance-studio', name: 'Dance Studio', category: 'Fitness & Recreation', icon: 'Music', description: 'Ballet, hip-hop, and ballroom dance', sections: ['hero', 'classes', 'instructors', 'performances', 'contact'], color: '#7c3aed' },
  { id: 'rock-climbing', name: 'Rock Climbing Gym', category: 'Fitness & Recreation', icon: 'Mountain', description: 'Indoor climbing and bouldering', sections: ['hero', 'facilities', 'classes', 'membership', 'contact'], color: '#ca8a04' },
  { id: 'swimming', name: 'Swim School', category: 'Fitness & Recreation', icon: 'Waves', description: 'Swimming lessons and training', sections: ['hero', 'programs', 'schedule', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'golf', name: 'Golf Course & Range', category: 'Fitness & Recreation', icon: 'Flag', description: 'Golf course, driving range, and lessons', sections: ['hero', 'course', 'lessons', 'events', 'contact'], color: '#16a34a' },

  // Education & Training
  { id: 'tutoring', name: 'Tutoring Service', category: 'Education & Training', icon: 'GraduationCap', description: 'Academic tutoring and test prep', sections: ['hero', 'subjects', 'about', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'music-school', name: 'Music School', category: 'Education & Training', icon: 'Music2', description: 'Instrument and voice lessons', sections: ['hero', 'programs', 'instructors', 'performances', 'contact'], color: '#7c3aed' },
  { id: 'language-school', name: 'Language School', category: 'Education & Training', icon: 'Languages', description: 'Foreign language instruction', sections: ['hero', 'courses', 'instructors', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'driving-school', name: 'Driving School', category: 'Education & Training', icon: 'Navigation', description: 'Driving lessons and test prep', sections: ['hero', 'programs', 'pricing', 'testimonials', 'contact'], color: '#059669' },
  { id: 'coding-bootcamp', name: 'Coding Bootcamp', category: 'Education & Training', icon: 'Code2', description: 'Software development training', sections: ['hero', 'curriculum', 'outcomes', 'testimonials', 'contact'], color: '#1f2937' },
  { id: 'preschool', name: 'Preschool & Daycare', category: 'Education & Training', icon: 'Baby', description: 'Early childhood education', sections: ['hero', 'programs', 'about', 'testimonials', 'contact'], color: '#db2777' },

  // Technology
  { id: 'saas-company', name: 'SaaS Company', category: 'Technology', icon: 'Cloud', description: 'Software as a service platform', sections: ['hero', 'features', 'pricing', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'app-developer', name: 'App Development', category: 'Technology', icon: 'Smartphone', description: 'Mobile application development', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'cybersecurity', name: 'Cybersecurity Firm', category: 'Technology', icon: 'Lock', description: 'Network and data security services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'ai-company', name: 'AI & Machine Learning', category: 'Technology', icon: 'BrainCircuit', description: 'Artificial intelligence solutions', sections: ['hero', 'solutions', 'case-studies', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'data-recovery', name: 'Data Recovery', category: 'Technology', icon: 'HardDrive', description: 'Hard drive and data recovery', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#dc2626' },

  // Construction & Trades
  { id: 'general-contractor', name: 'General Contractor', category: 'Construction & Trades', icon: 'Building2', description: 'Residential and commercial construction', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'kitchen-remodel', name: 'Kitchen Remodeling', category: 'Construction & Trades', icon: 'ChefHat', description: 'Kitchen renovation and design', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#ea580c' },
  { id: 'bathroom-remodel', name: 'Bathroom Remodeling', category: 'Construction & Trades', icon: 'Bath', description: 'Bathroom renovation and design', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'concrete', name: 'Concrete Services', category: 'Construction & Trades', icon: 'Hammer', description: 'Concrete installation and repair', sections: ['hero', 'portfolio', 'services', 'testimonials', 'contact'], color: '#78716c' },
  { id: 'pool-service', name: 'Pool & Spa Service', category: 'Construction & Trades', icon: 'Waves', description: 'Pool construction and maintenance', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#0d9488' },

  // Entertainment
  { id: 'arcade', name: 'Arcade & Gaming', category: 'Entertainment', icon: 'Gamepad2', description: 'Video games and entertainment center', sections: ['hero', 'games', 'events', 'pricing', 'contact'], color: '#7c3aed' },
  { id: 'bowling', name: 'Bowling Alley', category: 'Entertainment', icon: 'Circle', description: 'Bowling lanes and entertainment', sections: ['hero', 'lanes', 'events', 'pricing', 'contact'], color: '#dc2626' },
  { id: 'escape-room', name: 'Escape Room', category: 'Entertainment', icon: 'KeyRound', description: 'Puzzle and adventure rooms', sections: ['hero', 'rooms', 'booking', 'about', 'contact'], color: '#16a34a' },
  { id: 'movie-theater', name: 'Movie Theater', category: 'Entertainment', icon: 'Film', description: 'Cinema and film screenings', sections: ['hero', 'now-playing', 'concessions', 'about', 'contact'], color: '#1f2937' },
  { id: 'karaoke', name: 'Karaoke Bar', category: 'Entertainment', icon: 'Mic', description: 'Private karaoke rooms and bar', sections: ['hero', 'rooms', 'menu', 'events', 'contact'], color: '#be185d' },

  // Travel & Hospitality
  { id: 'hotel', name: 'Hotel & Inn', category: 'Travel & Hospitality', icon: 'BedDouble', description: 'Accommodations and hospitality', sections: ['hero', 'rooms', 'amenities', 'gallery', 'booking'], color: '#0891b2' },
  { id: 'bed-breakfast', name: 'Bed & Breakfast', category: 'Travel & Hospitality', icon: 'Coffee', description: 'Charming B&B accommodations', sections: ['hero', 'rooms', 'breakfast', 'about', 'booking'], color: '#7c3aed' },
  { id: 'travel-agency', name: 'Travel Agency', category: 'Travel & Hospitality', icon: 'Plane', description: 'Vacation planning and bookings', sections: ['hero', 'destinations', 'packages', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'tour-guide', name: 'Tour Company', category: 'Travel & Hospitality', icon: 'Map', description: 'Guided tours and experiences', sections: ['hero', 'tours', 'gallery', 'testimonials', 'booking'], color: '#059669' },
  { id: 'rv-rental', name: 'RV Rental', category: 'Travel & Hospitality', icon: 'Van', description: 'RV and camper rentals', sections: ['hero', 'fleet', 'pricing', 'testimonials', 'booking'], color: '#ea580c' },

  // Real Estate
  { id: 'real-estate-agent', name: 'Real Estate Agent', category: 'Real Estate', icon: 'Home', description: 'Property buying and selling', sections: ['hero', 'listings', 'about', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'property-mgmt', name: 'Property Management', category: 'Real Estate', icon: 'Building', description: 'Rental property management', sections: ['hero', 'services', 'properties', 'testimonials', 'contact'], color: '#0891b2' },
  { id: 'home-inspection', name: 'Home Inspection', category: 'Real Estate', icon: 'Search', description: 'Property inspection services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'mortgage-broker', name: 'Mortgage Broker', category: 'Real Estate', icon: 'Banknote', description: 'Home loan and mortgage services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#16a34a' },

  // Legal & Financial
  { id: 'law-firm', name: 'Law Firm', category: 'Legal & Financial', icon: 'Scale', description: 'Legal representation and counsel', sections: ['hero', 'practice-areas', 'about', 'testimonials', 'contact'], color: '#1f2937' },
  { id: 'notary', name: 'Notary Public', category: 'Legal & Financial', icon: 'Stamp', description: 'Document notarization services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'financial-advisor', name: 'Financial Advisor', category: 'Legal & Financial', icon: 'TrendingUp', description: 'Investment and wealth management', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#059669' },
  { id: 'credit-repair', name: 'Credit Repair', category: 'Legal & Financial', icon: 'CreditCard', description: 'Credit score improvement services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#7c3aed' },

  // Arts & Creative
  { id: 'art-gallery', name: 'Art Gallery', category: 'Arts & Creative', icon: 'Palette', description: 'Fine art exhibition and sales', sections: ['hero', 'exhibitions', 'artists', 'events', 'contact'], color: '#be185d' },
  { id: 'art-studio', name: 'Art Studio', category: 'Arts & Creative', icon: 'PaintBucket', description: 'Art classes and workshops', sections: ['hero', 'classes', 'gallery', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'pottery', name: 'Pottery Studio', category: 'Arts & Creative', icon: 'CircleDot', description: 'Ceramics and pottery classes', sections: ['hero', 'classes', 'gallery', 'shop', 'contact'], color: '#92400e' },
  { id: 'framing', name: 'Custom Framing', category: 'Arts & Creative', icon: 'Frame', description: 'Picture and art framing', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'sign-shop', name: 'Sign Shop', category: 'Arts & Creative', icon: 'Signpost', description: 'Custom signs and banners', sections: ['hero', 'products', 'portfolio', 'testimonials', 'contact'], color: '#2563eb' },

  // Pet Services
  { id: 'vet-clinic', name: 'Veterinary Clinic', category: 'Pet Services', icon: 'HeartPulse', description: 'Animal healthcare services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'pet-grooming', name: 'Pet Grooming', category: 'Pet Services', icon: 'Scissors', description: 'Dog and cat grooming services', sections: ['hero', 'services', 'gallery', 'testimonials', 'booking'], color: '#0891b2' },
  { id: 'pet-boarding', name: 'Pet Boarding & Daycare', category: 'Pet Services', icon: 'Home', description: 'Pet sitting and daycare', sections: ['hero', 'facilities', 'services', 'testimonials', 'booking'], color: '#7c3aed' },
  { id: 'dog-training', name: 'Dog Training', category: 'Pet Services', icon: 'PawPrint', description: 'Obedience and behavior training', sections: ['hero', 'programs', 'about', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'pet-store', name: 'Pet Store', category: 'Pet Services', icon: 'Fish', description: 'Pet supplies and accessories', sections: ['hero', 'products', 'services', 'about', 'contact'], color: '#db2777' },

  // Events & Weddings
  { id: 'wedding-planner', name: 'Wedding Planner', category: 'Events & Weddings', icon: 'Heart', description: 'Full-service wedding planning', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#be185d' },
  { id: 'event-venue', name: 'Event Venue', category: 'Events & Weddings', icon: 'PartyPopper', description: 'Wedding and event space', sections: ['hero', 'spaces', 'gallery', 'packages', 'contact'], color: '#7c3aed' },
  { id: 'dj-service', name: 'DJ Service', category: 'Events & Weddings', icon: 'Disc3', description: 'Wedding and event DJ', sections: ['hero', 'services', 'music', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'photo-booth', name: 'Photo Booth Rental', category: 'Events & Weddings', icon: 'Camera', description: 'Event photo booth rental', sections: ['hero', 'packages', 'gallery', 'testimonials', 'booking'], color: '#db2777' },
  { id: 'florist-events', name: 'Event Florist', category: 'Events & Weddings', icon: 'Flower2', description: 'Event and wedding flowers', sections: ['hero', 'gallery', 'services', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'party-rentals', name: 'Party Equipment Rentals', category: 'Events & Weddings', icon: 'Tent', description: 'Tables, chairs, and tent rentals', sections: ['hero', 'inventory', 'pricing', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'catering-events', name: 'Event Catering', category: 'Events & Weddings', icon: 'Utensils', description: 'Corporate and private event catering', sections: ['hero', 'menus', 'gallery', 'testimonials', 'contact'], color: '#ea580c' },
  { id: 'videographer', name: 'Wedding Videographer', category: 'Events & Weddings', icon: 'Video', description: 'Wedding and event videography', sections: ['hero', 'portfolio', 'packages', 'testimonials', 'contact'], color: '#dc2626' },

  // Cleaning & Maintenance
  { id: 'house-cleaning', name: 'House Cleaning', category: 'Cleaning & Maintenance', icon: 'Sparkles', description: 'Residential cleaning services', sections: ['hero', 'services', 'pricing', 'testimonials', 'booking'], color: '#0891b2' },
  { id: 'carpet-cleaning', name: 'Carpet Cleaning', category: 'Cleaning & Maintenance', icon: 'Droplet', description: 'Carpet and upholstery cleaning', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'window-cleaning', name: 'Window Cleaning', category: 'Cleaning & Maintenance', icon: 'Sun', description: 'Residential and commercial window cleaning', sections: ['hero', 'services', 'pricing', 'testimonials', 'contact'], color: '#2563eb' },
  { id: 'pressure-washing', name: 'Pressure Washing', category: 'Cleaning & Maintenance', icon: 'CloudRain', description: 'Exterior cleaning and power washing', sections: ['hero', 'services', 'gallery', 'testimonials', 'contact'], color: '#4f46e5' },
  { id: 'chimney-sweep', name: 'Chimney Sweep', category: 'Cleaning & Maintenance', icon: 'Flame', description: 'Chimney cleaning and inspection', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#92400e' },
  { id: 'snow-removal', name: 'Snow Removal', category: 'Cleaning & Maintenance', icon: 'Snowflake', description: 'Commercial and residential snow removal', sections: ['hero', 'services', 'pricing', 'testimonials', 'contact'], color: '#0d9488' },

  // Medical & Dental
  { id: 'dental', name: 'Dental Practice', category: 'Medical & Dental', icon: 'Smile', description: 'General and cosmetic dentistry', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#0891b2' },
  { id: 'dermatology', name: 'Dermatology', category: 'Medical & Dental', icon: 'ShieldCheck', description: 'Skin care and treatment', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#be185d' },
  { id: 'optometry', name: 'Optometry', category: 'Medical & Dental', icon: 'Eye', description: 'Eye exams and vision care', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#7c3aed' },
  { id: 'pediatrics', name: 'Pediatrics', category: 'Medical & Dental', icon: 'Baby', description: 'Children\'s healthcare', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#db2777' },
  { id: 'orthodontics', name: 'Orthodontics', category: 'Medical & Dental', icon: 'SmilePlus', description: 'Braces and Invisalign', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#16a34a' },
  { id: 'physical-medicine', name: 'Sports Medicine', category: 'Medical & Dental', icon: 'Activity', description: 'Sports injury treatment', sections: ['hero', 'services', 'about', 'testimonials', 'booking'], color: '#dc2626' },
  { id: 'urgent-care', name: 'Urgent Care', category: 'Medical & Dental', icon: 'Stethoscope', description: 'Walk-in medical care', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#059669' },

  // Other
  { id: 'storage', name: 'Self Storage', category: 'Other', icon: 'Package', description: 'Storage unit rentals', sections: ['hero', 'units', 'pricing', 'about', 'contact'], color: '#6b46c1' },
  { id: 'recycling', name: 'Recycling Center', category: 'Other', icon: 'Recycle', description: 'Waste recycling services', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#16a34a' },
  { id: 'security', name: 'Security Services', category: 'Other', icon: 'ShieldAlert', description: 'Security guard and monitoring', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#dc2626' },
  { id: 'auction', name: 'Auction House', category: 'Other', icon: 'Gavel', description: 'Estate and antique auctions', sections: ['hero', 'auctions', 'about', 'testimonials', 'contact'], color: '#a16207' },
  { id: 'tailor', name: 'Tailor & Alterations', category: 'Other', icon: 'Scissors', description: 'Clothing alterations and tailoring', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#7c3aed' },
  { id: 'shoe-repair', name: 'Shoe Repair', category: 'Other', icon: 'Footprints', description: 'Shoe and leather repair', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#92400e' },
  { id: 'watch-repair', name: 'Watch Repair', category: 'Other', icon: 'Clock', description: 'Watch and jewelry repair', sections: ['hero', 'services', 'about', 'testimonials', 'contact'], color: '#ca8a04' },
  { id: 'gun-shop', name: 'Gun Shop & Range', category: 'Other', icon: 'Crosshair', description: 'Firearm sales and shooting range', sections: ['hero', 'products', 'range', 'classes', 'contact'], color: '#1f2937' },
  { id: 'pawn-shop', name: 'Pawn Shop', category: 'Other', icon: 'Banknote', description: 'Loans and resale merchandise', sections: ['hero', 'inventory', 'services', 'about', 'contact'], color: '#059669' },
  { id: 'laundromat', name: 'Laundromat', category: 'Other', icon: 'Shirt', description: 'Self-service laundry', sections: ['hero', 'services', 'pricing', 'about', 'contact'], color: '#0891b2' },
];

export const getIndustriesByCategory = (category: string) =>
  industries.filter((i) => i.category === category);

export const getIndustryById = (id: string) =>
  industries.find((i) => i.id === id);
