import Head from "next/head";
import Publish from "../../components/Publish";

const WriteNewPostPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Publish a new entry</title>
      </Head>
      <Publish />
    </div>
  );
};

export default WriteNewPostPage;
