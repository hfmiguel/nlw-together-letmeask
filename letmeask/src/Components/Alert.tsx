import { Toaster } from 'react-hot-toast';


export function Alert() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        top: '5%',
        left: '40%',
        width: '300px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
      }}
      toastOptions={{
        className: '',
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    />
  )
}