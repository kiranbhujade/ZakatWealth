export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'builder' | 'guardian' | 'legacy';
  location: string;
  joinedAt: Date;
}

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  halalScore: number;
  category: 'stocks' | 'sukuk' | 'real-estate' | 'crypto' | 'commodities';
  complianceFactors: {
    ribaFree: boolean;
    ghararLevel: 'low' | 'medium' | 'high';
    haram: boolean;
    ethicalScore: number;
    environmentalScore: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  readTime: number;
  featured: boolean;
  image: string;
}

export interface PrayerTime {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  city: string;
  date: Date;
}
