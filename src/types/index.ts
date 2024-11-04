export interface Vendor {
  id: string;
  name: string;
  type: 'air' | 'stays' | 'car' | 'rail' | 'misc';
  logo: string;
  contractStart: string;
  contractEnd: string;
  status: 'active' | 'pending' | 'expired';
  deals: {
    description: string;
    code: string;
    discount: string;
  }[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}