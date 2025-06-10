import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';

describe('Comment component', () => {
  const baseProps = {
    author: 'commenter1',
    body: 'Nice post!',
    ups: 5,
    isExpanded: false,
    onToggle: jest.fn(),
  };

  test('renders comment author, body, and ups correctly', () => {
    render(<Comment {...baseProps} />);

    expect(screen.getByText(/commenter1/i)).toBeInTheDocument();
    expect(screen.getByText(/⬆ 5/i)).toBeInTheDocument();
    expect(screen.getByText('Nice post!')).toBeInTheDocument();
  });

  test('shows truncated text and "Show more" if comment is long', () => {
    const longBody = 'a'.repeat(150);
    render(<Comment {...baseProps} body={longBody} />);

    expect(screen.getByText(/a{100}\.\.\./i)).toBeInTheDocument();
    expect(screen.getByText(/show more/i)).toBeInTheDocument();
  });

  test('shows full comment when expanded and "Show less" button', () => {
    const longBody = 'a'.repeat(150);
    render(<Comment {...baseProps} body={longBody} isExpanded={true} />);

    expect(screen.getByText(longBody)).toBeInTheDocument();
    expect(screen.getByText(/show less/i)).toBeInTheDocument();
  });

  test('calls onToggle when toggle button is clicked', () => {
    const longBody = 'a'.repeat(150);
    const onToggle = jest.fn();
    render(<Comment {...baseProps} body={longBody} onToggle={onToggle} />);

    fireEvent.click(screen.getByText(/show more/i));
    expect(onToggle).toHaveBeenCalled();
  });
});
