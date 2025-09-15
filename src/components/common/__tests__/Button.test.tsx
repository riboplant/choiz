import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders button with children', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<Button disabled>Disabled Button</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Styled Button</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('custom-class');
    });

    it('applies choiz variant correctly', () => {
        render(<Button variant="choiz">Choiz Button</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('bg-[#3b3345]');
    });

    it('applies choiz-disabled variant when disabled with choiz variant', () => {
        render(<Button variant="choiz" disabled>Disabled Choiz Button</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('bg-[#e0e0e0]');
    });

    it('applies different sizes correctly', () => {
        render(<Button size="xl">Large Button</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('h-14');
    });

    it('works as child component when asChild is true', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/test');
    });
});

const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)