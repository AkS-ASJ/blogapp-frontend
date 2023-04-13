import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test('renders content', () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 24,
        user: {
            username: "chris",
            name: "Chris Paul",
            id: "63fd3bb927973097541ac4e6"
        },
        id: "64044a29d99fae9f4c50c186"
    }

    const { container } =  render(<Blog blog={blog} />)

    const p = container.querySelector('.full')
    const d = container.querySelector('.preview')
    expect(p).toHaveStyle('display: none')
    expect(d).not.toHaveStyle('display: none')
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 24,
        user: {
            username: "chris",
            name: "Chris Paul",
            id: "63fd3bb927973097541ac4e6"
        },
        id: "64044a29d99fae9f4c50c186"
    }

    const { container } = render( <Blog blog={blog} /> )

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.full')
    expect(div).not.toHaveStyle('display: none')
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const input = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('Create')

    await user.type(input[0], 'Ideal book for learning')
    await user.type(input[1], 'Silver Stone')
    await user.type(input[2], 'www.test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Ideal book for learning')
    expect(createBlog.mock.calls[0][0].author).toBe('Silver Stone')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})