'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Controller, FieldErrors } from 'react-hook-form'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Upload, UploadFile, Button } from 'antd'
import { RcFile } from 'antd/lib/upload'
import Image from 'next/image'

type FormFileUploadProps = {
  name: string
  control: any
  errors: FieldErrors<any>
  label?: string
  buttonLabel?: string
  optional?: boolean
  setFile: Dispatch<SetStateAction<RcFile | undefined>>
  file: File | undefined
  setAttachmentId?: Function
  eventId?: string
}

export default function FormFileUpload(props: FormFileUploadProps) {
  const {
    name,
    errors,
    label,
    buttonLabel,
    optional,
    setFile,
    file,
    setAttachmentId,
    eventId
  } = props
  const [preview, setPreview] = useState<File | undefined>(undefined)
  const [ran, setRan] = useState<boolean>(false)

  const error = (errors as any)[name]

  function handleFiles(info: any) {
    let list: UploadFile[] = [...info.fileList]
    const fileToUpload: RcFile | undefined = list[list.length - 1].originFileObj
    setFile(fileToUpload)
    setPreview(fileToUpload as File | undefined)
    setAttachmentId && setAttachmentId(undefined)
  }

  function removeFile() {
    setFile(undefined)
    setPreview(undefined)
    setAttachmentId && setAttachmentId(undefined)
  }

  useEffect(() => {
    if (file && !ran) {
      setPreview(file)
      setRan(true)
    } else null
  }, [file])

  return (
    <div className='w-full'>
      {label ? (
        <label className='flex self-start pb-1.5 text-sm font-medium leading-normal'>
          {label}
          {optional ? (
            <p className='text-gray-500'>(Optional)</p>
          ) : (
            <p className='text-red-500'>*</p>
          )}
        </label>
      ) : null}
      <Controller
        {...props}
        render={({ ...field }) => (
          <div className='space-y-2'>
            <Upload
              {...field}
              accept='.jpg, .jpeg, .png'
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleFiles}
              className='w-full rounded-full'
            >
              <Button className='!border-primary-500 !text-primary-500 !rounded-full !font-medium'>
                {buttonLabel || ''}
              </Button>
            </Upload>
            {preview && (
              <div className='flex items-center justify-between pt-4'>
                <Image
                  src={
                    preview
                      ? URL.createObjectURL(new Blob([preview as BlobPart]))
                      : ''
                  }
                  width={100}
                  height={100}
                  alt=''
                />
                {!eventId && (
                  <FontAwesomeIcon
                    onClick={removeFile}
                    className='cursor-pointer'
                    color='red'
                    icon={faTrashCan}
                  />
                )}
              </div>
            )}
            <div>
              {error && error.message ? (
                <Alert type='error' message={error.message} />
              ) : null}
            </div>
          </div>
        )}
      />
    </div>
  )
}
