import { RefObject, useEffect } from "react"

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // ref不存在或者包括鼠标事件选中的元素则返回
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      handler(e)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside