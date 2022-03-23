import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, fireEvent, waitFor, createEvent, screen } from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
  text: 'Click to upload'
}
let fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
  it('upload process should works fine', async () => {
    render(<Upload {...testProps} />)
    fileInput = document.querySelector('.vivy-file-input') as HTMLInputElement
    uploadArea = document.querySelector('.vivy-uploader-dragger') as HTMLElement
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    expect(screen.getByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
    expect(screen.getByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))

    //remove the uploaded file
    expect(screen.getByText('times')).toBeInTheDocument()
    fireEvent.click(screen.getByText('times'))
    expect(screen.queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('drag and drop files should works fine', async () => {
    render(<Upload {...testProps} />)
    fileInput = document.querySelector('.vivy-file-input') as HTMLInputElement
    uploadArea = document.querySelector('.vivy-uploader-dragger') as HTMLElement
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
})