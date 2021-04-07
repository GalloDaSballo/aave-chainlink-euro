import Link from "next/link";
import SinglePost from "../../../components/Preview/SinglePost";
import usePosts from "../../../hooks/usePosts";
import styles from "../../../styles/Preview.module.scss";

const PreviewPage: React.FC = () => {
  const posts = usePosts();
  return (
    <div>
      <h2>Preview a blog</h2>
      <p>This page shows the last 100 posts from all authors</p>
      <div className={styles.blogPreview}>
        {posts.map((post) => (
          <Link href={`/app/preview/${post.id}`}>
            <a>
              <SinglePost post={post} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
