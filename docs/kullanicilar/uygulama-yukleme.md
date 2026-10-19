---
sidebar_position: 1
title: Uygulama yükleme
---

# Uygulama yükleme

HarmonyOS PC'ye uygulama yüklemenin iki yolu vardır:

1. **AppGallery'den yüklemek** — önerilen ve günlük kullanım için doğru yol.
2. **HAP dosyasıyla elle yüklemek** — geliştiriciler ve test kullanıcıları için.

## 1. AppGallery'den yükleme

AppGallery, HarmonyOS'un resmî uygulama mağazasıdır. Uygulamayı arayın,
**Yükle**'ye basın. Güncellemeler de buradan otomatik gelir.

:::tip
Bir uygulamayı AppGallery'den yüklerseniz güncellemeleri de AppGallery üzerinden
alırsınız. Elle (HAP dosyasıyla) yüklenen uygulamalar ise AppGallery'deki
güncellemeleri görmez.
:::

## 2. HAP dosyasıyla elle yükleme

HAP, HarmonyOS uygulama paketidir (Windows'taki `.exe` kurulum dosyasına ya da
Android'deki `.apk` dosyasına benzer). Mağazada olmayan bir uygulamayı, örneğin
bir geliştiricinin test sürümünü denemek için HAP dosyası kullanılır.

### Neden her HAP dosyası yüklenmez?

Bu, en sık karşılaşılan sorudur. HarmonyOS her uygulamanın **dijital olarak
imzalanmış** olmasını ister ve imzayı yüklemeden önce kontrol eder:

- **Hata ayıklama (debug) imzalı HAP:** Yalnızca, imza profilinde **cihaz
  kimliği (UDID)** kayıtlı olan cihazlara yüklenebilir. Yani geliştiricinin bu
  HAP'ı sizin cihazınız için imzalamış olması gerekir.
- **Yayın (release) imzalı HAP:** AppGallery'de dağıtılmak içindir. Elle
  yüklenemez.

Bu yüzden bir geliştiriciden test sürümü istiyorsanız önce ona **cihazınızın
UDID'sini** göndermeniz gerekir (aşağıya bakın).

### Adım adım

:::caution[Güvenlik]
Yalnızca güvendiğiniz kaynaklardan HAP dosyası yükleyin. "Kırılmış" (crack)
veya imzası değiştirilmiş uygulamalar bu topluluğun kuralları gereği
paylaşılmaz.
:::

**a) Geliştirici modunu açın.** Ayarlar'da cihaz bilgilerinin bulunduğu sayfaya
gidin ve **sürüm numarasına** art arda (genellikle 7 kez) dokunun. Ardından
geliştirici seçeneklerinde **USB hata ayıklama**yı açın.

:::note
Menü adları ve yerleri HarmonyOS sürümüne göre değişebilir. Cihazınızda farklıysa
bu sayfayı güncellemek için [katkı verebilirsiniz](../topluluk/katki.md).
:::

**b) Başka bir bilgisayara `hdc` kurun.** `hdc` (HarmonyOS Device Connector),
bilgisayarınızdan HarmonyOS cihazına komut göndermeye yarayan araçtır. HarmonyOS
geliştirme araçlarıyla birlikte gelir; kurulumu için
[Geliştirme ortamı](../gelistiriciler/ortam-kurulumu.md) sayfasına bakın.

**c) Cihazı bağlayın ve görüldüğünü doğrulayın.** Bir terminal (komut satırı)
açıp şunu yazın:

```bash
hdc list targets
```

Bu komut bağlı cihazların listesini gösterir. Listede bir seri numarası
görüyorsanız bağlantı hazırdır. `[Empty]` görüyorsanız kabloyu, geliştirici
modunu ve cihaz ekranındaki "hata ayıklamaya izin ver" onayını kontrol edin.

**d) Cihazınızın UDID'sini öğrenin** (geliştiriciye göndermek için):

```bash
hdc shell bm get --udid
```

`hdc shell` cihaz üzerinde bir komut çalıştırır; `bm get --udid` ise cihazın
benzersiz kimliğini yazdırır.

**e) HAP dosyasını yükleyin:**

```bash
hdc install uygulama.hap
```

`uygulama.hap` yerine kendi dosyanızın adını yazın. Komutu, dosyanın bulunduğu
klasörde çalıştırın ya da dosyanın tam yolunu verin.

**Uygulamayı kaldırmak için** uygulamanın paket adını (bundle name) kullanın:

```bash
hdc uninstall com.ornek.uygulama
```

## Yükleme hata verirse

| Belirti | Olası neden |
| --- | --- |
| İmza doğrulama hatası | HAP sizin cihazınız için imzalanmamış (UDID profilde yok) ya da release imzalı. Geliştiriciye UDID'nizi gönderin. |
| `hdc list targets` boş | USB hata ayıklama kapalı, kablo yalnızca şarj kablosu ya da cihazda bağlantı onayı verilmedi. |
| Uygulama açılıp hemen kapanıyor | Bu genellikle uygulamanın kendisindeki bir sorundur. Geliştiriciye bildirin. |
