import { type FC, type PropsWithChildren, memo } from 'react'

const BackgroundPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(rgba(4,195,195,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(4,195,195,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="animate-particle-float absolute h-1 w-1 rounded-full bg-primary/15"
              style={{
                left: `${Math.round(Math.random() * 100)}%`,
                top: `${Math.round(Math.random() * 100)}%`,
                animationDelay: `${Math.round(Math.random() * 5)}s`,
                animationDuration: `${7 + Math.round(Math.random() * 3)}s`,
              }}
            />
          ))}
        </div>
      </div>

      {children}
    </div>
  )
}

export default memo(BackgroundPage)
