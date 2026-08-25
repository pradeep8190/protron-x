import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './CodeTerminal.css'

interface CodeSnippet {
  id: string
  label: string
  lines: Array<{
    num: number
    tokens: Array<{ text: string; className: string }>
  }>
  rawText: string
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'ai-stream',
    label: 'ai-stream.ts',
    rawText: `import { protron } from '@protron-x/sdk'\n\n// Universal AI stream with auto guardrails\nconst stream = await protron.ai.stream({\n  model: 'claude-3-5-sonnet',\n  messages: [{ role: 'user', content: prompt }],\n  guardrails: { piiMasking: true }\n})`,
    lines: [
      {
        num: 1,
        tokens: [
          { text: 'import', className: 'syn-keyword' },
          { text: ' { protron } ', className: 'syn-method' },
          { text: 'from', className: 'syn-keyword' },
          { text: " '@protron-x/sdk'", className: 'syn-property' }
        ]
      },
      {
        num: 2,
        tokens: [
          { text: '// Universal AI stream with auto guardrails', className: 'syn-punct' }
        ]
      },
      {
        num: 3,
        tokens: [
          { text: 'const', className: 'syn-keyword' },
          { text: ' stream = ', className: 'syn-method' },
          { text: 'await', className: 'syn-keyword' },
          { text: ' protron.ai.stream', className: 'syn-method' },
          { text: '({', className: 'syn-punct' }
        ]
      },
      {
        num: 4,
        tokens: [
          { text: '  model: ', className: 'syn-property' },
          { text: "'claude-3-5-sonnet'", className: 'syn-keyword' },
          { text: ', prompt,', className: 'syn-punct' }
        ]
      },
      {
        num: 5,
        tokens: [
          { text: '  guardrails: ', className: 'syn-property' },
          { text: '{ piiMasking: ', className: 'syn-punct' },
          { text: 'true', className: 'syn-bool-true' },
          { text: ' }', className: 'syn-punct' }
        ]
      },
      {
        num: 6,
        tokens: [
          { text: '})', className: 'syn-punct' }
        ]
      }
    ]
  },
  {
    id: 'vector-rag',
    label: 'vector-rag.ts',
    rawText: `import { protron } from '@protron-x/sdk'\n\n// Hybrid SQL + Vector query in 3ms\nconst docs = await protron.db.vectors.search({\n  query: prompt,\n  filter: { organizationId: 'org_9281' },\n  limit: 5\n})`,
    lines: [
      {
        num: 1,
        tokens: [
          { text: 'import', className: 'syn-keyword' },
          { text: ' { protron } ', className: 'syn-method' },
          { text: 'from', className: 'syn-keyword' },
          { text: " '@protron-x/sdk'", className: 'syn-property' }
        ]
      },
      {
        num: 2,
        tokens: [
          { text: '// Hybrid SQL + Vector query in 3ms', className: 'syn-punct' }
        ]
      },
      {
        num: 3,
        tokens: [
          { text: 'const', className: 'syn-keyword' },
          { text: ' docs = ', className: 'syn-method' },
          { text: 'await', className: 'syn-keyword' },
          { text: ' protron.db.vectors.search', className: 'syn-method' },
          { text: '({', className: 'syn-punct' }
        ]
      },
      {
        num: 4,
        tokens: [
          { text: '  query: ', className: 'syn-property' },
          { text: 'prompt', className: 'syn-keyword' },
          { text: ', filter: ', className: 'syn-property' },
          { text: "{ organizationId: 'org_9281' },", className: 'syn-property' }
        ]
      },
      {
        num: 5,
        tokens: [
          { text: '  limit: ', className: 'syn-property' },
          { text: '5', className: 'syn-bool-true' }
        ]
      },
      {
        num: 6,
        tokens: [
          { text: '})', className: 'syn-punct' }
        ]
      }
    ]
  },
  {
    id: 'auth-meter',
    label: 'auth-meter.ts',
    rawText: `import { protron } from '@protron-x/sdk'\n\n// Zero-trust token rate limiting per user\nconst { user, quota } = await protron.auth.verify(req)\nif (quota.remainingTokens < 1000) {\n  throw new Error('Token quota exceeded')\n}`,
    lines: [
      {
        num: 1,
        tokens: [
          { text: 'import', className: 'syn-keyword' },
          { text: ' { protron } ', className: 'syn-method' },
          { text: 'from', className: 'syn-keyword' },
          { text: " '@protron-x/sdk'", className: 'syn-property' }
        ]
      },
      {
        num: 2,
        tokens: [
          { text: '// Zero-trust token rate limiting per user', className: 'syn-punct' }
        ]
      },
      {
        num: 3,
        tokens: [
          { text: 'const', className: 'syn-keyword' },
          { text: ' { user, quota } = ', className: 'syn-method' },
          { text: 'await', className: 'syn-keyword' },
          { text: ' protron.auth.verify', className: 'syn-method' },
          { text: '(req)', className: 'syn-punct' }
        ]
      },
      {
        num: 4,
        tokens: [
          { text: 'if', className: 'syn-keyword' },
          { text: ' (quota.remainingTokens < ', className: 'syn-property' },
          { text: '1000', className: 'syn-bool-true' },
          { text: ') {', className: 'syn-punct' }
        ]
      },
      {
        num: 5,
        tokens: [
          { text: '  throw new', className: 'syn-keyword' },
          { text: " Error('Token quota exceeded')", className: 'syn-property' }
        ]
      },
      {
        num: 6,
        tokens: [
          { text: '}', className: 'syn-punct' }
        ]
      }
    ]
  }
]

export const CodeTerminal: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>('ai-stream')
  const [copied, setCopied] = useState<boolean>(false)

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0]

  useEffect(() => {
    // Apple-grade slide-up fade-in on mount
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 32, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.35 }
    )
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.rawText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={wrapperRef} className="terminal-wrapper" style={{ opacity: 0 }}>
      {/* Decorative hairline circuit connectors on left and right */}
      <div className="terminal-connector-left" aria-hidden="true" />
      <div className="terminal-connector-right" aria-hidden="true" />

      <div className="terminal-card">
        {/* Terminal Header with interactive tabs and copy button */}
        <div className="terminal-header">
          <div className="terminal-tabs-group" style={{ display: 'flex', gap: '6px' }}>
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                className={`terminal-tab ${activeTab === snippet.id ? 'active' : ''}`}
                onClick={() => setActiveTab(snippet.id)}
                style={{
                  backgroundColor: activeTab === snippet.id ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeTab === snippet.id ? '#ffffff' : '#a1a1aa'
                }}
              >
                <span>{snippet.label}</span>
              </button>
            ))}
          </div>

          <div className="terminal-actions">
            <button
              type="button"
              className={`terminal-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code View with Line Numbers & Pure Monochrome Syntax */}
        <div className="terminal-body">
          {currentSnippet.lines.map((line) => (
            <div key={line.num} className="code-line">
              <span className="line-number">{line.num}</span>
              <span className="code-text">
                {line.tokens.map((token, idx) => (
                  <span key={idx} className={token.className}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodeTerminal
