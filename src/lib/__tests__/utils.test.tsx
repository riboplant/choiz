import { cn } from '../utils';

describe('utils', () => {
    describe('cn function', () => {
        it('combines class names correctly', () => {
            const result = cn('class1', 'class2', 'class3');
            expect(result).toContain('class1');
            expect(result).toContain('class2');
            expect(result).toContain('class3');
        });

        it('handles conditional classes', () => {
            const isActive = true;
            const result = cn('base', isActive && 'active', !isActive && 'inactive');
            expect(result).toContain('base');
            expect(result).toContain('active');
            expect(result).not.toContain('inactive');
        });

        it('handles empty and falsy values', () => {
            const result = cn('valid', '', null, undefined, false, 'another-valid');
            expect(result).toContain('valid');
            expect(result).toContain('another-valid');
        });
    });
});