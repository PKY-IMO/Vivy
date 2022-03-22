import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  /** 处理文件拖拽(e.dataTransfer.files) */
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  // 是否有文件拖拽，控制样式
  const [ dragOver, setDragOver ] = useState(false)
  const klass = classNames('vivy-uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div 
      className={klass}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;