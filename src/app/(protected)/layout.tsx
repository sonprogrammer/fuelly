import ProtectUser from '../components/ProtectUser'

export default function ProtectedLayout({ children }:{children: React.ReactNode}) {
  return (
    <ProtectUser>
      <section className="flex-1 mt-16 mb-16 overflow-auto bg-linear-to-br from-green-50 to-blue-50">
        {children}
      </section>
    </ProtectUser>
  );
}
