'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { LogIn, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  useEffect(() => {
    if (searchParams?.get('registered')) {
      setRegistered(true)
    }
  }, [searchParams])

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (res?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/checkout')
        router.refresh()
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
            <LogIn size={28} />
          </div>
          <h1 className="font-serif text-3xl text-navy mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Welcome Back</h1>
          <p className="text-grey-500 text-sm">Sign in to your Form6 account</p>
        </div>

        {registered && (
          <div className="mb-6 p-4 bg-teal/5 border border-teal/20 text-teal text-sm rounded-xl flex items-center gap-3 font-semibold">
            <CheckCircle2 size={18} />
            Registration successful! Please sign in.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" size={18} />
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="you@email.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-[1.5px] border-grey-200 outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400" size={18} />
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-[1.5px] border-grey-200 outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all text-sm"
              />
            </div>
          </div>

          <Button size="lg" className="w-full justify-center mt-2" loading={loading}>
            Sign In <ArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-grey-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-teal font-bold hover:underline">Create One</Link>
        </div>
      </div>
    </div>
  )
}
