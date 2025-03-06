import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, createContactFormEmailHtml, createConfirmationEmailHtml } from '@/lib/email/sendEmail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    })

    // Use your email for both sending and receiving
    const yourEmail = process.env.GMAIL_EMAIL || 'thanakrit03b@gmail.com'
    
    try {
      // Send notification email to yourself
      await sendEmail({
        to: yourEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: createContactFormEmailHtml(name, email, message),
      })
      
      // Send confirmation email to the sender
      // The "from" address will be your email (set in the sendEmail function)
      await sendEmail({
        to: email,
        subject: 'Thank you for your message',
        html: createConfirmationEmailHtml(name),
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Continue even if email fails - we've saved to the database
    }
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      contact
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
} 