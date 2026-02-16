import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    barcode: '123456789',
    name: 'مياه غازية 330 مل',
    price: 2.50,
    unit: 'قطعة',
    currency: 'د.ل',
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    barcode: '11111',
    name: 'عصير برتقال طبيعي',
    price: 5.00,
    unit: 'علبة',
    currency: 'د.ل',
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    barcode: '22222',
    name: 'شوكولاتة بالحليب فاخرة',
    price: 12.75,
    unit: 'لوح',
    currency: 'د.ل',
    image: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: '4',
    barcode: '33333',
    name: 'منظف أرضيات 1 لتر',
    price: 15.00,
    unit: 'عبوة',
    currency: 'د.ل',
    image: 'https://picsum.photos/400/400?random=4'
  }
];

export const findProductByBarcode = async (barcode: string): Promise<Product | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_PRODUCTS.find(p => p.barcode === barcode) || null;
};