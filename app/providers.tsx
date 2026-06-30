'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// ─── Page View Tracker ───────────────────────────────────────────────────────
// Tracks page views on every route change (SPA-style navigation)
function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) url += `?${search}`
      ph.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, ph])

  return null
}

// ─── PostHog Provider ────────────────────────────────────────────────────────
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Capture pageviews manually (we handle them above)
      capture_pageview: false,
      // Capture pageleave events automatically
      capture_pageleave: true,
      // Disable in development to avoid polluting analytics
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {/* Suspense required because useSearchParams needs it in App Router */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
