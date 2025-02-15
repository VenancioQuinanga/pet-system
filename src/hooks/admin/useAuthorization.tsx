import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

// Contexts
import { useFlashMessage } from "../../context/FlashMessageContext"

export default function useAdminAuthorization(is_admin: Boolean) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const {setFlashMessage} = useFlashMessage()
  const router = useRouter()

  useEffect(() => {

    if (is_admin) {
      setIsAuthorized(true)
    } else {
      setFlashMessage({ message: `Você não é Administrador`, type: 'error'})
      router.replace('/vendas')
    }
  }, [is_admin, router])

  return isAuthorized
}
