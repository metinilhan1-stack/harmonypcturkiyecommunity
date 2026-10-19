// Blog yazısını olduğu gibi gösterir; yalnızca yazının kendi sayfasında
// (liste sayfalarında değil) altına yorum alanını ekler.
import BlogPostItem from '@theme-original/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Comments from '@site/src/components/Comments';

export default function BlogPostItemWrapper(props) {
  const {metadata, isBlogPostPage} = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && <Comments term={`blog/${metadata.slug}`} />}
    </>
  );
}
