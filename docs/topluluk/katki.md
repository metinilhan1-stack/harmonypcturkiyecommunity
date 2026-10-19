---
sidebar_position: 2
title: Nasıl katkı verilir?
---

# Nasıl katkı verilir?

Bu site topluluğun katkılarıyla büyür. Yazılım geliştirici olmanız gerekmez:
bir yazım hatasını düzeltmek de, kendi cihazınızda bir adımı doğrulamak da
değerli bir katkıdır.

## Katkı yolları

- **Hata bildirin.** Yanlış, eksik ya da güncelliğini yitirmiş bir bilgi
  gördüyseniz bildirin.
- **Rehber yazın.** Bir sorunu çözdüyseniz çözümü yazın; bir başkası aynı
  sorunla karşılaştığında saatler kazanır.
- **Taşıdığınız uygulamayı ekleyin.** [Taşınan uygulamalar](../tasinan-uygulamalar.md)
  listesine bir satır ekleyin.
- **Doğrulayın.** Bir rehberdeki adımları kendi cihazınızda deneyip sonucu
  bildirin; özellikle farklı HarmonyOS sürümlerinde.

## Site nasıl çalışır?

Bu site [Docusaurus](https://docusaurus.io/) ile oluşturulmuştur. Her sayfa
`docs/` klasöründeki bir **Markdown** (`.md`) dosyasıdır. Markdown, düz metne
birkaç basit işaret ekleyerek biçimlendirme yapmanızı sağlar:

```md
# Başlık
## Alt başlık

**kalın**, _italik_, `kod`

- madde işaretli liste
1. numaralı liste

[bağlantı metni](https://ornek.com)
```

Yeni bir sayfa eklemek için ilgili klasörde yeni bir `.md` dosyası oluşturmanız
yeterlidir; kenar çubuğu otomatik güncellenir.

## Değişiklik nasıl gönderilir?

Sitenin kaynak kodu GitHub'dadır. Değişiklikler **pull request** (birleştirme
isteği) ile gönderilir: önerdiğiniz değişiklik bir moderatör tarafından gözden
geçirilir ve onaylanınca sitede yayınlanır. Bunun için ücretsiz bir GitHub
hesabı yeterlidir.

**En kolay yol (komut satırı gerekmez):**

1. Düzeltmek istediğiniz sayfanın en altındaki **"Bu sayfayı düzenle"**
   bağlantısına tıklayın.
2. GitHub, deponun size ait bir kopyasını (fork) oluşturmayı önerir; kabul edin.
3. Değişikliğinizi yapın, altta ne değiştirdiğinizi kısaca yazın ve
   **"Propose changes"** düğmesine basın.
4. Açılan sayfada **"Create pull request"** ile isteği gönderin.

Her pull request'te site otomatik olarak derlenir; derleme başarısız olursa
GitHub bunu isteğin altında gösterir.

**Hata bildirmek için** deponun **Issues** sekmesinden yeni bir kayıt açın.

## Yazım ilkeleri

- **Türkçe ve sade yazın.** Teknik terimlerin ilk geçtiği yerde kısa bir
  açıklama ekleyin; yaygın İngilizce terimleri parantez içinde verin
  (ör. "çapraz derleme (cross-compiling)").
- **Her komutu açıklayın.** Bir komutun ne yaptığını ve çıktısında neye bakmak
  gerektiğini yazın. Okuyucularımızın bir kısmı terminal kullanmaya yeni
  başlıyor.
- **Neyi, nerede denediğinizi belirtin.** Cihaz modeli, HarmonyOS sürümü ve
  tarih.
- **Doğrulamadığınız bilgiyi kesinmiş gibi yazmayın.** Emin değilseniz bunu
  açıkça belirtin.
- **Gizli bilgi paylaşmayın.** Komut çıktılarında parola, anahtar veya kişisel
  bilgi olmadığından emin olun.
