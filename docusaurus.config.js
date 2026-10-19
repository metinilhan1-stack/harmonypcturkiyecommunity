// @ts-check
// Site ayarları. Ayrıntılar: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// GitHub hesabı (kullanıcı ya da organizasyon) ve depo adı.
// Depo adı `<hesap>.github.io` ise site https://<hesap>.github.io/ adresinde,
// başka bir adsa https://<hesap>.github.io/<depo>/ adresinde yayınlanır.
const GITHUB_ACCOUNT = 'metinilhan1-stack';
const GITHUB_REPO = 'harmonypcturkiyecommunity';

const isRootSite = GITHUB_REPO === `${GITHUB_ACCOUNT}.github.io`;
const repoUrl = `https://github.com/${GITHUB_ACCOUNT}/${GITHUB_REPO}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HarmonyPC Türkiye',
  tagline: 'HarmonyOS PC için Türkçe topluluk — kullanıcılar ve geliştiriciler için rehberler',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: `https://${GITHUB_ACCOUNT}.github.io`,
  baseUrl: isRootSite ? '/' : `/${GITHUB_REPO}/`,
  trailingSlash: false,

  organizationName: GITHUB_ACCOUNT,
  projectName: GITHUB_REPO,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Her sayfanın altındaki "Bu sayfayı düzenle" bağlantısı
          editUrl: `${repoUrl}/edit/main/`,
        },
        blog: {
          blogTitle: 'Duyurular',
          blogDescription: 'HarmonyPC Türkiye topluluğundan haberler ve duyurular',
          showReadingTime: true,
          editUrl: `${repoUrl}/edit/main/`,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'gayri-resmi',
        content:
          'Bu site gönüllüler tarafından yürütülen <b>gayriresmî</b> bir topluluk sitesidir; Huawei ile bağlantılı değildir.',
        isCloseable: true,
      },
      navbar: {
        title: 'HarmonyPC Türkiye',
        logo: {
          alt: 'HarmonyPC Türkiye logosu',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'rehberSidebar',
            position: 'left',
            label: 'Rehberler',
          },
          {to: '/docs/tasinan-uygulamalar', label: 'Taşınan Uygulamalar', position: 'left'},
          {to: '/blog', label: 'Duyurular', position: 'left'},
          {to: '/docs/topluluk/katki', label: 'Katkı Ver', position: 'right'},
          {href: repoUrl, label: 'GitHub', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Rehberler',
            items: [
              {label: 'HarmonyOS PC nedir?', to: '/docs/intro'},
              {label: 'Uygulama yükleme', to: '/docs/kullanicilar/uygulama-yukleme'},
              {label: 'Geliştirme ortamı', to: '/docs/gelistiriciler/ortam-kurulumu'},
            ],
          },
          {
            title: 'Topluluk',
            items: [
              {label: 'Topluluk kuralları', to: '/docs/topluluk/kurallar'},
              {label: 'Nasıl katkı verilir?', to: '/docs/topluluk/katki'},
              {label: 'Gizlilik', to: '/docs/topluluk/gizlilik'},
              {label: 'GitHub', href: repoUrl},
            ],
          },
          {
            title: 'Resmî kaynaklar',
            items: [
              {label: 'HarmonyOS geliştirici sitesi', href: 'https://developer.huawei.com/consumer/en/harmonyos/'},
              {label: 'OpenHarmony', href: 'https://www.openharmony.cn/'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} HarmonyPC Türkiye topluluğu. Gayriresmî topluluk sitesidir. HarmonyOS, Huawei Technologies Co., Ltd.'nin ticari markasıdır.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
    }),
};

export default config;
