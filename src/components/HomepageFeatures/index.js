import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Kullanıcılar için',
    to: '/docs/kullanicilar/uygulama-yukleme',
    linkLabel: 'Uygulama yükleme rehberi',
    description: (
      <>
        HarmonyOS PC'ye uygulama yükleme, AppGallery dışından HAP kurma ve sık
        karşılaşılan sorunların Türkçe çözümleri.
      </>
    ),
  },
  {
    title: 'Geliştiriciler için',
    to: '/docs/gelistiriciler/ortam-kurulumu',
    linkLabel: 'Geliştirme ortamını kurun',
    description: (
      <>
        Geliştirme ortamı, imzalama ve masaüstü (PC) uygulamalarını HarmonyOS
        PC'ye taşıma üzerine pratik notlar.
      </>
    ),
  },
  {
    title: 'Topluluk',
    to: '/docs/topluluk/katki',
    linkLabel: 'Nasıl katkı verilir?',
    description: (
      <>
        Rehber yazın, hata bildirin, taşıdığınız uygulamayı paylaşın. Bu site
        topluluğun katkılarıyla büyür.
      </>
    ),
  },
];

function Feature({title, to, linkLabel, description}) {
  return (
    <div className={clsx('col col--4', styles.column)}>
      <div className={styles.card}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={to}>{linkLabel} →</Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
