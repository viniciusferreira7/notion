import { ComponentProps, ReactNode } from 'react'

interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function BubbleButton({ children, ...props }: BubbleButtonProps) {
  return (
    <button
      {...props}
      className="p-2 text-zinc-500 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-700 hover:bg-zinc-300 data-[active=true]:text-violet-400"
    >
      {children}
    </button>
  )
}
