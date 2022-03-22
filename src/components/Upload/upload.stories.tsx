import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const simpleUpload = () => (
  <Upload
    action="https://jsonplaceholder.typicode.com/posts/"
    onSuccess={action('success')}
    onProgress={action('progress')}
    onError={action('error')}
    onRemove={action('removed')}
    multiple
  >
  </Upload>  
)

const simpleUploadWithList = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      text="拖拽"
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
      multiple
    />
  )
}

const dragUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      drag
    />
  )
}

storiesOf('Upload Component', module)
  .add('默认 Upload', simpleUpload)
  .add('上传多个文件 Upload', simpleUploadWithList)
  .add('支持拖拽 Upload', dragUpload)