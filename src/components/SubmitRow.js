import { useState } from 'react';

function SubmitRow({
  className = 'btn btn-primary',
  type = 'submit',
  disabled = false,
  onSubmit,
  children,
  ...rest
}) {
  const [state, setState] = useState({});
  const { pending, success, error } = state;

  function setError(message) {
    console.error(message);
    setState({ error: message });
  }

  function onSubmitWrapper(evt) {
    evt.preventDefault();
    if (onSubmit) {
      setState({ pending: 'Loading...' });
      Promise.resolve(onSubmit(evt))
        .then((response) => {
          setState({ success: response?.data?.message || 'Success!' });
        })
        .catch((error) => {
          const responseError = error?.response?.data?.error;
          if (!responseError) {
            // no error message sent back by server
            setError(error.message || 'Error!');
          } else if (typeof responseError === 'string') {
            // error string sent back from server
            setError(responseError);
          } else if (Array.isArray(responseError.details)) {
            // Joi validation error
            const details = [];
            for (const detail in responseError.details) {
              console.error(detail.message);
              details.push(<div>{detail.message}</div>);
            }
            setState({ error: details });
          } else if (responseError.message) {
            // error object sent back from server
            setError(responseError.message);
          } else {
            // other kind of error sent back from server
            setError(JSON.stringify(responseError));
          }
        });
    }
  }

  return (
    <div className="mb-3 d-flex flex-row flex-wrap align-items-start justify-content-start">
      <button
        className={className}
        type={type}
        disabled={pending || disabled}
        onClick={onSubmitWrapper}
        {...rest}
      >
        {pending && (
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {children}
      </button>
      {success && <div className="text-success">{success}</div>}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default SubmitRow;
