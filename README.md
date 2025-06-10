# Reddit Client Clone

A simple Reddit browser built with React and Redux. Users can view posts from Reddit, search through them, filter, and view post details including comments. Built as part of a project to demonstrate full React/Redux workflow and testing.

## Features

- View a feed of Reddit posts
- View detailed post content including images and text
- Load and expand/collapse comments per post
- Search posts by subreddit
- Responsive UI layout for desktop and mobile
- Error states when posts or comments fail to load
- Navigation between list and detail view using React Router
- Loading animations to enhance UI polish
- Design consistency using a basic design system (e.g., shared colors, card layouts)
- Retry button when posts or comments fail to load
- Unit tests for components like `PostCard` and `Comment`
- End-to-end test: load feed → click a post → view details → expand comment → go back → search new posts

## Wireframes

![alt text](image.png)

---

## Technologies Used

- React
- Redux Toolkit
- React Router
- JavaScript (ES6+)
- CSS (custom, with responsive layout)
- Redux DevTools
- Jest (planned for unit testing)
- Git + GitHub

---

## Responsive Design

This app is mobile-friendly and works well on modern desktop and mobile browsers. Responsive layouts are handled with CSS Flexbox and media queries.

---

## Testing

- Unit tests with **Jest** and **React Testing Library**
- End-to-end tests with **Cypress**

---

## Future Work

- [ ] Deploy live to Netlify or Vercel

---

## Project Management

This project was planned using **GitHub Projects**. Tasks were broken down by feature and tracked using issues and boards for visual progress.

---

## Deployment

📍 *To be added once hosted.*  
You’ll be able to view the live project at: `https://your-deployment-url.com`

---

## Learnings

This project reinforced concepts like:

- Managing async state with Redux Toolkit and thunks
- Handling UI edge cases like loading, empty states, and errors
- Building reusable React components
- Fetching and parsing JSON from Reddit’s API
- Dynamically rendering different content types (text, image, etc.)

---

## Credits

This project uses data from the [Reddit JSON API](https://www.reddit.com/dev/api/).

---
