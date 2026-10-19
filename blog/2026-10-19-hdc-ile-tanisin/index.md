---
slug: hdc-ile-tanisin
title: "hdc ile tanışın: HarmonyOS cihazınızla komut satırından konuşmak"
date: 2026-10-19T11:00
authors: [topluluk]
tags: [rehber, gelistirici]
description: HarmonyOS geliştiricisinin en çok kullandığı araç hdc'nin temel komutları ve sınırları, her komutun ne yaptığı açıklanarak.
---

**hdc** (HarmonyOS Device Connector), bilgisayarınızdan bir HarmonyOS cihazına
komut göndermenizi, dosya aktarmanızı ve uygulama yüklemenizi sağlayan komut
satırı aracıdır. Android dünyasından geliyorsanız `adb`'nin karşılığı diyebiliriz.
Bu yazıda en sık kullanılan komutları tek tek açıklıyoruz.

{/* truncate */}

## Başlamadan önce

- `hdc`, HarmonyOS geliştirme araçlarıyla (DevEco Studio veya Command Line Tools)
  birlikte gelir. Kurulum için [Geliştirme ortamı](/docs/gelistiriciler/ortam-kurulumu)
  sayfasına bakın.
- Cihazda **geliştirici modu** ve **USB hata ayıklama** açık olmalıdır.
- Aşağıdaki komutları bilgisayarınızda bir **terminalde** çalıştırırsınız.

## Cihazı görmek

```bash
hdc list targets
```

Bağlı cihazların seri numaralarını listeler. `[Empty]` yazıyorsa bilgisayar
cihazı görmüyor demektir: kabloyu, geliştirici modunu ve cihaz ekranındaki
bağlantı onayını kontrol edin.

Birden fazla cihaz bağlıysa, komutun hangisine gideceğini `-t` ile seçersiniz:

```bash
hdc -t SERI_NUMARASI shell
```

## Cihazda komut çalıştırmak

```bash
hdc shell
```

Cihazda etkileşimli bir kabuk (shell) açar; çıkmak için `exit` yazın. Tek bir
komut çalıştırıp hemen dönmek için komutu tırnak içinde verin:

```bash
hdc shell "uname -m"
```

Bu örnek cihazın işlemci mimarisini yazdırır (HarmonyOS PC'lerde `aarch64`).

## Uygulama yüklemek ve kaldırmak

```bash
hdc install uygulama.hap
```

HAP dosyasını cihaza yükler. Uygulama zaten yüklüyse üzerine yazmak için `-r`
ekleyin: `hdc install -r uygulama.hap`.

```bash
hdc uninstall com.ornek.uygulama
```

Uygulamayı **paket adıyla** (bundle name) kaldırır. Cihazdaki tüm paket adlarını
görmek için:

```bash
hdc shell bm dump -a
```

`bm` (bundle manager) uygulama paketlerini yöneten araçtır; `dump -a` yüklü
tüm paketleri listeler.

## Uygulama başlatmak ve durdurmak

```bash
hdc shell aa start -a EntryAbility -b com.ornek.uygulama
```

`aa` (ability assistant) uygulama ekranlarını (ability) yönetir. `-b` paket
adını, `-a` başlatılacak ekranı belirtir; çoğu uygulamada ana ekranın adı
`EntryAbility`'dir.

```bash
hdc shell aa force-stop com.ornek.uygulama
```

Uygulamayı zorla kapatır. Uygulama zaten açıkken `aa start` yalnızca onu öne
getirir; baştan başlatmak istiyorsanız önce `force-stop` kullanın.

## Dosya aktarmak

```bash
hdc file send yerel_dosya.txt /data/local/tmp/
hdc file recv /data/local/tmp/sonuc.txt .
```

`send` bilgisayardan cihaza, `recv` cihazdan bilgisayara dosya kopyalar. Sondaki
`.` "bulunduğum klasör" demektir.

## Günlükleri (log) okumak

```bash
hdc shell hilog
```

Cihazın sistem ve uygulama günlüklerini canlı olarak akıtır; durdurmak için
`Ctrl+C`. Satıştaki cihazlarda bilgi (INFO) seviyesindeki günlükler varsayılan
olarak tutulmaz. Kendi uygulamanızın günlükleri boş görünüyorsa önce seviyeyi
düşürün, sonra uygulamayı yeniden başlatın:

```bash
hdc shell hilog -b D
```

## hdc'nin sınırları

`hdc shell` ile açılan kabuk, cihazda **yönetici (root) değil**, sınırlı
yetkili bir kullanıcı olarak çalışır. Bunu kendiniz görebilirsiniz:

```bash
hdc shell id
```

HarmonyOS PC'de çıktı `uid=2000(shell)` gibidir. Pratikte bunun anlamı:

- Uygulamaların kendi klasörlerini (sandbox) okuyamazsınız. Bir uygulamadan
  bilgi almak için onun günlüklerine (`hilog`) bakın.
- `/data/local/tmp` klasörüne dosya yazabilirsiniz, ama oradan **program
  çalıştıramazsınız**. Kendi derlediğiniz bir programı cihazda çalıştırmak için
  onu imzalayıp bir uygulama paketiyle birlikte yüklemeniz gerekir. Bu konuyu
  [Çapraz derlemeye giriş](/blog/capraz-derlemeye-giris) yazısında anlatıyoruz.

Bunlar bir hata değil, platformun güvenlik tasarımıdır. Bir şey "Permission
denied" verdiğinde önce bu sınırları hatırlayın.

## Hızlı başvuru

| Ne yapmak istiyorum? | Komut |
| --- | --- |
| Bağlı cihazları gör | `hdc list targets` |
| Cihazda kabuk aç | `hdc shell` |
| Uygulama yükle / güncelle | `hdc install -r uygulama.hap` |
| Uygulama kaldır | `hdc uninstall <paket-adı>` |
| Yüklü paketleri listele | `hdc shell bm dump -a` |
| Uygulamayı başlat | `hdc shell aa start -a EntryAbility -b <paket-adı>` |
| Uygulamayı kapat | `hdc shell aa force-stop <paket-adı>` |
| Dosya gönder / al | `hdc file send …` / `hdc file recv …` |
| Günlükleri izle | `hdc shell hilog` |
