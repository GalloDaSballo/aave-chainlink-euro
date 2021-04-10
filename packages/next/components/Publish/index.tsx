import { FormEvent, useState } from "react";
import { useUser } from "../../context/UserContext";
import publishNewPost from "../../utils/publishNewPost";
import fromTxToExplorerUrl from "../../utils/fromTxToExplorerUrl";
import styles from "../../styles/Publish.module.scss";

const Publish: React.FC = () => {
  const user = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (e: any) => {
    e.stopPropagation();

    if (!imageFile) {
      console.log("No file");
      return;
    }
    setLoadingImage(true);

    const data = new FormData();
    data.append("file", imageFile);
    const metadata = JSON.stringify({
      name: imageFile.name,
    });
    data.append("pinataMetadata", metadata);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
      },
      body: data,
    });
    console.log("res", res);
    const response = await res.json();
    setImage(response.IpfsHash);
    setLoadingImage(false);
  };

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
    <div className={styles.container}>
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

        <label htmlFor="ImageFile">
          Or Upload an Image{" "}
          {imageFile && (
            <button type="button" onClick={uploadFile}>
              {loadingImage ? "Uploading" : "Upload Image"}
            </button>
          )}
          <div>
            <input
              type="file"
              onChange={(e) =>
                setImageFile(e.target.files && e.target.files[0])
              }
            />
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
