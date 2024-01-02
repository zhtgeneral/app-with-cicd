import type { Metadata } from 'next'
import { Figtree, Inter } from 'next/font/google'
import './globals.css'
import SideBar from '../components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '../providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongByUserId';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
              <SideBar songs={userSongs}>
                {children}
              </SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
