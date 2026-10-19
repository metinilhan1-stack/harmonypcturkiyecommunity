import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useDiscussions} from '@site/src/lib/discussions';
import styles from './soru-cevap.module.css';

const steps = [
  {
    title: 'Önce arayın',
    body: (
      <>
        Sorunuz daha önce sorulmuş olabilir. <Link to="/docs/kullanicilar/sss">Sık sorulan
        sorulara</Link> ve mevcut sorulara göz atın.
      </>
    ),
  },
  {
    title: 'Ayrıntı verin',
    body: (
      <>
        Cihaz modeli, HarmonyOS sürümü, ne yapmaya çalıştığınız ve hata mesajının
        <b> tam metni</b>. Ne kadar ayrıntı, o kadar hızlı cevap.
      </>
    ),
  },
  {
    title: 'Cevabı işaretleyin',
    body: (
      <>
        İşinize yarayan cevabı <b>"Mark as answer"</b> ile işaretleyin. Aynı sorunu
        yaşayan bir sonraki kişi doğru cevabı hemen görür.
      </>
    ),
  },
];

export default function SoruCevap() {
  const {questionsUrl, newQuestionUrl} = useDiscussions();

  return (
    <Layout
      title="Soru-Cevap"
      description="HarmonyOS PC ile ilgili sorularınızı Türkçe sorun, topluluk cevaplasın.">
      <header className={styles.header}>
        <div className="container">
          <Heading as="h1">Soru-Cevap</Heading>
          <p className={styles.lead}>
            HarmonyOS PC ile ilgili sorularınızı Türkçe sorun; topluluk cevaplasın.
            Kullanım, uygulama yükleme, geliştirme, imzalama, taşıma… her konu
            olur.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" href={newQuestionUrl()}>
              Yeni soru sor
            </Link>
            <Link className="button button--secondary button--lg" href={questionsUrl}>
              Tüm soruları gör
            </Link>
          </div>
          <p className={styles.note}>
            Sorular <b>GitHub Discussions</b> üzerinde tutulur. Okumak için hesap
            gerekmez; soru sormak ve cevaplamak için ücretsiz bir GitHub hesabı
            yeterlidir.
          </p>
        </div>
      </header>

      <main className="container margin-vert--lg">
        <Heading as="h2">İyi bir soru nasıl sorulur?</Heading>
        <div className="row">
          {steps.map((step, idx) => (
            <div key={idx} className={clsx('col col--4', styles.column)}>
              <div className={styles.card}>
                <span className={styles.number}>{idx + 1}</span>
                <Heading as="h3">{step.title}</Heading>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={clsx('alert alert--danger', styles.alert)} role="note">
          <b>Gizli bilgi paylaşmayın.</b> Soru-Cevap bölümündeki her şey herkese
          açıktır. Parola, imza anahtarı (<code>.p12</code>), API anahtarı veya kişisel
          bilgi paylaşmayın.
        </div>

        <p>
          Lütfen soru sormadan önce <Link to="/docs/topluluk/kurallar">topluluk
          kurallarını</Link> okuyun. Her rehber sayfasının altındaki <b>"Bu sayfa
          hakkında soru sor"</b> bağlantısıyla da o sayfaya özel soru açabilirsiniz.
        </p>
      </main>
    </Layout>
  );
}
