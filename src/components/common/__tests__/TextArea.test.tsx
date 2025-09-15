import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByPlaceholderText('Inserta tu respuesta aquí')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<TextArea {...defaultProps} placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays title when provided', () => {
    render(<TextArea {...defaultProps} title="Question Title" />);
    expect(screen.getByText('Question Title')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', () => {
    const mockOnChange = jest.fn();
    render(<TextArea {...defaultProps} onChange={mockOnChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('New text');
  });

  it('displays current value', () => {
    render(<TextArea {...defaultProps} value="Current text" />);
    expect(screen.getByDisplayValue('Current text')).toBeInTheDocument();
  });

  it('sets correct number of rows', () => {
    render(<TextArea {...defaultProps} rows={6} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '6');
  });
});