---
sidebar_position: 2
title: Uygulama imzalama
---

# Uygulama imzalama

HarmonyOS, her HAP paketinin imzalı olmasını ister ve yüklemeden önce imzayı
doğrular. HarmonyOS PC'de uygulama geliştirirken en çok zaman kaybettiren konu
genellikle imzalamadır; bu sayfa temel kavramları özetler.

## Temel kavramlar

| Terim | Açıklama |
| --- | --- |
| **Anahtar deposu** (`.p12`) | Özel anahtarınızın saklandığı, parola korumalı dosya. **Asla paylaşmayın.** |
| **Sertifika** (`.cer`) | AppGallery Connect'te (AGC) anahtarınız için üretilen sertifika. |
| **Profil** (`.p7b`) | Hangi uygulamanın (bundle name), hangi sertifikayla ve hangi cihazlarda çalışabileceğini belirten dosya. |
| **UDID** | Cihazın benzersiz kimliği. Hata ayıklama profiline eklenir. |

## Hata ayıklama (debug) ve yayın (release) imzası

- **Debug imzası:** Geliştirme ve test içindir. HAP yalnızca **profilde UDID'si
  kayıtlı cihazlara** yüklenebilir. Test kullanıcılarına HAP gönderecekseniz
  önce onların UDID'lerini AGC'ye kaydedip profili yeniden üretmeniz gerekir.
- **Release imzası:** AppGallery'de yayınlamak içindir. Release imzalı bir HAP
  cihaza elle yüklenemez.

Bir cihazın UDID'si şu komutla alınır:

```bash
hdc shell bm get --udid
```

## Genel akış

1. AppGallery Connect'te bir **proje** ve içinde bir **uygulama** oluşturun.
   Uygulamanın paket adı (bundle name) projenizdekiyle **birebir aynı** olmalıdır.
2. Bir anahtar deposu ve sertifika imzalama isteği (CSR) üretin, AGC'de bundan bir
   **debug sertifikası** oluşturun.
3. Test edeceğiniz cihazları UDID'leriyle AGC'ye **kaydedin**.
4. Sertifika, uygulama ve cihazları seçerek bir **debug profili** oluşturun.
5. Projenin `build-profile.json5` dosyasındaki `signingConfigs` bölümüne anahtar
   deposunu, sertifikayı ve profili tanımlayın (ya da DevEco Studio'da otomatik
   imzalamayı kullanın).

## Sık yapılan hatalar

- **Yanlış sertifikayı seçmek.** AGC hesabınızda birden fazla debug sertifikası
  olabilir; ama özel anahtarı sizin bilgisayarınızda olan yalnızca biridir.
  Profili yanlış sertifikayla üretirseniz derleme başarılı olur, hata ancak
  cihaza **yüklerken** ortaya çıkar.
- **Paket adı uyuşmazlığı.** Profildeki paket adıyla uygulamanınki farklıysa
  yükleme başarısız olur.
- **Yeni cihaz eklendi ama profil yenilenmedi.** UDID ekledikten sonra profili
  yeniden üretip indirmeniz ve HAP'ı yeniden imzalamanız gerekir.

:::danger[Gizli bilgileri paylaşmayın]
`.p12` dosyanızı, anahtar deposu parolasını veya AGC hesap bilgilerinizi hiçbir
topluluk kanalında paylaşmayın. Yardım isterken hata mesajını paylaşın; parolaların
görünebileceği komut çıktılarını (ör. `bash -x` ile izlenen betikler) paylaşmadan
önce kontrol edin.
:::
