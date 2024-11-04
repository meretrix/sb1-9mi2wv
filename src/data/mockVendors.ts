import { Vendor } from '../types';

export const mockVendors: Vendor[] = [
  // Air Vendors
  {
    id: 'v1',
    name: 'United Airlines',
    type: 'air',
    logo: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Discount Program', code: 'CORP2024UA', discount: '15% off Business Class' },
      { description: 'Premium Economy Upgrade', code: 'PEUP2024', discount: 'Complimentary when available' },
    ],
    contactInfo: {
      name: 'John Smith',
      email: 'john.smith@united.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: 'v2',
    name: 'Delta Air Lines',
    type: 'air',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Benefits Program', code: 'DELTA2024', discount: '10% off all fares' },
      { description: 'SkyClub Access', code: 'SKYC2024', discount: 'Included for Business Class' },
    ],
    contactInfo: {
      name: 'Emily Davis',
      email: 'emily.davis@delta.com',
      phone: '+1 (555) 234-5678',
    },
  },
  {
    id: 'v3',
    name: 'British Airways',
    type: 'air',
    logo: 'https://images.unsplash.com/photo-1568321612653-7d39b7e35fce?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Traveller Program', code: 'BA2024CORP', discount: '12% off long-haul flights' },
      { description: 'Lounge Access', code: 'LOUNGE24', discount: 'Complimentary at major hubs' },
    ],
    contactInfo: {
      name: 'James Wilson',
      email: 'j.wilson@ba.com',
      phone: '+44 20 7123 4567',
    },
  },

  // Stays Vendors
  {
    id: 'v4',
    name: 'Hilton Hotels',
    type: 'stays',
    logo: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2025-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Rate Program', code: 'HILCORP24', discount: 'Up to 20% off BAR' },
      { description: 'Executive Lounge Access', code: 'EXECL24', discount: 'Complimentary for all stays' },
    ],
    contactInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.j@hilton.com',
      phone: '+1 (555) 987-6543',
    },
  },
  {
    id: 'v5',
    name: 'Marriott International',
    type: 'stays',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Business Travel Program', code: 'MARR2024', discount: '15% off best available rate' },
      { description: 'Late Checkout', code: 'LATE24', discount: 'Guaranteed 2pm checkout' },
    ],
    contactInfo: {
      name: 'Robert Chen',
      email: 'r.chen@marriott.com',
      phone: '+1 (555) 345-6789',
    },
  },
  {
    id: 'v6',
    name: 'Hyatt Hotels',
    type: 'stays',
    logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Benefits', code: 'HYATT24', discount: '18% off standard rates' },
      { description: 'Breakfast Included', code: 'BFAST24', discount: 'Complimentary breakfast for two' },
    ],
    contactInfo: {
      name: 'Lisa Park',
      email: 'l.park@hyatt.com',
      phone: '+1 (555) 456-7890',
    },
  },

  // Car Vendors
  {
    id: 'v7',
    name: 'Enterprise',
    type: 'car',
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-02-01',
    contractEnd: '2025-01-31',
    status: 'active',
    deals: [
      { description: 'Corporate Fleet Program', code: 'ENT2024CORP', discount: '25% off all rentals' },
    ],
    contactInfo: {
      name: 'Mike Wilson',
      email: 'm.wilson@enterprise.com',
      phone: '+1 (555) 456-7890',
    },
  },
  {
    id: 'v8',
    name: 'Hertz',
    type: 'car',
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Business Program', code: 'HERTZ24', discount: '20% off daily rates' },
      { description: 'Gold Plus Rewards', code: 'GOLD24', discount: 'Complimentary membership' },
    ],
    contactInfo: {
      name: 'David Brown',
      email: 'd.brown@hertz.com',
      phone: '+1 (555) 567-8901',
    },
  },
  {
    id: 'v9',
    name: 'Avis',
    type: 'car',
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Rates', code: 'AVIS2024', discount: '15% off all vehicles' },
      { description: 'Preferred Service', code: 'PREF24', discount: 'Skip the counter' },
    ],
    contactInfo: {
      name: 'Tom Martinez',
      email: 't.martinez@avis.com',
      phone: '+1 (555) 678-9012',
    },
  },

  // Rail Vendors
  {
    id: 'v10',
    name: 'Amtrak',
    type: 'rail',
    logo: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Business Class Discount', code: 'AMTCORP24', discount: '10% off Business Class' },
    ],
    contactInfo: {
      name: 'Lisa Brown',
      email: 'l.brown@amtrak.com',
      phone: '+1 (555) 789-0123',
    },
  },
  {
    id: 'v11',
    name: 'Eurostar',
    type: 'rail',
    logo: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Travel Program', code: 'EURO24', discount: '15% off Standard Premier' },
      { description: 'Business Premier Lounge', code: 'LOUNGE24', discount: 'Complimentary access' },
    ],
    contactInfo: {
      name: 'Claire Martin',
      email: 'c.martin@eurostar.com',
      phone: '+44 20 8123 4567',
    },
  },

  // Misc Vendors
  {
    id: 'v12',
    name: 'Global Travel Insurance',
    type: 'misc',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Corporate Coverage', code: 'GTI2024', discount: 'Premium coverage at standard rates' },
    ],
    contactInfo: {
      name: 'Patricia Lee',
      email: 'p.lee@gti.com',
      phone: '+1 (555) 890-1234',
    },
  },
  {
    id: 'v13',
    name: 'Executive Lounges International',
    type: 'misc',
    logo: 'https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?w=100&h=100&fit=crop&q=80',
    contractStart: '2024-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    deals: [
      { description: 'Global Access Pass', code: 'ELI2024', discount: '20% off annual membership' },
      { description: 'Day Pass Program', code: 'DAY24', discount: 'Bulk purchase discount' },
    ],
    contactInfo: {
      name: 'Mark Thompson',
      email: 'm.thompson@eli.com',
      phone: '+1 (555) 901-2345',
    },
  },
];