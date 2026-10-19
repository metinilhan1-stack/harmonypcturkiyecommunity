# HarmonyPC Türkiye

HarmonyOS PC için gayriresmî Türkçe topluluk sitesi. [Docusaurus](https://docusaurus.io/) ile oluşturulmuştur.

**Site:** https://metinilhan1-stack.github.io/harmonypcturkiyecommunity/

`main` dalına yapılan her push, GitHub Actions ile siteyi otomatik olarak yeniden yayınlar.

## Yerelde çalıştırma

İlk seferde bağımlılıkları kurun:

```bash
npm install
```

Geliştirme sunucusunu başlatın (değişiklikler tarayıcıda anında görünür):

```bash
npm start
```

Site `http://localhost:3000/harmonypcturkiyecommunity/` adresinde açılır.

## Yayına hazır derleme

```bash
npm run build
```

Statik site `build/` klasörüne üretilir. Bu klasör GitHub Pages, GitCode Pages veya herhangi bir statik barındırma hizmetine yüklenebilir.

## İçerik nerede?

| Klasör | İçerik |
| --- | --- |
| `docs/` | Rehberler (her `.md` dosyası bir sayfa) |
| `blog/` | Duyurular |
| `src/pages/index.js` | Ana sayfa |
| `docusaurus.config.js` | Site başlığı, menü, alt bilgi |
