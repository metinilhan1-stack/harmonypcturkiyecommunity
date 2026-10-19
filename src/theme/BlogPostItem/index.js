// Blog yazısını olduğu gibi gösterir; yalnızca yazının kendi sayfasında
// (liste sayfalarında değil) altına yorum alanını ekler.
import BlogPostItem from '@theme-original/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Comments from '@site/src/components/Comments';

export default function BlogPostItemWrapper(props) {
  const {metadata, isBlogPostPage} = useBlogPost();
  // Yazının adres adı: ön bilgideki `slug`, yoksa adresin son parçası.
  const slug = metadata.frontMatter.slug ?? metadata.permalink.split('/').pop();

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && <Comments term={`blog/${slug}`} />}
    </>
  );
}
