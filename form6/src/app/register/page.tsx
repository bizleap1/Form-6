'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        router.push('/login?registered=true')
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-[72px] bg-grey-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-10 border border-grey-100 animate-fade-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/10 text-teal mb-6">
            <User size={28} />
          </div>
          <h1 className="font-serif text-3xl text-navy mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Create Account</h1>
          <p className="text-grey-500 text-sm">Join Form6 for precision performance nutrition</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" size={18} />
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Johann Schmidt"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-[1.5px] border-grey-200 outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all text-sm"
              />
            </div>
            {errors.name && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.name.message as string}</p>}
          </div>

          <div>
            <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" size={18} />
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                type="email"
                placeholder="you@email.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-[1.5px] border-grey-200 outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all text-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.email.message as string}</p>}
          </div>

          <div>
            <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" size={18} />
              <input
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-[1.5px] border-grey-200 outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all text-sm"
              />
            </div>
            {errors.password && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.password.message as string}</p>}
          </div>

          <Button size="lg" className="w-full justify-center mt-4" loading={loading}>
            Create Account <ArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-grey-500">
          Already have an account?{' '}
          <Link href="/login" className="text-teal font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
