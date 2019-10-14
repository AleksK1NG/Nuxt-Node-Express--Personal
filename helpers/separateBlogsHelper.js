export function separateBlogs(blogs) {
  const published = []
  const drafts = []

  blogs.forEach((blog) => (blog.status === 'active' ? drafts.push(blog) : published.push(blog)))

  return { published, drafts }
}
