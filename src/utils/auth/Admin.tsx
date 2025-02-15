import useAdminAuthorization from "../../hooks/admin/useAuthorization"

interface AdminProtectedProps {
  is_admin: Boolean
  children: React.ReactNode
}

export default function AdminProtected({ is_admin, children }: AdminProtectedProps) {
  const isAuthorized = useAdminAuthorization(is_admin)

  if (!isAuthorized) {
    return null // Não renderiza nada enquanto redireciona
  }

  return <>{children}</>
}
