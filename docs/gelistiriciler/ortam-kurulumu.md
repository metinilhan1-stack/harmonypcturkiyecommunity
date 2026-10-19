---
sidebar_position: 1
title: Geliştirme ortamı
---

# Geliştirme ortamı

HarmonyOS PC için uygulama geliştirmek ya da bir uygulamayı taşımak için
ihtiyacınız olanlar:

| Bileşen | Ne işe yarar? |
| --- | --- |
| **DevEco Studio** | Huawei'nin resmî geliştirme ortamı (IDE). Windows ve macOS için sunulur. |
| **Command Line Tools** | DevEco Studio olmadan, komut satırından derleme yapmak için araçlar (`hvigorw`, `ohpm`, `hdc` ve SDK). **Linux'ta** çalışmanın yolu budur. |
| **HarmonyOS SDK** | API'ler, ArkTS derleyicisi ve C/C++ için **Native SDK** (NDK: `clang` derleyicisi, `musl` tabanlı sistem kütüphaneleri). |
| **Huawei geliştirici hesabı** | Uygulamaları imzalamak için gereken **AppGallery Connect (AGC)** erişimi. Ayrıntılar: [İmzalama](./imzalama.md). |
| **Gerçek cihaz** | Masaüstü (PC) davranışları emülatörde tam olarak görülmez; son test her zaman gerçek bir HarmonyOS PC'de yapılmalıdır. |

Araçları [HarmonyOS geliştirici sitesinden](https://developer.huawei.com/consumer/en/harmonyos/)
indirin. İndirme için Huawei geliştirici hesabıyla giriş yapmanız gerekir.

## Linux'ta komut satırı araçlarını kurmak

İndirdiğiniz Command Line Tools arşivini bir klasöre açtıktan sonra araçların
her terminalde bulunabilmesi için klasörü **`PATH`** değişkenine eklemeniz gerekir.
`PATH`, terminalin bir komut yazdığınızda programı hangi klasörlerde arayacağını
belirleyen listedir.

Örneğin araçları `~/command-line-tools` klasörüne açtıysanız (`~` ev klasörünüz
demektir), şu satırı `~/.bashrc` dosyasının sonuna ekleyin:

```bash
export PATH="$HOME/command-line-tools/bin:$PATH"
```

Bu satır, araç klasörünü listenin **başına** ekler. Değişikliğin geçerli olması
için terminali kapatıp yeniden açın, ardından doğrulayın:

```bash
hdc version
```

Bir sürüm numarası görüyorsanız kurulum tamamdır.

:::caution[Linux'ta USB izni]
Linux'ta `hdc list targets` cihazı göremiyorsa sorun çoğu zaman USB erişim
iznidir: normal kullanıcının USB cihazına erişmesi için bir **udev kuralı**
gerekir. Bu konuda dağıtımınıza özel bir rehber eklemek isterseniz
[katkı verin](../topluluk/katki.md).
:::

## Bilinen tuzaklar

Bunlar topluluk üyelerinin gerçek projelerde karşılaştığı, ilk bakışta
anlaşılmayan sorunlardır:

- **SDK, `diff` komutunu gölgeliyor.** HarmonyOS SDK'nın araç klasörlerinden
  birinde HAP dosyaları için `diff` adlı bir araç bulunur. Bu klasör `PATH`'te
  sistemin `/usr/bin` klasöründen önce gelirse, `diff` yazdığınızda sistemin dosya
  karşılaştırma aracı yerine bu araç çalışır: hiçbir çıktı üretmez ve başarılı
  (çıkış kodu 0) döner. Hangi `diff`'in çalıştığını görmek için:

  ```bash
  which -a diff
  ```

  Bu komut, `PATH`'teki tüm `diff` programlarını öncelik sırasıyla listeler; ilk
  satır çalışacak olandır.

- **Dağıtım deposundaki `pkg-config` yerine yanlış araç.** Python ile
  (`pip install pkgconf`) kurulan `pkgconf` paketi sistem `pkg-config`'inin önüne
  geçebilir ve tüm sorgulara boş cevap verir. Çapraz derlemede bu, çok sonra
  "başlık dosyası bulunamadı" hatası olarak ortaya çıkar. `which -a pkg-config`
  ile kontrol edin.

## Sonraki adım

Uygulamanızı cihaza yükleyebilmek için önce imzalamanız gerekir:
[İmzalama](./imzalama.md).
