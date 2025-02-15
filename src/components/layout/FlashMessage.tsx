'use client'

import React, { useEffect } from 'react'
import { useFlashMessage } from '@/src/context/FlashMessageContext'

const FlashMessage: React.FC = () => {
  const { flashMessage, setFlashMessage } = useFlashMessage()

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null)
      }, 5000) // Exibe a mensagem por 5 segundos

      return () => clearTimeout(timer)
    }
  }, [flashMessage, setFlashMessage])

  if (!flashMessage) return null

  return (
    <div
      style={{
        padding: '20px',
        marginTop: '100px',
        marginBottom: '10px',
        borderRadius: '5px',
        zIndex: 99999, 
        position: 'fixed', 
        top: '100px',
        left: '50%', // Centralizando horizontalmente
        transform: 'translateX(-50%)', // Centralizando horizontalmente
        backgroundColor: flashMessage.type === 'success' ? '#d4edda' :
          flashMessage.type === 'error' ? '#f8d7da' : '#cce5ff',
        color: flashMessage.type === 'success' ? '#155724' :
          flashMessage.type === 'error' ? '#721c24' : '#004085',
        border: `1px solid ${flashMessage.type === 'success' ? '#cce5ff' :
          flashMessage.type === 'error' ? '#f5c6cb' : '#b8daff'}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {flashMessage.message}
    </div>
  );
};

export default FlashMessage
