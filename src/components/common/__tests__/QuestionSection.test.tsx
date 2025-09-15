import { render, screen } from '@testing-library/react';
import QuestionSection from '../QuestionSection';

describe('QuestionSection', () => {
  it('renders title correctly', () => {
    render(
      <QuestionSection title="Test Question">
        <div>Test content</div>
      </QuestionSection>
    );
    
    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <QuestionSection title="Test Question" subtitle="Test subtitle">
        <div>Test content</div>
      </QuestionSection>
    );
    
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(
      <QuestionSection title="Test Question">
        <div>Test content</div>
      </QuestionSection>
    );
    
    expect(screen.queryByText('Test subtitle')).not.toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <QuestionSection title="Test Question">
        <div>Child content</div>
      </QuestionSection>
    );
    
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});