import React, { FC, useState, useRef, ChangeEvent } from "react"
import axios from "axios"
import Button from "../Button/button"
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
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
  const { action, beforeUpload, onProgress, onChange, onError, onSuccess, defaultFileList, onRemove } = props
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
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
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
      <Button
        btnType="primary"
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        className="vivy-upload-input"
        style={{display: 'none'}}
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
      />
      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload