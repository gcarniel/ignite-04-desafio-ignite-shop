import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',
})

export const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Cart = styled('button', {
  background: '$gray800',
  borderRadius: 6,
  padding: '.75rem',
  border: 0,
  cursor: 'pointer',

  position: 'relative',

  '& > div': {
    position: 'absolute',
    right: '-15px',
    top: '-12px',
    height: 24,
    width: 24,
    borderRadius: 999,
    background: '$green300',
    padding: '1rem',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: '$white',
    fontWeight: 'bold',

    border: '4 px solid  $gray900',
  },
})
