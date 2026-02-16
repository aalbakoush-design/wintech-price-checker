import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { ArrowRight, Save, Database, Layout, Type, Palette, Video, Code, Image as ImageIcon } from 'lucide-react';
import { findProductByBarcode } from '../services/mockData'; // Import just to test

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<'general' | 'display' | 'database'>('general');
  const [manualBarcode, setManualBarcode] = useState('');

  const handleSave = () => {
    updateSettings(localSettings);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const handleChange = (key: keyof typeof settings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleManualScan = () => {
      if(manualBarcode) {
          navigate(`/product/${manualBarcode}`);
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <ArrowRight size={24} />
            </button>
            <h1 className="text-xl font-bold">الإعدادات</h1>
        </div>
        <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-colors"
        >
            <Save size={18} />
            حفظ
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-l border-gray-200 overflow-y-auto hidden md:block">
            <nav className="p-4 space-y-2">
                <button 
                    onClick={() => setActiveTab('general')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right font-medium transition-all ${activeTab === 'general' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Video size={20} />
                    عام والفيديو
                </button>
                <button 
                    onClick={() => setActiveTab('display')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right font-medium transition-all ${activeTab === 'display' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Layout size={20} />
                    العرض والألوان
                </button>
                <button 
                    onClick={() => setActiveTab('database')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right font-medium transition-all ${activeTab === 'database' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Database size={20} />
                    قاعدة البيانات
                </button>
            </nav>
            
            <div className="p-4 mt-8 border-t">
                 <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">اختبار يدوي</h3>
                 <div className="flex gap-2">
                     <input 
                        type="text" 
                        placeholder="أدخل باركود" 
                        className="w-full border rounded p-1 text-sm"
                        value={manualBarcode}
                        onChange={(e) => setManualBarcode(e.target.value)}
                     />
                     <button onClick={handleManualScan} className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                        <ArrowRight size={16} />
                     </button>
                 </div>
            </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8 pb-12">
                
                {/* General Section */}
                {activeTab === 'general' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Video className="text-blue-500" />
                            إعدادات الفيديو والشركة
                        </h2>
                        
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الشركة</label>
                                <input 
                                    type="text" 
                                    value={localSettings.companyName}
                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الفيديو الدعائي</label>
                                <input 
                                    type="text" 
                                    value={localSettings.videoUrl}
                                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-left"
                                    dir="ltr"
                                />
                                <p className="text-xs text-gray-400 mt-1">يجب أن يكون الرابط مباشر لملف MP4</p>
                            </div>

                            <div className="border-t pt-4 mt-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <ImageIcon size={16} className="text-gray-500" />
                                    رابط صورة البداية (Splash Image)
                                </label>
                                <input 
                                    type="text" 
                                    value={localSettings.splashImageUrl}
                                    onChange={(e) => handleChange('splashImageUrl', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-left"
                                    dir="ltr"
                                    placeholder="اتركه فارغاً لاستخدام الشعار الافتراضي"
                                />
                                <p className="text-xs text-gray-400 mt-1">رابط مباشر للصورة (JPG, PNG)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">زمن العودة التلقائية (ثواني)</label>
                                <input 
                                    type="number" 
                                    value={localSettings.timeoutSeconds}
                                    onChange={(e) => handleChange('timeoutSeconds', parseInt(e.target.value))}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Display Section */}
                {activeTab === 'display' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Palette className="text-purple-500" />
                            المظهر والألوان
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">اللون الأساسي (السعر والشعار)</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        value={localSettings.primaryColor}
                                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                                        className="h-12 w-12 rounded cursor-pointer border-none"
                                    />
                                    <input 
                                        type="text" 
                                        value={localSettings.primaryColor} 
                                        readOnly 
                                        className="flex-1 bg-gray-50 border rounded-lg px-3 text-gray-500"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">اللون الثانوي</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        value={localSettings.secondaryColor}
                                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                        className="h-12 w-12 rounded cursor-pointer border-none"
                                    />
                                    <input 
                                        type="text" 
                                        value={localSettings.secondaryColor} 
                                        readOnly 
                                        className="flex-1 bg-gray-50 border rounded-lg px-3 text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-100"/>

                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Type size={18} /> حجم الخطوط
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                    <span>حجم اسم المنتج</span>
                                    <span>{localSettings.productNameFontSize}px</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="16" max="64"
                                    value={localSettings.productNameFontSize}
                                    onChange={(e) => handleChange('productNameFontSize', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                    <span>حجم السعر</span>
                                    <span>{localSettings.priceFontSize}px</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="24" max="96"
                                    value={localSettings.priceFontSize}
                                    onChange={(e) => handleChange('priceFontSize', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-8 flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                            <input 
                                type="checkbox" 
                                id="showCurrency"
                                checked={localSettings.showCurrency}
                                onChange={(e) => handleChange('showCurrency', e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="showCurrency" className="font-medium text-gray-700">عرض رمز العملة</label>
                            
                            {localSettings.showCurrency && (
                                <input 
                                    type="text"
                                    value={localSettings.currencySymbol}
                                    onChange={(e) => handleChange('currencySymbol', e.target.value)}
                                    className="w-24 p-2 border rounded-lg mr-auto text-center"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Database Section */}
                {activeTab === 'database' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Database className="text-green-600" />
                            اتصال قاعدة البيانات
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Host IP</label>
                                    <input 
                                        type="text" 
                                        value={localSettings.apiHost}
                                        onChange={(e) => handleChange('apiHost', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left"
                                        dir="ltr"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Port</label>
                                    <input 
                                        type="text" 
                                        value={localSettings.apiPort}
                                        onChange={(e) => handleChange('apiPort', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Database Name</label>
                                <input 
                                    type="text" 
                                    value={localSettings.dbName}
                                    onChange={(e) => handleChange('dbName', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left"
                                    dir="ltr"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                    <input 
                                        type="text" 
                                        value={localSettings.dbUser}
                                        onChange={(e) => handleChange('dbUser', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left"
                                        dir="ltr"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <input 
                                        type="password" 
                                        value={localSettings.dbPassword}
                                        onChange={(e) => handleChange('dbPassword', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* SQL Query Editor */}
                            <div className="mt-6 border-t pt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Code size={16} className="text-gray-500" />
                                    استعلام SQL لجلب المنتج
                                </label>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                                    قم بتخصيص الاستعلام الذي يتم إرساله لقاعدة البيانات.
                                    <br/>
                                    استخدم <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded font-mono font-bold mx-1">[BARCODE]</code>
                                    كمتغير سيتم استبداله بالباركود الممسوح.
                                </p>
                                <textarea 
                                    rows={8}
                                    value={localSettings.sqlQuery}
                                    onChange={(e) => handleChange('sqlQuery', e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-left font-mono text-sm bg-gray-50 text-gray-800"
                                    dir="ltr"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mt-4">
                                <p className="text-sm">
                                    <strong>ملاحظة:</strong> هذا التطبيق يعمل حالياً بوضع المحاكاة (Demo Mode). عند ربطه بالخادم الفعلي، سيتم استخدام هذه الإعدادات للاتصال بـ API.
                                </p>
                            </div>

                            <button className="w-full py-3 mt-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                اختبار الاتصال
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-center mt-8">
                     <button 
                        onClick={() => {
                            if(window.confirm('هل أنت متأكد من استعادة الافتراضيات؟')) {
                                resetSettings();
                                setLocalSettings(settings); // Force update local state
                            }
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-bold underline"
                     >
                         استعادة الإعدادات الافتراضية
                     </button>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;