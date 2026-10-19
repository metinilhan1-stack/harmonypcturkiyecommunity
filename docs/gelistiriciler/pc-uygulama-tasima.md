---
sidebar_position: 3
title: Masaüstü uygulamalarını taşıma
---

# Masaüstü uygulamalarını HarmonyOS PC'ye taşıma

"Taşıma" (porting), Linux veya Windows için yazılmış açık kaynaklı bir programı
HarmonyOS PC'de çalışacak hâle getirmektir. Bu sayfa genel bir yol haritası
sunar; her uygulama türü için ayrıntılı rehberler zamanla eklenecek.

## Önce uygulamanın türünü belirleyin

| Tür | Örnek | Nasıl teslim edilir? |
| --- | --- | --- |
| **Komut satırı aracı** (C/C++, Rust, Go…) | sıkıştırma araçları, kod analizcileri | Çapraz derlenmiş program, bir HAP veya HNP paketi içinde |
| **Kütüphane** | görüntü/ses kütüphaneleri | Paylaşımlı kütüphane (`.so`), başka uygulamalara gömülür |
| **Qt ile yazılmış masaüstü uygulaması** | medya oynatıcılar, mühendislik araçları | HAP; Qt'nin OpenHarmony sürümüyle derlenir |
| **Diğer grafik arayüzlü uygulamalar** (GTK, Electron, Java/Swing…) | — | Arayüz katmanına göre değişir; çoğu zaman en zor durum budur |

## Çapraz derleme

HarmonyOS PC programları **başka bir bilgisayarda** (genellikle Linux) derlenir.
Buna çapraz derleme (cross-compiling) denir. Temel bilgiler:

- **Derleyici:** SDK'nın Native bölümündeki `clang`.
- **Hedef:** `aarch64-unknown-linux-ohos` (64 bit ARM).
- **C kütüphanesi:** `glibc` değil, **`musl`**. glibc'ye özgü işlevlere ya da
  davranışlara güvenen kodlar düzeltme gerektirebilir (ör. hata mesajlarının
  metni, bazı `printf` ayrıntıları).
- **Derleme sistemleri:** CMake için SDK'nın toolchain dosyası, Meson için bir
  cross-file, Autotools için `--host` parametresi kullanılır. `config.guess`
  dosyası `ohos` hedefini tanımıyorsa güncellenmesi gerekir.

## Platform farkları

Masaüstü Linux'tan alışık olduğunuz bazı şeyler HarmonyOS PC'de farklıdır:

- **İmzasız program çalıştırılamaz.** Cihazda çalıştırılacak her ELF programının
  ve kütüphanenin kod imzası olmalıdır; aksi hâlde `Permission denied` alırsınız.
- **Uygulamalar korumalı alanda (sandbox) çalışır.** `/tmp` gibi alışılmış
  klasörlere yazamayabilirsiniz; uygulamanın kendi klasörlerini kullanın.
- **Sistem dosyaları her zaman yerinde değildir.** CA sertifikaları, `terminfo`
  veya yerel ayar (locale) verileri gibi dosyaları programınızla birlikte
  paketlemeniz gerekebilir.
- **Qt5 OpenHarmony paketinde OpenSSL yok.** Taşınan bir Qt5 uygulamasında tüm
  `https` istekleri başarısız oluyorsa sorun izinler değil, eksik SSL
  desteğidir.

## Test ve hata ayıklama

- Son testi her zaman **gerçek cihazda** yapın.
- Uygulama günlükleri `hilog` ile okunur. Satıştaki (retail) cihazlarda bilgi
  (INFO) seviyesindeki günlükler varsayılan olarak gösterilmez; günlükleriniz
  boş görünüyorsa önce seviyeyi düşürün:

  ```bash
  hdc shell hilog -b D
  ```

  Bu komut, cihazın DEBUG ve üstü seviyedeki günlükleri tutmasını sağlar.
  Ardından uygulamayı kapatıp yeniden başlatın ve tekrar deneyin.

- Bir test "sıfır sonuç" veriyorsa önce **testin kendisinden** şüphelenin: aynı
  denetimin sıfırdan farklı bir sonuç üretebildiğini kanıtlamadan uygulamanın
  bozuk olduğuna karar vermeyin.

## Arayüz kalitesi

Bir uygulamanın "çalışması" yetmez. Taşınan arayüzlerin HarmonyOS'un görsel
standartlarına (yazı tipleri, ölçekleme, koyu tema, pencere davranışı) uyması
gerekir. Değişiklik yaptığınızda **öncesi ve sonrası** ekran görüntülerini
karşılaştırın.

## Kaynaklar

- OpenHarmony topluluğunun C/C++ üçüncü taraf kütüphane taşıma çalışmaları
  (`tpc_c_cplusplus` / **lycium** derleme çerçevesi), hazır taşınmış birçok
  kütüphane içerir. Bir bağımlılığı kendiniz taşımadan önce orada olup
  olmadığına bakın.
- Taşıdığınız uygulamayı [Taşınan uygulamalar](../tasinan-uygulamalar.md)
  listesine ekleyin.
