// Rehber sayfalarının altındaki alt bilgiyi (düzenleme bağlantısı vb.) olduğu
// gibi bırakır ve altına "Bu sayfa hakkında soru sor" kutusunu ekler.
import Footer from '@theme-original/DocItem/Footer';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useDiscussions} from '@site/src/lib/discussions';
import styles from './styles.module.css';

export default function FooterWrapper(props) {
  const {metadata} = useDoc();
  const {newQuestionUrl} = useDiscussions();

  return (
    <>
      <Footer {...props} />
      <aside className={styles.ask}>
        <span>Bu sayfayla ilgili bir sorunuz mu var?</span>
        <Link className="button button--outline button--primary" href={newQuestionUrl(`[${metadata.title}] `)}>
          Bu sayfa hakkında soru sor
        </Link>
      </aside>
    </>
  );
}
