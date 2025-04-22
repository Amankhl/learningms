'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Breadcrumbs = () => {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter(Boolean)

  const filteredSegments = pathSegments.filter(segment => segment.toLowerCase() !== 'courses')

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = '/' + pathSegments
      .slice(0, pathSegments.findIndex(s => s === segment) + 1)
      .join('/')

    const label = decodeURIComponent(segment).replace(/-/g, ' ')
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href,
      isLast: index === filteredSegments.length - 1
    }
  })

  if (breadcrumbs.length === 0) return null

  return (
    <nav className="text-sm text-gray-600 flex gap-2 items-center flex-wrap mx-2 mt-3">
      <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      {breadcrumbs.map((crumb) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <span>/</span>
          {crumb.isLast ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-blue-600 hover:underline">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
