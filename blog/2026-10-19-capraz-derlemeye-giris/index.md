---
slug: capraz-derlemeye-giris
title: "Çapraz derlemeye giriş: Linux'ta HarmonyOS PC için C programı derlemek"
date: 2026-10-19T12:00
authors: [topluluk]
tags: [gelistirici, rehber]
description: HarmonyOS SDK'daki clang ile Linux üzerinde HarmonyOS PC için ilk C programınızı derleyin, CMake'e geçin ve programı cihazda çalıştırmak için neler gerektiğini öğrenin.
---

HarmonyOS PC'de bir programı çalıştırmak için onu HarmonyOS için **derlemek**
gerekir. Bu derleme genellikle cihazın kendisinde değil, başka bir bilgisayarda
yapılır. Buna **çapraz derleme** (cross-compiling) denir. Bu yazıda Linux
üzerinde ilk C programımızı HarmonyOS PC için derliyoruz.

{/* truncate */}

## Neden "çapraz"?

Bilgisayarınız büyük olasılıkla **x86_64** işlemcilidir ve glibc kullanan bir
Linux çalıştırır. HarmonyOS PC'ler ise **aarch64** (64 bit ARM) işlemcilidir ve
**musl** C kütüphanesini kullanır. Yani derleyicinin, üzerinde çalıştığı
sistem için değil, **başka bir sistem** için kod üretmesi gerekir. HarmonyOS
SDK'daki `clang` derleyicisi tam olarak bunu yapar.

## 1. SDK'yı bulun

HarmonyOS SDK'nın **native** klasöründe ihtiyacımız olan her şey var:

| Yol | İçerik |
| --- | --- |
| `native/llvm/bin/clang` | Derleyici |
| `native/sysroot` | HarmonyOS'un başlık dosyaları ve sistem kütüphaneleri |
| `native/build/cmake/ohos.toolchain.cmake` | CMake için hazır ayar dosyası |

Komutları kısaltmak için SDK'nın native klasörünün üst klasörünü bir
değişkene atayalım. Kendi yolunuzu yazın:

```bash
export OHOS_SDK="$HOME/command-line-tools/sdk/default/openharmony"
```

`export`, bu terminal oturumu boyunca `$OHOS_SDK` yazdığınız her yere bu yolun
konmasını sağlar. Doğru yolu verdiğinizi kontrol edin:

```bash
ls "$OHOS_SDK/native/llvm/bin/clang"
```

Dosya yolu geri yazılıyorsa doğru yerdesiniz; "No such file or directory"
görüyorsanız yolu düzeltin.

## 2. İlk program

`merhaba.c` adında bir dosya oluşturun:

```c
#include <stdio.h>

int main(void) {
    printf("Merhaba, HarmonyOS PC!\n");
    return 0;
}
```

Ve derleyin:

```bash
"$OHOS_SDK/native/llvm/bin/clang" \
  --target=aarch64-linux-ohos \
  --sysroot="$OHOS_SDK/native/sysroot" \
  -Wl,--code-sign \
  merhaba.c -o merhaba
```

Parametreler:

- `--target=aarch64-linux-ohos`: "64 bit ARM üzerinde çalışan HarmonyOS için
  derle".
- `--sysroot=…`: başlık dosyalarını ve kütüphaneleri bilgisayarınızın değil,
  HarmonyOS'un klasöründen al.
- `-Wl,--code-sign`: bağlayıcıya (linker) programı **imzalamasını** söyler.
  Neden gerektiğini aşağıda anlatıyoruz.

Sonucu kontrol edin:

```bash
file merhaba
```

Çıktıda `ARM aarch64` ifadesini görmelisiniz. Bu program artık sizin
bilgisayarınızda **çalışmaz**; başka bir mimari için derlendi.

## 3. CMake ile derlemek

Gerçek projeler genellikle CMake kullanır. SDK'daki hazır ayar dosyasını
(toolchain file) vermeniz yeterlidir:

```bash
cmake -B build \
  -DCMAKE_TOOLCHAIN_FILE="$OHOS_SDK/native/build/cmake/ohos.toolchain.cmake" \
  -DOHOS_ARCH=arm64-v8a
cmake --build build
```

`-B build` derleme dosyalarını `build` klasörüne koyar; `OHOS_ARCH=arm64-v8a`
hedef mimariyi seçer.

## 4. Neden imza?

HarmonyOS PC, **kod imzası olmayan programları ve kütüphaneleri çalıştırmaz**.
İmzasız bir dosyayı çalıştırmaya ya da yüklemeye çalıştığınızda
`Permission denied` hatası alırsınız ve `chmod +x` bunu düzeltmez.

İki yol vardır:

- **Derlerken imzalamak:** Yukarıdaki gibi `-Wl,--code-sign` kullanmak. CMake
  projelerinde bunu bağlayıcı parametrelerine (`LDFLAGS`) ekleyebilirsiniz.
- **Sonradan imzalamak:** SDK'nın `toolchains/lib` klasöründeki
  `binary-sign-tool` ile:

  ```bash
  "$OHOS_SDK/toolchains/lib/binary-sign-tool" sign \
    -inFile merhaba -outFile merhaba.imzali -selfSign 1
  ```

  `-selfSign 1`, programı kendi oluşturduğu bir imzayla (öz imza) imzalar.

:::caution[strip imzayı bozar]
İmzaladıktan sonra programı `strip` ile küçültürseniz imza bölümü bozulur.
Önce `strip`, sonra imza.
:::

## 5. Peki cihazda nasıl çalıştırırım?

Burada çoğu kişinin takıldığı bir nokta var. Android'deki alışkanlıkla dosyayı
`/data/local/tmp`'ye gönderip orada çalıştırmak HarmonyOS PC'de **işe yaramaz**:
o klasöre yazabilirsiniz ama oradan program çalıştıramazsınız (ayrıntılar
[hdc ile tanışın](/blog/hdc-ile-tanisin#hdcnin-sınırları) yazısında).

Kendi derlediğiniz bir programı cihazda çalıştırmanın yolu, onu bir
**uygulama paketiyle (HAP) birlikte** cihaza yüklemektir. Komut satırı araçları
için HarmonyOS'un bu iş için kullandığı paket biçimi **HNP**'dir (HarmonyOS
native package). Bu konuyu ayrı bir yazıda ele alacağız.

## Özet

- HarmonyOS PC için derleme, SDK'daki `clang` ile başka bir bilgisayarda yapılır.
- Hedef: `aarch64-linux-ohos`, sistem kütüphanesi: `musl`.
- Her program ve kütüphane **imzalı** olmalıdır.
- Program, cihaza bir uygulama paketiyle birlikte yüklenerek çalıştırılır.

Takıldığınız bir yer olursa [Soru-Cevap](/soru-cevap) bölümünde sorun.
