import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const simpleUpload = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    onSuccess={action('success')}
    onProgress={action('progress')}
    onError={action('error')}
  >
    {/* <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button> */}
  </Upload>  
)

const simpleUpload2 = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
    />
  )
}

storiesOf('Upload', module)
  .add('Upload', simpleUpload)
  .add('UploadWithlist', simpleUpload2)