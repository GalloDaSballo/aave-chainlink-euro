import { Post } from "../../../types";
import fromImageHashToUrl from "../../../utils/fromImageHashToUrl";
import styles from "./SinglePostPage.module.scss";

const SinglePostPage: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={styles.post}>
      {post.imageHash && (
        <img alt={post.title} src={fromImageHashToUrl(post.imageHash)} />
      )}
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default SinglePostPage;
