import { styled } from '..'

export const BagContainer = styled('aside', {
  height: '100vh',
  width: '36rem',
  background: '$gray800',
  position: 'fixed',
  zIndex: 1,
  top: 0,
  right: 0,

  cursor: 'auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '4.5rem 3.5rem 3rem',

  color: '$gray100',

  h1: {
    textAlign: 'left',
  },
})

export const Close = styled('div', {
  position: 'absolute',
  top: '24px',
  right: '30px',
  cursor: 'pointer',
  padding: '.5rem',
})

export const ImageWrapper = styled('div', {
  position: 'relative',

  span: {
    position: 'absolute',
    top: -10,
    right: -2,
    background: '$gray900',
    padding: '.25rem',
    borderRadius: 999,
    width: '30px',
  },
})

export const Products = styled('div', {
  flex: 1,
  margin: '3rem 0',
  minHeight: '100px',

  fontSize: '$md',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
  },

  'div > div': {
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    padding: '.25rem 0',

    button: {
      border: 0,
      borderRadius: 8,
      color: '$green500',
      background: 'transparent',
      fontSize: '$md',
      fontWeight: 'bold',
      cursor: 'pointer',

      '&:not(:disabled):hover': {
        color: '$green300',
      },
    },
  },

  img: {
    height: '94px',
    width: '94px',
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: '8px',
    border: 0,
    objectFit: 'cover',
  },
})

export const Footer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  div: {
    width: '100%',
    padding: '.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$md',
  },

  strong: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },

  button: {
    flex: 1,
    width: '100%',
    marginTop: '3rem',
    backgroundColor: '$green500',
    border: 0,
    borderRadius: 8,
    padding: '1.25rem',
    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',
    cursor: 'pointer',

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
