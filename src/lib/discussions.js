import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// GitHub Discussions bağlantılarını tek yerden üretir.
// Ayarlar docusaurus.config.js içindeki `customFields.discussions` alanındadır.
export function useDiscussions() {
  const {siteConfig} = useDocusaurusContext();
  const {url, qaCategorySlug, giscus} = siteConfig.customFields.discussions;

  // Soru-Cevap kategorisinde yeni bir soru sayfası açar.
  // `title` verilirse sorunun başlığı önceden doldurulur.
  function newQuestionUrl(title) {
    const params = new URLSearchParams({category: qaCategorySlug});
    if (title) {
      params.set('title', title);
    }
    return `${url}/new?${params.toString()}`;
  }

  return {
    allUrl: url,
    questionsUrl: `${url}/categories/${qaCategorySlug}`,
    newQuestionUrl,
    giscus,
  };
}
