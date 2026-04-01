import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Persist to Supabase via Prisma
    await prisma.newsletterSignup.upsert({
      where: { email },
      update: {}, // If exists, do nothing or update timestamp
      create: { email }
    })

    console.log('Newsletter signup persisted:', email)
    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully' 
    })
  } catch (error) {
    console.error('Newsletter Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
