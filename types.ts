export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  unit: string;
  currency: string;
  description?: string;
  image?: string;
}

export interface AppSettings {
  videoUrl: string;
  splashImageUrl: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  priceFontSize: number;
  productNameFontSize: number;
  showCurrency: boolean;
  currencySymbol: string;
  timeoutSeconds: number; // Time to return to video after scan
  apiHost: string;
  apiPort: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  sqlQuery: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  splashImageUrl: '',
  companyName: 'النافذة التقنية',
  primaryColor: '#0ea5e9', // Sky 500
  secondaryColor: '#0f172a', // Slate 900
  priceFontSize: 48,
  productNameFontSize: 32,
  showCurrency: true,
  currencySymbol: 'د.ل',
  timeoutSeconds: 10,
  apiHost: '192.168.1.100',
  apiPort: '3306',
  dbName: 'wintech_db',
  dbUser: 'us_readonly',
  dbPassword: 'us_readonly',
  sqlQuery: `SELECT it_name,
       it_unit_name,
       it_un_price_sell_a AS it_sell
FROM tbl_item_barcode
     INNER JOIN tbl_item ON (it_item_id = it_barcode_item_id AND it_unit_id = it_barcode_unit_id)
WHERE it_barcode_item_id = (SELECT it_barcode_item_id FROM tbl_item_barcode WHERE it_barcode_value = '[BARCODE]' LIMIT 1)`
};