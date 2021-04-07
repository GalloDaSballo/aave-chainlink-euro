import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { SUBGRAPH_URL } from "./constants";

export const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

/**
 * Load the first 100 posts
 * Adding replyTo loads the first 100 replies
 * @param replyTo
 * @returns
 */
export const GET_FIRST_100_POSTS_QUERY = gql`
  query posts {
    posts(orderBy: block, orderDirection: desc) {
      id
      block
      author
      title
      content
      imageHash
    }
  }
`;

/**
 * Given a postId load the post
 */
export const GET_POST_QUERY = gql`
  query posts($postId: String!) {
    posts(orderBy: block, orderDirection: desc, where: { id: $postId }) {
      id
      block
      author
      title
      content
      imageHash
    }
  }
`;
