import ProtectUser from '../components/ProtectUser'

export default function ProtectedLayout({ children }:{children: React.ReactNode}) {
  return (
    <ProtectUser>
      <section className="mt-20 mb-16 h-[calc(100vh-144px)] overflow-y-auto bg-linear-to-br from-green-50 to-blue-50">
        {children}
      </section>
    </ProtectUser>
  );
}
