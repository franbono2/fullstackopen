import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog shows author and title', () => {
  const blog = {
    title: "Test Blog",
    author: "Vitest",
    url: "0.0.0.0",
    likes: 0,
    user: {
      username: "Paco",
      name: "Paco Gonzalez"
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title}`)
  expect(div).toHaveTextContent(`${blog.author}`)

  const hiddenDiv = container.querySelector('.startHidden')
  expect(hiddenDiv).toHaveStyle('display: none')
})