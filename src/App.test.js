import { render, screen } from '@testing-library/react';
// import { render, screen } from 'jest';
import App from './App';

 
describe('app component', () => {

  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/blog/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/blog/i);
    expect(linkElement).toBeInTheDocument();
  });

})

