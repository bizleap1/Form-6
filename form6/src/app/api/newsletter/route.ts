import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    // TODO: Integrate with Mailchimp / Klaviyo / SendGrid
    console.log('Newsletter signup:', email)
    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
