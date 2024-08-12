/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: "Test Blog",
  author: "Vitest",
  url: "0.0.0.0",
  likes: 0,
  user: {
    username: "Paco",
    name: "Paco Gonzalez"
}}

describe('Blogs tests <Blog />', () => {
  let container
  let updateLikes
  let deleteBlog

  beforeEach(() => {
    updateLikes = jest.fn()
    deleteBlog = jest.fn()
    container = render(<Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />).container
  })

  test('blog shows author and title at start', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title}`)
    expect(div).toHaveTextContent(`${blog.author}`)
  
    const hiddenDiv = container.querySelector('.startHidden')
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const hiddenDiv = container.querySelector('.startHidden')
    expect(hiddenDiv).not.toHaveStyle('display: none')
  })

  test('after clicking like button twice, 2 calls are made', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.dblClick(button)

    expect(updateLikes).toHaveBeenCalledTimes(2)
  })
})
