import { Post } from "../../../types";
import fromImageHashToUrl from "../../../utils/fromImageHashToUrl";
import styles from "./SinglePost.module.scss";

const SinglePost: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={styles.post}>
      {post.imageHash && (
        <img alt={post.title} src={fromImageHashToUrl(post.imageHash)} />
      )}
      <h2>{post.title}</h2>
    </div>
  );
};

export default SinglePost;
