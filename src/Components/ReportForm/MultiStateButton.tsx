import type { Color } from '@mui/material'
import Button from '@mui/material/Button';

interface MultiStateButtonProps {
  currentState: {
    text: string;
    color: Color;
    key: string;
  };
  handleClick: () => unknown;
}

export default function MultiStateButton({
  currentState,
  handleClick,
}: MultiStateButtonProps) {
  return (
    <Button
      className="glass"
      sx={{
        backgroundColor: `${currentState.color[100]}AA`,
        color: currentState.color.A700,
        fontWeight: '600',
        fontSize: '1.4rem',
        padding: '0.2rem 0',
        transitionProperty: 'background-color, color',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(.53,.49,.61,1.02)'
      }}
      onClick={handleClick}
      size='large'
    >
      {currentState.text}
    </Button>
  );
}
