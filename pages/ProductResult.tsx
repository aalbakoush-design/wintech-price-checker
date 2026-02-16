import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { findProductByBarcode } from '../services/mockData';
import { Product } from '../types';
import { ArrowRight, AlertCircle } from 'lucide-react';

const ProductResult: React.FC = () => {
  const { barcode } = useParams<{ barcode: string }>();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(settings.timeoutSeconds);

  // Fetch product
  useEffect(() => {
    if (barcode) {
      setLoading(true);
      findProductByBarcode(barcode)
        .then((found) => {
          setProduct(found);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [barcode]);

  // Auto return timer
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, navigate]);

  // Reset timer on user interaction
  const resetTimer = () => setCountdown(settings.timeoutSeconds);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" onClick={resetTimer}>
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between z-10">
        <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 font-bold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
            <ArrowRight />
            عودة
        </button>
        <h1 className="text-xl font-bold text-gray-800">{settings.companyName}</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {product ? (
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Product Image */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-l border-gray-100">
               {product.image ? (
                   <img src={product.image} alt={product.name} className="max-w-full max-h-[400px] object-contain drop-shadow-lg transform transition-transform hover:scale-105 duration-300" />
               ) : (
                   <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                       لا توجد صورة
                   </div>
               )}
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
                <div>
                    <h2 
                        className="font-black text-gray-800 mb-2 leading-tight"
                        style={{ fontSize: `${settings.productNameFontSize}px` }}
                    >
                        {product.name}
                    </h2>
                    <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                        {product.barcode}
                    </span>
                </div>

                <div className="mt-4">
                    <p className="text-gray-500 font-semibold text-lg mb-1">السعر</p>
                    <div 
                        className="font-black flex items-end gap-2"
                        style={{ color: settings.primaryColor }}
                    >
                        <span style={{ fontSize: `${settings.priceFontSize}px`, lineHeight: 1 }}>{product.price.toFixed(2)}</span>
                        {settings.showCurrency && (
                            <span className="text-2xl mb-2 text-gray-400 font-bold">{product.currency}</span>
                        )}
                    </div>
                    <p className="text-gray-400 mt-2 font-medium">
                        لكل {product.unit}
                    </p>
                </div>
            </div>
          </div>
        ) : (
          /* Not Found State */
          <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
            <AlertCircle size={80} className="text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">المنتج غير موجود</h2>
            <p className="text-gray-500 text-lg">لم يتم العثور على بيانات لهذا الباركود: {barcode}</p>
            <button 
                onClick={() => navigate('/')}
                className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 w-full"
            >
                مسح منتج آخر
            </button>
          </div>
        )}
      </div>

      {/* Countdown Footer */}
      <div className="bg-white p-4 border-t border-gray-200 text-center">
        <p className="text-gray-400 font-medium">
          العودة للشاشة الرئيسية خلال <span className="text-gray-800 font-bold px-1">{countdown}</span> ثانية
        </p>
      </div>
    </div>
  );
};

export default ProductResult;