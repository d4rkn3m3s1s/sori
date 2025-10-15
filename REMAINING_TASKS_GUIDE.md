# 📋 Kalan Görevler Rehberi

## ⚠️ Not
Bu görevler **teknik implementasyon gerektirmiyor** veya **proje dışı** çalışmalar içeriyor. Her biri için rehber ve öneriler sunulmuştur.

---

## 1. 🖼️ SVG Problemi Çözümü

### Sorun Analizi
SVG dosyaları ile ilgili potansiyel sorunlar:
- Import hataları
- Path çözümleme
- Build sırasında bundle problemi
- Browser uyumsuzluğu

### Çözüm Önerileri

#### A. Vite SVG Plugin Kullanımı
```bash
npm install vite-plugin-svgr --save-dev
```

```typescript
// vite.config.ts
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr() // SVG'leri React component olarak import et
  ]
})
```

#### B. SVG Import Yöntemleri
```typescript
// Method 1: As URL
import logoUrl from './logo.svg'
<img src={logoUrl} alt="Logo" />

// Method 2: As Component (with svgr)
import { ReactComponent as Logo } from './logo.svg'
<Logo />

// Method 3: Inline
import logoSvg from './logo.svg?raw'
```

#### C. Public Folder Kullanımı
```
public/
  └── icons/
      ├── home.svg
      ├── user.svg
      └── settings.svg
```

```typescript
<img src="/icons/home.svg" alt="Home" />
```

### Kontrol Listesi
- [ ] SVG dosyalarının lokasyonunu kontrol et
- [ ] Import syntax'ını kontrol et
- [ ] Vite config'i gözden geçir
- [ ] Browser console'da hata ara
- [ ] Build sürecini test et

---

## 2. 🎨 Site İçi Genel Düzenlemeler

### UX/UI İyileştirme Önerileri

#### A. Responsive Design Testleri
```
Cihazlar:
- Mobile: 320px, 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px
```

**Test Edilmesi Gerekenler:**
- [ ] Tüm sayfalar mobile'da düzgün görünüyor mu?
- [ ] Butonlar tıklanabilir mi?
- [ ] Metinler okunabilir mi?
- [ ] Görseller taşıyor mu?

#### B. Accessibility (A11y)
```typescript
// ARIA labels
<button aria-label="Menüyü aç">☰</button>

// Keyboard navigation
tabIndex={0}
onKeyPress={(e) => e.key === 'Enter' && handleClick()}

// Alt text
<img src="..." alt="Açıklayıcı metin" />
```

#### C. Loading States
```typescript
{isLoading ? (
  <Spinner size="lg" />
) : (
  <Content />
)}
```

#### D. Error Handling
```typescript
{error && (
  <Alert color="danger">
    {error.message}
  </Alert>
)}
```

#### E. Performance Optimization
```typescript
// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Memoization
const expensiveValue = useMemo(() => computeExpensive(data), [data])

// Debounce
const debouncedSearch = useDeb ounce(search, 300)
```

### Öncelikli Düzenlemeler
1. **Dark Mode Consistency** - Tüm sayfalarda test et
2. **Loading States** - Tüm API çağrılarına ekle
3. **Error Boundaries** - Kritik komponentlere ekle
4. **Toast Notifications** - Başarılı/Hatalı işlemler
5. **Skeleton Loading** - Ağır komponentler için

---

## 3. 📝 Notion Birebir Geçişi

### Notion Workspace Yapısı

```
📁 Sori Projesi
├── 📄 Genel Bakış
├── 📁 Özellikler
│   ├── ✅ Tamamlanan Özellikler (9)
│   ├── 🚧 Devam Eden
│   └── 💡 Gelecek Fikirler
├── 📁 Dokümantasyon
│   ├── README dosyaları
│   ├── API Dokümantasyonu
│   └── Kullanıcı Rehberleri
├── 📁 Tasarım
│   ├── UI/UX Mockup'ları
│   ├── Renk Paleti
│   └── Komponent Kütüphanesi
├── 📁 Sprint Planlama
│   ├── Sprint 1 (Tamamlandı)
│   ├── Sprint 2 (Devam)
│   └── Backlog
└── 📁 Meeting Notes
    └── Toplantı notları
```

### Taşınacak İçerikler
1. **README Dosyaları** → Notion Pages
2. **TODO Listesi** → Notion Database
3. **Özellik Listesi** → Notion Board
4. **Bug Tracking** → Notion Table
5. **Sprint Planning** → Notion Timeline

### Notion Şablonları
```markdown
# Özellik Şablonu
- 📝 Açıklama
- 🎯 Hedef
- ✅ Kabul Kriterleri
- 👤 Atanan
- 📅 Deadline
- 🔗 İlgili Linkler
```

### Export/Import
```bash
# Markdown dosyalarını Notion'a import et
1. Notion'da yeni workspace oluştur
2. Import > Markdown seç
3. README dosyalarını seç
4. Organize et
```

---

## 4. 🔍 İsim/Marka Araştırması

### Marka Kontrol Listesi

#### A. Türkiye Patent Enstitüsü (TPE)
- **Website:** https://www.turkpatent.gov.tr
- **Kontrol:** Marka tescil sorgulaması
- **Sınıflar:** 35, 38, 41, 42 (Yazılım/Hizmet)

#### B. Online Araçlar
```
1. TPE E-Tescil: https://portal.turkpatent.gov.tr
2. Domain Checker: https://www.namecheap.com
3. Social Media: 
   - Instagram: @username
   - Twitter: @username
   - Facebook: /username
```

#### C. Benzer Markalar Araştırması
```typescript
Aranacak Kelimeler:
- "sori"
- "sorry"
- "sory"
- Benzer ses grupları
```

#### D. Sınıf Analizi
```
Nice Sınıfları:
- Sınıf 35: Reklam, işletme yönetimi
- Sınıf 38: Telekomünikasyon
- Sınıf 41: Eğitim, eğlence
- Sınıf 42: Bilimsel ve teknolojik hizmetler
```

### Risk Analizi
| Risk Seviyesi | Durum | Aksiyon |
|---------------|-------|---------|
| 🟢 Düşük | İsim müsait | Tescil et |
| 🟡 Orta | Benzer markalar var | Farklılaştır |
| 🔴 Yüksek | Aynı isim tescilli | İsim değiştir |

### Alternatif İsimler (Yedek)
```
1. Sori App
2. SoriTech
3. Sori Platform
4. [Şirket ismi] by Sori
```

---

## 5. 🔐 Website Güvenliği Araştırması

### Security Best Practices

#### A. Frontend Security
```typescript
// 1. XSS Prevention
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(userInput)

// 2. CSRF Protection
// Backend'de token doğrulama

// 3. Secure Storage
// localStorage yerine httpOnly cookies
```

#### B. Authentication & Authorization
```typescript
// JWT Token Storage
// ❌ localStorage (XSS riski)
// ✅ httpOnly cookie

// Role-Based Access Control
if (user.role !== 'admin') {
  return <AccessDenied />
}
```

#### C. HTTPS & SSL
```
✅ Let's Encrypt (Ücretsiz)
✅ Cloudflare SSL
✅ Force HTTPS redirect
```

#### D. Content Security Policy (CSP)
```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' 'unsafe-inline'"
>
```

### Security Checklist
- [ ] HTTPS kullanımı
- [ ] Environment variables güvenliği
- [ ] API key'leri gizli
- [ ] Input validation
- [ ] Output sanitization
- [ ] Rate limiting
- [ ] CORS ayarları
- [ ] Güvenlik header'ları

### Vulnerability Scan Tools
```bash
# npm audit
npm audit

# Snyk
npx snyk test

# OWASP ZAP (Manual test)
# Burp Suite (Professional)
```

### Security Headers
```typescript
// netlify.toml or vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "no-referrer" }
      ]
    }
  ]
}
```

---

## 6. 🎨 Logo Tasarımı

### Logo Konsept Önerileri

#### Konsept 1: Minimalist
```
- İsim: "sori"
- Font: Modern sans-serif
- Renk: Single color
- Stil: Clean, professional
```

#### Konsept 2: Icon + Text
```
- Icon: Abstract shape
- Text: "sori"
- Renk: Gradient
- Stil: Tech, friendly
```

#### Konsept 3: Lettermark
```
- Harf: "S"
- Stil: Stylized
- Renk: Bold colors
- Unique shape
```

### Design Specifications
```
Formats Needed:
- SVG (Scalable)
- PNG (Transparent, 512x512)
- PNG (Transparent, 1024x1024)
- ICO (16x16, 32x32, 64x64)
- Favicon (Multiple sizes)

Color Variations:
- Full color
- White (for dark backgrounds)
- Black (for light backgrounds)
- Single color
```

### Design Tools
```
Free:
- Figma
- Canva
- Inkscape

Paid:
- Adobe Illustrator
- Sketch
- Affinity Designer

AI Tools:
- Midjourney
- DALL-E
- Stable Diffusion
```

### Logo Yerleşimi
```typescript
// Sidebar Logo
<div className="p-6">
  <img 
    src="/logo.svg" 
    alt="Sori Logo" 
    className="h-10 w-auto"
  />
</div>

// Navbar Logo
<img src="/logo.svg" className="h-8" />

// Favicon
<link rel="icon" href="/favicon.ico" />
```

### Brand Guidelines
```
Primary Colors:
- Purple: #8B5CF6
- Pink: #EC4899

Typography:
- Headings: Inter Bold
- Body: Inter Regular

Logo Usage:
- Minimum size: 24px height
- Clear space: 2x logo height
- Don't stretch or distort
```

---

## ✅ Aksiyon Planı

### Hemen Yapılabilir
1. ✅ SVG import/export test et
2. ✅ Mobile responsive kontrol
3. ✅ npm audit çalıştır
4. ✅ TPE'de marka sorgula

### 1 Hafta İçinde
1. 📝 Notion workspace kur
2. 🎨 Logo konseptleri oluştur
3. 🔐 Security headers ekle
4. 🐛 Bug fix

### 1 Ay İçinde
1. 🏢 Marka tescili başvur
2. 🎨 Final logo tasarımı
3. 📱 Mobile app planla
4. 🚀 Production deploy

---

## 📞 Destek ve Kaynaklar

### Resmi Kurumlar
- **TPE:** https://www.turkpatent.gov.tr
- **Ticaret Bakanlığı:** https://www.ticaret.gov.tr

### Online Araçlar
- **Security Headers:** https://securityheaders.com
- **SSL Test:** https://www.ssllabs.com/ssltest
- **Lighthouse:** Chrome DevTools

### Topluluk
- **Stack Overflow:** React, TypeScript sorular
- **Reddit:** r/webdev, r/reactjs
- **Discord:** React türkiye

---

**Not:** Bu görevlerin çoğu teknik implementasyon gerektirmiyor, 
bu yüzden kod yerine rehber ve öneriler sunulmuştur.

**Proje Durumu:** 9/15 Özellik Tamamlandı ✅
**Frontend:** %100 Hazır 🎉
**Backend:** Bekleniyor ⏳

