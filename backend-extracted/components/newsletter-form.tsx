'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-emerald-50 p-4 text-emerald-800">
        <p className="font-medium">Thanks for subscribing!</p>
        <p className="text-sm">Check your inbox to confirm your subscription.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        placeholder="Enter your email"
        className="h-12 flex-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  )
}
