import { useEffect, useState } from "react";
import cookie from "cookie-cutter";

const useHasPublishedToIPFS = (): [string | null, (v: string) => void] => {
  const [published, setPublished] = useState<string | null>(null);

  const updatedPublished = (newValue: string) => {
    cookie.set("published", JSON.stringify(newValue));
    setPublished(newValue);
  };

  useEffect(() => {
    const publishedFromCookie = cookie.get("published");
    setPublished(publishedFromCookie ? JSON.parse(publishedFromCookie) : null);
  }, []);

  return [published, updatedPublished];
};

export default useHasPublishedToIPFS;
