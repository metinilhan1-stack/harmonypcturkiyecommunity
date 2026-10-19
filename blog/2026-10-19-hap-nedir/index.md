---
slug: hap-nedir
title: "HAP nedir? HarmonyOS uygulama paketine yakından bakış"
date: 2026-10-19T10:00
authors: [topluluk]
tags: [baslangic, rehber]
description: HarmonyOS uygulamalarının paket biçimi HAP'ın içinde neler var, neden imzalı olmak zorunda ve HAR, HSP, App Pack gibi terimler ne anlama geliyor?
---

HarmonyOS PC'de bir uygulama yüklediğinizde aslında bir **HAP** dosyası
yüklersiniz. Bu yazıda HAP'ın ne olduğunu, içinde neler bulunduğunu ve neden her
HAP dosyasının her cihaza yüklenemediğini anlatıyoruz.

{/* truncate */}

## Kısaca HAP

HAP, **Harmony Ability Package**'ın kısaltmasıdır. Windows'taki kurulum
dosyasının ya da Android'deki `.apk` dosyasının HarmonyOS'taki karşılığıdır.
Dosya uzantısı `.hap`'tır.

Teknik olarak bir HAP, belirli bir düzene göre hazırlanmış bir **ZIP
arşividir**. Bu yüzden içine bakmak için özel bir araca gerek yoktur:

```bash
unzip -l uygulama.hap
```

`unzip -l` arşivi açmadan içindeki dosyaları listeler.

## İçinde neler var?

Tipik bir HAP'ta şunları görürsünüz:

| Dosya / klasör | Ne işe yarar? |
| --- | --- |
| `module.json` | Uygulamanın kimlik kartı: paket adı (bundle name), sürüm, istediği izinler, ekranları (ability'ler). |
| `ets/modules.abc` | ArkTS ile yazılmış kodun derlenmiş hâli (bytecode). |
| `resources/`, `resources.index` | Simgeler, metinler, görseller ve bunların dizini. |
| `libs/arm64-v8a/` | Varsa C/C++ ile yazılmış yerel (native) kütüphaneler (`.so`). |
| `pack.info` | Paketleme bilgileri. |

:::tip[İlginç bir ayrıntı]
Uygulamanın paket adı yalnızca `module.json`'da değil, derlenmiş kodun
(`modules.abc`) içinde de bulunur. Bu yüzden başkasının HAP dosyasını açıp
yalnızca `module.json`'daki paket adını değiştirerek "yeniden paketlemek"
çalışmaz: uygulama açılırken hata verir.
:::

## Neden imzalı olmak zorunda?

HarmonyOS, her HAP'ın dijital olarak imzalanmış olmasını ister ve yüklemeden
önce imzayı doğrular. İmza iki soruya cevap verir:

1. **Bu paketi kim yaptı?** İmza, geliştiricinin AppGallery Connect'ten aldığı
   sertifikaya dayanır.
2. **Bu paket bu cihaza yüklenebilir mi?** Geliştirme (debug) imzasında,
   paketin yükleneceği cihazların kimlikleri (UDID) imza profilinde kayıtlıdır.

Bu yüzden internette bulduğunuz rastgele bir HAP dosyası büyük olasılıkla
cihazınıza yüklenmez. Ayrıntılar için
[Uygulama yükleme](/docs/kullanicilar/uygulama-yukleme) ve
[Uygulama imzalama](/docs/gelistiriciler/imzalama) sayfalarına bakın.

## Karıştırılan terimler

| Terim | Anlamı |
| --- | --- |
| **HAP** | Yüklenebilir uygulama modülü. Bir uygulamada bir ana (`entry`) HAP ve isteğe bağlı ek (`feature`) HAP'lar olabilir. |
| **HAR** | *Harmony Archive.* Derleme sırasında uygulamaya gömülen, statik bir kod kütüphanesi. Tek başına yüklenmez. |
| **HSP** | *Harmony Shared Package.* Birden fazla modülün çalışma anında paylaştığı kütüphane. |
| **App Pack** (`.app`) | AppGallery'ye yüklemek için uygulamanın tüm HAP'larını bir araya getiren paket. |

:::caution[Geliştiriciler için: App Pack'te imzalama sırası]
App Pack oluşturan paketleme aracı, içine koyduğu HAP'ların imzalarını
kaldırır. Bu yüzden önce paketleyip **sonra** imzalamanız gerekir; önceden
imzalanmış HAP'ları paketlemek imzasız bir App Pack üretir.
:::

## Özet

- HAP, HarmonyOS uygulamalarının paket biçimidir ve aslında bir ZIP arşividir.
- İçinde uygulamanın tanımı, derlenmiş kodu, kaynakları ve varsa yerel
  kütüphaneleri bulunur.
- İmzası olmayan ya da sizin cihazınız için imzalanmamış bir HAP yüklenmez.

Sorunuz mu var? [Soru-Cevap](/soru-cevap) bölümünde sorabilirsiniz.
