import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingLayout from '../OnboardingLayout';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
    ArrowLeft: ({ onClick, className }: { onClick: () => void; className: string }) => (
        <div data-testid="arrow-left" onClick={onClick} className={className}>
            ←
        </div>
    ),
    MessageCircle: ({ className }: { className: string }) => (
        <div data-testid="message-circle" className={className}>
            💬
        </div>
    ),
}));

describe('OnboardingLayout', () => {
    const defaultProps = {
        children: <div>Test content</div>,
        onBack: jest.fn(),
        progress: 50,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders children correctly', () => {
        render(<OnboardingLayout {...defaultProps} />);
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders Choiz title', () => {
        render(<OnboardingLayout {...defaultProps} />);
        expect(screen.getByText('Choiz')).toBeInTheDocument();
    });

    it('calls onBack when arrow is clicked', () => {
        const mockOnBack = jest.fn();
        render(<OnboardingLayout {...defaultProps} onBack={mockOnBack} />);

        const backButton = screen.getByTestId('arrow-left');
        fireEvent.click(backButton);

        expect(mockOnBack).toHaveBeenCalled();
    });

    it('displays correct progress bar', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} progress={75} />);

        // Find the progress bar by its specific classes
        const progressBar = container.querySelector('.bg-\\[\\#6042aa\\]');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle('width: 75%');
    });

    it('shows chat icon by default', () => {
        render(<OnboardingLayout {...defaultProps} />);
        expect(screen.getByTestId('message-circle')).toBeInTheDocument();
    });

    it('hides chat icon when showChat is false', () => {
        render(<OnboardingLayout {...defaultProps} showChat={false} />);
        expect(screen.queryByTestId('message-circle')).not.toBeInTheDocument();
    });

    it('handles progress bounds correctly', () => {
        // Test with progress over 100
        const { rerender, container } = render(<OnboardingLayout {...defaultProps} progress={150} />);
        let progressBar = container.querySelector('.bg-\\[\\#6042aa\\]');
        expect(progressBar).toHaveStyle('width: 100%');

        // Test with negative progress
        rerender(<OnboardingLayout {...defaultProps} progress={-10} />);
        progressBar = container.querySelector('.bg-\\[\\#6042aa\\]');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    test('renders OnboardingLayout component', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} />);

        // Verify main structure exists
        expect(container.firstChild).toHaveClass('min-h-screen', 'bg-[#f8f8f8]', 'flex', 'flex-col');

        // Verify header section
        const header = container.querySelector('.bg-white.px-4.py-4');
        expect(header).toBeInTheDocument();

        // Verify progress bar container
        const progressContainer = container.querySelector('.bg-white.px-4.pb-2');
        expect(progressContainer).toBeInTheDocument();

        // Verify main content area
        const mainContent = container.querySelector('.flex-1.px-6.py-4');
        expect(mainContent).toBeInTheDocument();
        expect(mainContent).toContainElement(screen.getByText('Test content'));
    });

    it('renders with zero progress', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} progress={0} />);
        const progressBar = container.querySelector('.bg-\\[\\#6042aa\\]');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    it('renders with 100% progress', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} progress={100} />);
        const progressBar = container.querySelector('.bg-\\[\\#6042aa\\]');
        expect(progressBar).toHaveStyle('width: 100%');
    });

    it('renders spacer div when showChat is false', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} showChat={false} />);

        // Should render a spacer div with w-6 h-6 classes
        const spacer = container.querySelector('div.w-6.h-6:not([data-testid])');
        expect(spacer).toBeInTheDocument();
    });

    it('applies correct CSS classes to elements', () => {
        const { container } = render(<OnboardingLayout {...defaultProps} />);

        // Check back arrow classes
        const backArrow = screen.getByTestId('arrow-left');
        expect(backArrow).toHaveClass('w-6', 'h-6', 'text-[#3b3345]', 'cursor-pointer');

        // Check title classes
        const title = screen.getByText('Choiz');
        expect(title).toHaveClass('text-xl', 'logo-font', 'font-light', 'text-[#3b3345]');

        // Check chat icon classes
        const chatIcon = screen.getByTestId('message-circle');
        expect(chatIcon).toHaveClass('w-6', 'h-6', 'text-[#3b3345]');
    });

    it('handles complex children content', () => {
        const complexChildren = (
            <div>
                <h2>Complex Content</h2>
                <p>Paragraph content</p>
                <button>Click me</button>
            </div>
        );

        render(<OnboardingLayout {...defaultProps} children={complexChildren} />);

        expect(screen.getByText('Complex Content')).toBeInTheDocument();
        expect(screen.getByText('Paragraph content')).toBeInTheDocument();
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
});

require('@testing-library/jest-dom');

// Define defaultProps for standalone test
const defaultProps = {
    children: <div>Test content</div>,
    onBack: jest.fn(),
    progress: 50,
};

test('renders OnboardingLayout component', () => {
    const { container } = render(<OnboardingLayout {...defaultProps} />);

    // Verify main structure exists
    expect(container.firstChild).toHaveClass('min-h-screen', 'bg-[#f8f8f8]', 'flex', 'flex-col');

    // Verify header section
    const header = container.querySelector('.bg-white.px-4.py-4');
    expect(header).toBeInTheDocument();

    // Verify progress bar container
    const progressContainer = container.querySelector('.bg-white.px-4.pb-2');
    expect(progressContainer).toBeInTheDocument();

    // Verify main content area
    const mainContent = container.querySelector('.flex-1.px-6.py-4');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toContainElement(screen.getByText('Test content'));
});

const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

module.exports = createJestConfig(customJestConfig)