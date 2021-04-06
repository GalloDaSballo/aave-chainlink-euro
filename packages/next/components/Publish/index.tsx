import { FormEvent, useState } from "react";
import { useUser } from "../../context/UserContext";
import publishNewPost from "../../utils/publishNewPost";
import fromTxToExplorerUrl from "../../utils/fromTxToExplorerUrl";

const Publish: React.FC = () => {
  const user = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create new entry, with loading and error handling
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const txHash = await publishNewPost(
        user?.provider.getSigner(),
        title,
        content,
        image
      );
      setSuccess(txHash);
    } catch (err) {
      setError(err.message || err.toString());
    }
    setLoading(false);
  };
  return (
    <div>
      <h2>Publish a new Entry</h2>
      {loading && <p>Loading!</p>}
      {error && <p>Error: {error}</p>}
      {success && (
        <p>
          Success!{" "}
          <a
            target="_blank"
            rel="nofollow noreferrer"
            href={fromTxToExplorerUrl(success)}
          >
            View TX
          </a>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </label>

        <label htmlFor="Content">
          Content
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </label>

        <label htmlFor="Image">
          Image (Public or IPFS URI)
          <div>
            <input value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </label>

        <button type="submit" disabled={loading}>
          Publish!
        </button>
      </form>
    </div>
  );
};

export default Publish;
