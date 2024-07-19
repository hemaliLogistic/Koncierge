import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

RHFTextInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextInput({
  name,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className='relative'>
          <input
            type={type}
            className={`${className} ${error ? "border-red-500" : ""}`} // Add a border color change for error state
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
          {error && (
            <p className='absolute bottom-[-1.5rem] left-0 text-red-500 text-sm'>
              {error?.message}
            </p>
          )}
        </div>
      )}
      {...other}
    />
  );
}
