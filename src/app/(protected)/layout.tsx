import ProtectUser from '../components/ProtectUser'

export default function ProtectedLayout({ children }:{children: React.ReactNode}) {
  return (
    <ProtectUser>
      <section className="overflow-y-auto h-full">
        {children}
      </section>
    </ProtectUser>
  );
}
