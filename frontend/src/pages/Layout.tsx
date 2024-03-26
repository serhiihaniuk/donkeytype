import Header from '@/components/Header'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
