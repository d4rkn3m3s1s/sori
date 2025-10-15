# ⏰ Aktivite Saati Bazlı Ödül Sistemi

## 🎯 Genel Bakış

Kullanıcıların uygulama kullanma saatlerine göre dinamik ödül bonusları sistemi. Farklı zaman dilimlerinde:
- 🎁 **Özel bonuslar** kazanın
- ⚡ **Ödül çarpanları** aktif olur
- 🌟 **Zaman temelli ödüller** belirir
- 🎮 **Farklı oyun deneyimleri** yaşanır

---

## 🕐 Zaman Dilimleri ve Bonuslar

### 1. 🌅 Sabah (06:00 - 12:00)

#### Bonus: Sabah Kahvesi ☕
- **Çarpan:** +%10 Ekstra Puan
- **Açıklama:** "Sabah erken kalkanlar için kahve bonusu!"
- **Gradient:** Orange to Yellow
- **İdeal İçin:** Kahvaltı mekanları, kafeler

#### Örnek Ödüller
```
Normal: 10-50 Puan
Bonus ile: 11-55 Puan (☕ Sabah Kahvesi Bonusu!)
```

#### Hedef Kullanıcılar
- Sabah erken kalkanlar
- İşe/okula giderken check-in yapanlar
- Sabah kahvaltısı yapan kullanıcılar

---

### 2. ☀️ Öğleden Sonra (12:00 - 18:00)

#### Bonus: Öğle Arası 🍽️
- **Çarpan:** +%15 İndirim Kuponu
- **Açıklama:** "Öğle vakti özel yemek indirimleri!"
- **Gradient:** Green to Emerald
- **İdeal İçin:** Restoranlar, yemek servisleri

#### Örnek Ödüller
```
Normal: 50-100 Puan
Bonus ile: 58-115 Puan (🍽️ Öğle Arası Bonusu!)
```

#### Hedef Kullanıcılar
- Öğle yemeği arayanlar
- Öğle molasında olanlar
- Afternoon break kullanıcıları

---

### 3. 🌆 Akşam (18:00 - 24:00)

#### Bonus: Akşam Molası 🌙
- **Çarpan:** +%20 Ekstra Ödül Şansı
- **Açıklama:** "Akşam saatlerinde şansınız daha yüksek!"
- **Gradient:** Purple to Pink
- **İdeal İçin:** Eğlence mekanları, akşam yemeği

#### Örnek Ödüller
```
Normal: 200-400 Puan
Bonus ile: 240-480 Puan (🌙 Akşam Molası Bonusu!)
```

#### Hedef Kullanıcılar
- İşten çıkanlar
- Akşam sosyalleşenler
- Dinner time kullanıcıları

---

### 4. 🦉 Gece (00:00 - 06:00)

#### Bonus: Gece Kuşu 🦉
- **Çarpan:** +%25 Ekstra Puan & Gizemli Rozet Şansı
- **Açıklama:** "Gece geç saatlerde nadir ödüller!"
- **Gradient:** Blue to Indigo
- **İdeal İçin:** Gece kulüpleri, 24 saat mekanlar

#### Örnek Ödüller
```
Normal: 600-1000 Puan
Bonus ile: 750-1250 Puan (🦉 Gece Kuşu Bonusu!)
+ Gizemli rozet kazanma şansı %50 artar
```

#### Hedef Kullanıcılar
- Gece çalışanlar
- Gece hayatı sevenler
- Night owl kullanıcılar

---

## 💻 Teknik İmplementasyon

### State Management

```typescript
// Zaman dilimleri
type ActivityPeriod = 'morning' | 'afternoon' | 'evening' | 'night'

// State'ler
const [currentHour] = useState(new Date().getHours())
const [activityPeriod, setActivityPeriod] = useState<ActivityPeriod>('morning')
```

### Zaman Hesaplama

```typescript
useEffect(() => {
  if (currentHour >= 6 && currentHour < 12) {
    setActivityPeriod('morning')      // 06:00-12:00
  } else if (currentHour >= 12 && currentHour < 18) {
    setActivityPeriod('afternoon')    // 12:00-18:00
  } else if (currentHour >= 18 && currentHour < 24) {
    setActivityPeriod('evening')      // 18:00-24:00
  } else {
    setActivityPeriod('night')        // 00:00-06:00
  }
}, [currentHour])
```

### Bonus Hesaplama Fonksiyonları

#### 1. Bonus Bilgileri
```typescript
const getTimeBonusRewards = (period: ActivityPeriod) => {
  switch (period) {
    case 'morning':
      return {
        name: 'Sabah Kahvesi',
        bonus: '+%10 Ekstra Puan',
        icon: '☕',
        color: 'from-orange-400 to-yellow-500',
        description: 'Sabah erken kalkanlar için kahve bonusu!'
      }
    // ... diğer zaman dilimleri
  }
}
```

#### 2. Çarpan Hesaplama
```typescript
const getTimeBasedMultiplier = (period: ActivityPeriod) => {
  switch (period) {
    case 'morning': return 1.1    // +%10
    case 'afternoon': return 1.15 // +%15
    case 'evening': return 1.2    // +%20
    case 'night': return 1.25     // +%25
  }
}
```

#### 3. Ödül Uygulama
```typescript
// Zaman bazlı çarpan uygula
const multiplier = getTimeBasedMultiplier(activityPeriod)
const timeBonus = getTimeBonusRewards(activityPeriod)

// Puan ödüllerini çarpan ile artır
if (randomReward.includes('Puan')) {
  const match = randomReward.match(/(\d+)-(\d+)/)
  if (match) {
    const min = Math.floor(parseInt(match[1]) * multiplier)
    const max = Math.floor(parseInt(match[2]) * multiplier)
    finalRewardName = `${min}-${max} Puan (${timeBonus.icon} ${timeBonus.name} Bonusu!)`
  }
}
```

---

## 🎨 UI/UX Tasarımı

### Bonus Kartı Komponenti

```tsx
<Card className={`bg-gradient-to-r ${getTimeBonusRewards(activityPeriod).color} border-2 border-white/30`}>
  <CardBody className="p-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="text-6xl animate-pulse">
          {getTimeBonusRewards(activityPeriod).icon}
        </div>
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-1">
            {getTimeBonusRewards(activityPeriod).name}
          </h3>
          <p className="text-white/90 text-sm mb-2">
            {getTimeBonusRewards(activityPeriod).description}
          </p>
          <Chip className="bg-white/20 text-white font-bold">
            {getTimeBonusRewards(activityPeriod).bonus}
          </Chip>
        </div>
      </div>
      
      <div className="text-white text-right">
        <Clock className="w-5 h-5" />
        <span>{currentHour}:00 - {currentHour + 1}:00</span>
        <p>🌅 Sabah (06:00-12:00)</p>
      </div>
    </div>
  </CardBody>
</Card>
```

### Görsel Özellikler
- ✨ **Animasyon:** Pulse effect on emoji
- 🎨 **Gradient:** Zaman dilimi bazlı renk geçişleri
- 🔔 **Chip:** Bonus göstergesi
- ⏰ **Clock:** Aktif zaman dilimi

---

## 📊 Ödül Örnekleri

### Başlangıç Kutusu (50 Puan)
| Zaman | Normal Ödül | Bonus Ödül | Artış |
|-------|------------|-----------|-------|
| Sabah | 10-50 Puan | 11-55 Puan | +10% |
| Öğle | 10-50 Puan | 12-58 Puan | +15% |
| Akşam | 10-50 Puan | 12-60 Puan | +20% |
| Gece | 10-50 Puan | 13-63 Puan | +25% |

### Altın Kutu (400 Puan)
| Zaman | Normal Ödül | Bonus Ödül | Artış |
|-------|------------|-----------|-------|
| Sabah | 200-400 Puan | 220-440 Puan | +10% |
| Öğle | 200-400 Puan | 230-460 Puan | +15% |
| Akşam | 200-400 Puan | 240-480 Puan | +20% |
| Gece | 200-400 Puan | 250-500 Puan | +25% |

### Elmas Kutu (1000 Puan)
| Zaman | Normal Ödül | Bonus Ödül | Artış |
|-------|------------|-----------|-------|
| Sabah | 600-1000 Puan | 660-1100 Puan | +10% |
| Öğle | 600-1000 Puan | 690-1150 Puan | +15% |
| Akşam | 600-1000 Puan | 720-1200 Puan | +20% |
| Gece | 600-1000 Puan | 750-1250 Puan | +25% |

---

## 🎮 Oyunlaştırma Stratejisi

### 1. Kullanıcı Davranış Değişikliği
- **Sabah:** Kahvaltı mekanlarına erken check-in
- **Öğle:** Restoranlarda öğle yemeği yorumları
- **Akşam:** Akşam mekan keşifleri
- **Gece:** 24 saat mekan kullanımı

### 2. Engagement Artırma
- ⏰ **Zamana özel notifikasyonlar:** "Şimdi %20 bonus var!"
- 🎯 **FOMO (Fear of Missing Out):** Bonus kaçırma korkusu
- 🏆 **Streak sistemi:** Ardışık gün kullanımı
- 📊 **Leaderboard:** Zaman dilimi bazlı sıralama

### 3. Pazar Hedefleme
- 🌅 **Sabah:** Kahvaltıcılar, kafeler
- ☀️ **Öğle:** Restoranlar, fast food
- 🌆 **Akşam:** Fine dining, eğlence
- 🦉 **Gece:** Barlar, kulüpler, 24 saat

---

## 📱 Push Bildirimleri

### Zaman Bazlı Bildirimler

#### Sabah (09:00)
```
☕ Günaydın! Sabah bonusu aktif!
Şimdi hediye kutusu açarsan %10 ekstra kazanırsın! 🎁
```

#### Öğle (12:30)
```
🍽️ Öğle arası vakti!
Hediye kutularında %15 bonus başladı! 🎉
```

#### Akşam (19:00)
```
🌙 Akşam molası bonusu!
En yüksek ödül şansı için şimdi oyna! %20 bonus! 🔥
```

#### Gece (23:00)
```
🦉 Gece kuşları! Son şans!
%25 bonus + Gizemli rozet şansı! ✨
```

---

## 📈 İstatistik ve Analitik

### Takip Edilmesi Gereken Metrikler

#### Kullanıcı Metrikleri
- Zaman dilimi bazlı aktif kullanıcı sayısı
- En popüler aktivite saatleri
- Zaman bazlı retention oranları
- Bonus kullanım oranları

#### İş Metrikleri
- İşletme türü bazlı zaman dilimleri
- Zaman bazlı yorum sayıları
- Peak hours engagement
- Revenue per time period

#### Örnek Dashboard
```
📊 Zaman Dilimi Performansı

🌅 Sabah (06:00-12:00)
   - Aktif Kullanıcı: 12,450
   - Kutu Açılma: 3,240
   - Ortalama Puan: 127

☀️ Öğle (12:00-18:00)
   - Aktif Kullanıcı: 18,670
   - Kutu Açılma: 5,890
   - Ortalama Puan: 184

🌆 Akşam (18:00-24:00)
   - Aktif Kullanıcı: 24,320 ⭐ En Yüksek
   - Kutu Açılma: 8,120
   - Ortalama Puan: 256

🦉 Gece (00:00-06:00)
   - Aktif Kullanıcı: 3,890
   - Kutu Açılma: 1,450
   - Ortalama Puan: 312 ⭐ En Yüksek
```

---

## 🚀 Gelecek Geliştirmeler

### Kısa Vadeli (1-2 Ay)
1. ✅ Backend entegrasyonu (gerçek zaman tracking)
2. ✅ Push bildirimleri sistemi
3. ✅ Zaman bazlı leaderboard
4. ✅ Analytics dashboard

### Orta Vadeli (3-6 Ay)
1. 📅 Hafta içi vs Hafta sonu farklı bonuslar
2. 🎉 Özel günlerde (bayram, yılbaşı) mega bonuslar
3. 🌦️ Hava durumu bazlı bonuslar
4. 📍 Lokasyon bazlı zaman bonusları

### Uzun Vadeli (6+ Ay)
1. 🤖 AI bazlı kişiselleştirilmiş zaman önerileri
2. 🎯 Kullanıcı alışkanlık analizi
3. 🏆 Zaman bazlı turnuvalar
4. 🎁 Sezonluk özel ödüller

---

## ⚠️ Önemli Notlar

### Dikkat Edilmesi Gerekenler
1. **Saat Dilimi:** Kullanıcının yerel saati kullanılmalı (timezone aware)
2. **Gerçek Zamanlı Güncelleme:** Her saatte bonus otomatik değişmeli
3. **Push Bildirim Zamanlaması:** Optimal engagement için doğru timing
4. **A/B Testing:** Farklı bonus oranları test edilmeli

### Best Practices
- Kullanıcı tercihlerini sakla (hangi zaman dilimini tercih ediyor)
- Spam'den kaçın (günde max 4 zaman bazlı bildirim)
- Bonus oranlarını dengeli tut (çok yüksek olmasın)
- Clear communication (kullanıcı bonusu anlasın)

---

## ✅ Tamamlanan İşlemler

### SurpriseGiftBoxPage.tsx
- ✅ Zaman bazlı state management
- ✅ ActivityPeriod state ve useEffect
- ✅ getTimeBonusRewards() fonksiyonu
- ✅ getTimeBasedMultiplier() fonksiyonu
- ✅ Time bonus card UI komponenti
- ✅ Ödül hesaplama çarpan entegrasyonu
- ✅ Dinamik gradient ve animasyonlar

---

**Hazırlayan:** AI Assistant  
**Tarih:** 15 Ekim 2025  
**Durum:** ✅ Tamamlandı (Frontend Ready)

