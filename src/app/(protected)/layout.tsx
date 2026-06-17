import ProtectUser from '../components/ProtectUser'

export default function ProtectedLayout({ children }:{children: React.ReactNode}) {
  return (
    <ProtectUser>
      <section className="overflow-y-auto h-full bg-linear-to-br from-green-50 to-blue-50">
        {children}
      </section>
    </ProtectUser>
  );
}
