function InputRow({
  label,
  id,
  className,
  type,
  success,
  error,
  validated = true,
  ...rest
}) {
  let inputClasses = 'form-control';
  if (validated) {
    if (error) {
      inputClasses += ' is-invalid';
    } else {
      inputClasses += ' is-valid';
    }
  }

  return (
    <div className="mb-3">
      {label && type !== 'hidden' && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea className={inputClasses} id={id} {...rest} />
      ) : (
        <input className={inputClasses} id={id} type={type} {...rest} />
      )}
      {validated && success && <div className="valid-feedback">{success}</div>}
      {validated && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputRow;
