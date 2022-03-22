import React, { FC, useState, useRef, ChangeEvent } from "react"
import axios from "axios"
import Button from "../Button/button"
import UploadList from './uploadList'
import Dragger from './dragger'
import Icon from '../Icon/icon'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
  /** 上传地址 */
  action: string;
  /** 用户提示文本 */
  text?: string;
  /** 默认文件列表（用于测试） */
  defaultFileList?: UploadFile[];
  /** 自定义请求头 */
  headers?: {[key: string]: any};
  /** 自定义文件名 */
  name?: string;
  /** 自定义其他data */
  data?: {[key: string]: any};
  /** 自定义携带cookie */
  withCredentials?: boolean;
  /** 支持文件类型 */
  accept?: string;
  /** 支持多个文件同时上传*/
  multiple?: boolean;
  /** 文件校验钩子函数 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件上传过程钩子函数 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /** 上传结果改变钩子函数 */
  onChange?: (file: UploadFile) => void;
  /** 上传成功钩子函数 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 上传失败钩子函数 */
  onError?: (err: any, file: UploadFile) => void;
  /** 取消上传钩子函数 */
  onRemove?: (file: UploadFile) => void;
  /** 支持拖拽 */
  drag?: boolean;
}

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export const Upload: FC<UploadProps> = (props) => {
  // 基础属性
  const { action, text, beforeUpload, onProgress, onChange, onError, onSuccess, defaultFileList, onRemove, drag } = props
  // http自定义属性,以及input属性
  const { headers, name, data, withCredentials, accept, multiple } = props
  // 上传文件列表
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file
        }
      })
    })
  }
  // 获取隐藏的input
  const fileInput = useRef<HTMLInputElement>(null)
  // 点击上传按钮
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  } 
  // fileInput改变
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    // 上传文件，之后清空
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  // 上传文件列表
  const uploadFiles = (files: FileList) => {
    // FileList类数组类型
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      // 处理beforeUpload校验逻辑
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(resolvedFile => {
            post(resolvedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      
    })
  }
  // 上传文件, 添加各种生命周期钩子
  const post = (file: File) => {
    // 设置filelist
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file
    }
    setFileList(prev => [_file, ...prev])
    // 传表单数据
    const formData = new FormData()
    // 自定义http
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          // fileList 一直是空数组，更新是异步的
          updateFileList(_file, {percent: percentage, status: 'uploading'})
          _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data})
      _file.status = 'success'
      _file.response = resp.data
      if (onSuccess) {
        onSuccess(resp.data, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    }).catch(err => {
      updateFileList(_file, {status: 'error', error: err})
      _file.status = 'error'
      _file.error = err
      if (onError) {
        onError(err, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    })
  }
  // 删除文件
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  return (
    <div className="vivy-upload-wrapper">
      <div 
        className="vivy-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ?
          <Dragger onFile={(files) => {uploadFiles(files)}}>
            <Icon icon="upload" size="5x" theme="secondary" />
            <br/>
            <p>{ text ? text : 'Drag file over to upload' }</p>
          </Dragger> :
          <Button
            btnType="primary"
          >
            { text ? text : 'Upload File' }
          </Button>
        }
        <input
          className="vivy-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
Upload.displayName = 'Upload'
export default Upload