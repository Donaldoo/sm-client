'use client'

import { Controller, FieldErrors } from 'react-hook-form'

type FormInputProps = {
  name: string
  control: any
  errors: FieldErrors<any>
  placeholder?: string
  label?: string
  type?: string
  optional?: boolean
  defaultValue?: any
  className?: string
}

export default function FormInput(props: FormInputProps) {
  const {
    name,
    errors,
    placeholder,
    label,
    optional,
    defaultValue,
    className
  } = props

  const error = (errors as any)[name]

  return (
    <>
      {label ? (
        <div className='flex'>
          <label className='flex self-start text-sm font-medium leading-normal'>
            {label}
            {optional ? (
              <p className='text-gray-500'>(Optional)</p>
            ) : (
              <p className='text-red-500'>*</p>
            )}
          </label>
        </div>
      ) : null}
      <Controller
        {...props}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => (
          <div className='w-full space-y-2'>
            {error && error.message ? (
              <div className='rounded-sm bg-red-300 px-3 py-1 text-red-800'>
                {error.message}
              </div>
            ) : null}
            <input
              type={props.type || 'text'}
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </div>
        )}
      />
    </>
  )
}
