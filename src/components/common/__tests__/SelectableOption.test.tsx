import { render, screen, fireEvent } from '@testing-library/react';
import SelectableOption from '../SelectableOption';

describe('SelectableOption', () => {
  const defaultProps = {
    id: 'test-option',
    label: 'Test Option',
    isSelected: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label correctly', () => {
    render(<SelectableOption {...defaultProps} />);
    expect(screen.getByText('Test Option')).toBeInTheDocument();
  });

  it('calls onClick with correct id when clicked', () => {
    const mockOnClick = jest.fn();
    render(<SelectableOption {...defaultProps} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('Test Option'));
    expect(mockOnClick).toHaveBeenCalledWith('test-option');
  });

  it('applies selected styles when isSelected is true', () => {
    render(<SelectableOption {...defaultProps} isSelected={true} />);
    const option = screen.getByText('Test Option').closest('div');
    expect(option).toHaveClass('border-[#6042aa]');
  });

  it('applies none option styles when isNoneOption and selected', () => {
    render(
      <SelectableOption 
        {...defaultProps} 
        isSelected={true} 
        isNoneOption={true} 
      />
    );
    const option = screen.getByText('Test Option').closest('div');
    expect(option).toHaveClass('border-[#3b3345]');
  });
});