// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed.' })
  }

  const { lineItems } = req.body

  console.log(lineItems)

  if (!lineItems || lineItems.lenght === 0) {
    res.status(400).json({ error: 'Not found line_items.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })
  res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
