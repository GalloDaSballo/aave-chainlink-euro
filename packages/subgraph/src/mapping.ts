import { NewPost } from '../generated/Post/Poster'
import { Post } from '../generated/schema'

export function handlePost(event: NewPost): void {
  const post = new Post(event.transaction.hash.toHexString())
  post.block = event.block.number
  post.author = event.params.author.toHex()
  post.title = event.params.title
  post.content = event.params.content
  post.imageHash = event.params.imageHash
  post.save()
}
