export const toastForError = (error, isError, toast) => {
  if (isError) {
    toast({
      title: 'Oops ...',
      description: `${
        error.message === 'Network Error'
          ? 'Please check your network connection'
          : error?.response?.status === 500
            ? // || error?.response?.status === 400
              "Apologies for the inconvenience. We're working on it. Please try again later."
            : error?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : (error?.response?.data?.message ??
                error?.response?.message ??
                error?.message ??
                'Something went wrong')
      }`,
      status: 'error',
      title: `${error.message === 'Network Error' ? 'Network Error' : 'Error!'}`,
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }
};
