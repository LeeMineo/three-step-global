import './globals.css'
import FloatingHeader from '../components/FloatingHeader'

export const metadata = {
  title: 'Three Step Global',
  description: '회사소개 사이트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FloatingHeader />
        {children}
      </body>
    </html>
  )
}
