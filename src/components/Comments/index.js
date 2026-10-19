// giscus ile GitHub Discussions tabanlı yorum alanı.
// Her blog yazısı, Discussions'ta kendi başlığına (thread) bağlanır.
import BrowserOnly from '@docusaurus/BrowserOnly';
import Heading from '@theme/Heading';
import {useColorMode} from '@docusaurus/theme-common';
import {useDiscussions} from '@site/src/lib/discussions';
import styles from './styles.module.css';

function GiscusFrame({term}) {
  // giscus tarayıcıya özgü API'ler kullanır; sunucu tarafı derlemede yüklenmemeli.
  const Giscus = require('@giscus/react').default;
  const {colorMode} = useColorMode();
  const {giscus} = useDiscussions();

  return (
    <Giscus
      repo={giscus.repo}
      repoId={giscus.repoId}
      category={giscus.category}
      categoryId={giscus.categoryId}
      // Yazının adres adını (slug) anahtar olarak kullanırız: site başka bir
      // adrese taşınsa da yorumlar doğru yazıya bağlı kalır.
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      lang="tr"
      loading="lazy"
    />
  );
}

export default function Comments({term}) {
  const {giscus} = useDiscussions();

  // Kategori kimliği ayarlanmadıysa yorum alanını hiç göstermeyiz.
  if (!giscus.repoId || !giscus.categoryId) {
    return null;
  }

  return (
    <section className={styles.comments}>
      <Heading as="h2">Yorumlar</Heading>
      <BrowserOnly fallback={<p>Yorumlar yükleniyor…</p>}>
        {() => <GiscusFrame term={term} />}
      </BrowserOnly>
    </section>
  );
}
