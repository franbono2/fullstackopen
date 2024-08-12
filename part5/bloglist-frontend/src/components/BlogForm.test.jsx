/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm tests <BlogForm />', () => {
let addBlog
  beforeEach(() => {
    addBlog = jest.fn()
    render(<BlogForm addBlog={addBlog} />)
  })

  test('Create new blog', async () => {
    const user = userEvent.setup()
    const title = screen.getByRole('textbox', {name: 'title'})
    const author = screen.getByRole('textbox', {name: 'author'})
    const url = screen.getByRole('textbox', {name: 'url'})
    const create = screen.getByText('create')

    await user.type(title, 'Jest blog')
    await user.type(author, 'Jest')
    await user.type(url, '0.0.0.0')
    await user.click(create)

    expect(addBlog).toHaveBeenCalledTimes(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Jest blog')
    expect(addBlog.mock.calls[0][0].author).toBe('Jest')
    expect(addBlog.mock.calls[0][0].url).toBe('0.0.0.0')
  })
})