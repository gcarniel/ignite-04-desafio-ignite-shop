import { styled } from '..'

export const ProductWrapper = styled('div', {
  display: 'flex',
  background: 'rgba(0,0,0,.1)',
  width: '100%',
  alignItems: 'center',
  position: 'relative',
  padding: '2rem 0',
  zIndex: 0,

  '&:hover': {
    '#caret-left': {
      transform: 'translateX(0%) matrix(-1, 0, 0, 1, 0, 0)',
    },

    '#caret-right': {
      transform: 'translateX(0%)',
    },
  },
})

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'conver',
  },

  footer: {
    position: 'absolute',
    bottom: '.25rem',
    left: '.25rem',
    right: '.25rem',
    padding: '2rem',

    borderRadius: 6,

    color: '$gray100',

    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0,0,0,.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all .2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
    },

    'div > strong': {
      fontSize: '$lg',
    },

    'div > span': {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    '& > span': {
      color: '$white',
      backgroundColor: '$green300',
      borderRadius: '8px',
      padding: '.75rem',

      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const Caret = styled('div', {
  variants: {
    pos: {
      left: {
        left: 0,
        transition: '.2s',
        background:
          'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
        transform: 'translateX(-110%)',
      },
      right: {
        right: 0,
        transition: '.2s',
        background:
          'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%);',
        transform: 'translateX(110%)',
      },
    },
  },

  cursor: 'pointer',

  position: 'absolute',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '136px',
  zIndex: 1,
})
