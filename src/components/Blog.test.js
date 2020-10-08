import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('initially renders simple content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testblog.com',
    user: {
      username: 'mleino',
      name: 'Mauri Leino'
    },
    likes: 5
  }

  const loggedInUser = {
    username: 'mleino',
    name: 'Mauri Leino',
    token: 'bearer nottherealtoken'
  }

  const component = render(
    <Blog blog={blog} loggedInUser={loggedInUser} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  expect(component.queryByText('www.testblog.com')).toBeNull()

  expect(component.queryByText('Mauri Leino')).toBeNull()
})

test('renders full content after clicking show more -button', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testblog.com',
    user: {
      username: 'mleino',
      name: 'Mauri Leino'
    },
    likes: 5
  }

  const loggedInUser = {
    username: 'mleino',
    name: 'Mauri Leino',
    token: 'bearer nottherealtoken'
  }

  const component = render(
    <Blog blog={blog} loggedInUser={loggedInUser} />
  )

  const button = component.getByText('show more')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  expect(component.queryByText('www.testblog.com')).toBeDefined()

  expect(component.queryByText('Mauri Leino')).toBeDefined()
})

test('clicking the like-button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testblog.com',
    user: {
      username: 'mleino',
      name: 'Mauri Leino'
    },
    likes: 5
  }

  const loggedInUser = {
    username: 'mleino',
    name: 'Mauri Leino',
    token: 'bearer nottherealtoken'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loggedInUser={loggedInUser} handleLikeButton={mockHandler} />
  )

  const showMoreButton = component.getByText('show more')
  fireEvent.click(showMoreButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
