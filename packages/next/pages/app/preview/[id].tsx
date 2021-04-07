import { useRouter } from "next/dist/client/router";
import usePost from "../../../hooks/usePost";
import SinglePostPage from "../../../components/Preview/SinglePostPage";
import styles from "../../../styles/Preview.module.scss";

const SinglePostPreviewPage: React.FC = () => {
  const router = useRouter();
  const post = usePost(router.query.id as string);

  if (!post) {
    return (
      <div className={styles.blogPreview}>
        <h3>Not found</h3>
      </div>
    );
  }
  return (
    <div className={styles.blogPreview}>
      <SinglePostPage post={post} />
    </div>
  );
};

export default SinglePostPreviewPage;
