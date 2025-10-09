# 🎯 Qratex - AI Destekli Müşteri Geri Bildirim Platformu

Modern işletmeler için QR tabanlı müşteri yorum analizi ve AI destekli sentiment analizi platformu.

## ✨ Özellikler

### 🏢 Bayi (İşletme) Özellikleri
- **AI Destekli Dashboard**: Gerçek zamanlı analytics ve insights
- **QR Kod Yönetimi**: Hızlı geri bildirim toplama için QR kodlar
- **Sentiment Analizi**: AI ile müşteri duygularını anlama
- **Canlı Raporlama**: Detaylı performans metrikleri
- **Kullanıci Yönetimi**: Ekip ve müşteri yönetimi
- **Güvenlik**: Enterprise seviye güvenlik özellikleri

### 👥 Müşteri Özellikleri
- **Kolay Geri Bildirim**: QR kod ile hızlı yorum bırakma
- **Kişisel Dashboard**: Geri bildirim geçmişi ve istatistikler
- **Başarı Rozetleri**: Gamification ile katılım artırma
- **Puan Sistemi**: Aktivite bazlı ödül sistemi
- **Mobil Uyumlu**: Responsive tasarım

## 🛠️ Teknolojiler

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, NextUI
- **Animasyonlar**: Framer Motion
- **Efektler**: Particles.js
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🚀 Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/your-username/qratex-ui.git
cd qratex-ui
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── ui/             # UI bileşenleri (Cards, Buttons, etc.)
│   └── dashboard/      # Dashboard bileşenleri
├── pages/              # Sayfa bileşenleri
│   ├── auth/          # Giriş/Kayıt sayfaları
│   └── dashboard/     # Dashboard sayfaları
├── App.tsx            # Ana uygulama bileşeni
├── main.tsx           # Giriş noktası
└── index.css          # Global stiller
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: Purple to Pink gradient (#667eea → #764ba2)
- **Secondary**: Blue to Cyan gradient (#4facfe → #00f2fe)
- **Tertiary**: Orange to Red gradient (#f093fb → #f5576c)
- **Success**: Green tones
- **Warning**: Yellow/Orange tones
- **Error**: Red tones

### Animasyonlar
- **Framer Motion**: Sayfa geçişleri ve bileşen animasyonları
- **CSS Animations**: Hover efektleri ve micro-interactions
- **Particle Effects**: Landing page background efektleri

## 🔗 Sayfa Rotaları

- `/` - Landing Page
- `/dealer/login` - Bayi Girişi
- `/dealer/register` - Bayi Kaydı
- `/dealer/dashboard` - Bayi Dashboard
- `/customer/login` - Müşteri Girişi
- `/customer/register` - Müşteri Kaydı
- `/customer/dashboard` - Müşteri Dashboard

## 🎯 Kullanım

### Bayi Kullanımı
1. Ana sayfadan "Bayi Girişi" seçin
2. Hesap oluşturun veya giriş yapın
3. Dashboard'dan QR kodlar oluşturun
4. AI insights ile performansınızı takip edin

### Müşteri Kullanımı
1. QR kodu tarayın veya müşteri girişi yapın
2. Geri bildirim bırakın
3. Puanlarınızı ve başarılarınızı takip edin

## 🔧 Geliştirme

### Yeni Bileşen Ekleme
```tsx
// src/components/ui/YourComponent.tsx
import { motion } from 'framer-motion'

function YourComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Your content */}
    </motion.div>
  )
}

export default YourComponent
```

### Stil Rehberi
- Tailwind CSS sınıflarını kullanın
- NextUI bileşenlerini tercih edin
- Framer Motion ile animasyonlar ekleyin
- Responsive tasarım uygulayın

## 📱 Responsive Tasarım

- **Mobile First**: Mobil cihazlar öncelikli tasarım
- **Breakpoints**: sm, md, lg, xl breakpoints
- **Flexible Layouts**: Grid ve Flexbox kullanımı
- **Touch Friendly**: Dokunmatik cihazlar için optimize

## 🎭 Animasyon Rehberi

### Framer Motion Kullanımı
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### CSS Animasyonları
- `animate-blob` - Blob animasyonu
- `animate-float` - Yüzen animasyon
- `animate-pulse-glow` - Parlama efekti
- `animate-gradient-x` - Gradient animasyonu

## 🚀 Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Email**: info@qratex.com
- **Website**: https://qratex.com
- **GitHub**: https://github.com/qratex

---

**Qratex** ile müşteri deneyiminizi bir üst seviyeye taşıyın! 🚀
