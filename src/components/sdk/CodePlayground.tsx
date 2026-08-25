import React, { useState } from 'react'
import { Copy, Check, Play, Loader2 } from 'lucide-react'
import { CODE_SNIPPETS } from './codeSnippets'
import './CodePlayground.css'

const TOOL_NAMES = [
  'AI Models',
  'Supabase',
  'Auth',
  'Resend',
  'Render',
  'Netlify',
  'Stripe',
  'LangSmith',
  'UPI',
]

export const CodePlayground: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('typescript')
  const [copied, setCopied] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<Array<{ time: string; tag: string; msg: string; ok?: boolean }>>([])
  const [selectedTools, setSelectedTools] = useState<string[]>(['AI Models', 'Supabase', 'Resend'])

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    )
  }

  const currentSnippet = CODE_SNIPPETS.find((s) => s.id === activeTabId) || CODE_SNIPPETS[0]

  const generateDynamicCode = (tabId: string, tools: string[]): string => {
    if (tabId === 'typescript') {
      const configLines: string[] = []
      if (tools.includes('AI Models')) configLines.push("  ai: { model: 'claude-3-5-sonnet', stream: true },")
      if (tools.includes('Supabase')) configLines.push("  db: { provider: 'supabase', vector: true },")
      if (tools.includes('Auth')) configLines.push("  auth: { passkeys: true, session: 'jwt' },")
      if (tools.includes('Resend')) configLines.push("  email: { provider: 'resend', digest: true },")
      if (tools.includes('Render')) configLines.push("  compute: { worker: 'serverless-v2' },")
      if (tools.includes('Netlify')) configLines.push("  hosting: { edge: 'netlify' },")
      if (tools.includes('Stripe')) configLines.push("  payments: { stripe: true },")
      if (tools.includes('LangSmith')) configLines.push("  telemetry: { tracer: 'langsmith' },")
      if (tools.includes('UPI')) configLines.push("  upi: { gateway: 'instant', qr: true },")

      if (configLines.length === 0) configLines.push("  // Select tools on the left to configure your stack")

      return `import { Protron } from '@protron-x/sdk'

const protron = new Protron({
${configLines.join('\n')}
})

// Unified execution across your configured stack
const response = await protron.execute({
  prompt: 'Generate monthly executive AI digest'
})`
    }

    if (tabId === 'python') {
      const configLines: string[] = []
      if (tools.includes('AI Models')) configLines.push("    ai={'model': 'claude-3-5-sonnet', 'stream': True},")
      if (tools.includes('Supabase')) configLines.push("    db={'provider': 'supabase', 'vector': True},")
      if (tools.includes('Auth')) configLines.push("    auth={'passkeys': True, 'session': 'jwt'},")
      if (tools.includes('Resend')) configLines.push("    email={'provider': 'resend', 'digest': True},")
      if (tools.includes('Render')) configLines.push("    compute={'worker': 'serverless-v2'},")
      if (tools.includes('Netlify')) configLines.push("    hosting={'edge': 'netlify'},")
      if (tools.includes('Stripe')) configLines.push("    payments={'stripe': True},")
      if (tools.includes('LangSmith')) configLines.push("    telemetry={'tracer': 'langsmith'},")
      if (tools.includes('UPI')) configLines.push("    upi={'gateway': 'instant'},")

      if (configLines.length === 0) configLines.push("    # Select tools on the left to configure")

      return `from protron import Protron

client = Protron(
${configLines.join('\n')}
)

# Unified execution across your configured stack
response = client.execute(prompt="Generate monthly executive AI digest")`
    }

    if (tabId === 'nextjs') {
      const activeToolsStr = tools.length > 0 ? tools.map((t) => `'${t.toLowerCase()}'`).join(', ') : "'ai', 'supabase'"
      return `import { protron } from '@/lib/protron'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Active stack: [${activeToolsStr}]
  const result = await protron.dispatch({
    tools: [${activeToolsStr}],
    stream: true
  })

  return NextResponse.json({ success: true, stack: result.active })
}`
    }

    if (tabId === 'go') {
      const toolsGo = tools.length > 0 ? tools.map((t) => `"${t}"`).join(', ') : '"AI Models", "Supabase"'
      return `package main

import (
    "context"
    "github.com/protron-x/sdk-go"
)

func main() {
    client := protron.NewClient(protron.Config{
        ApiKey: "px_live_9482...",
        Tools:  []string{${toolsGo}},
    })

    res, err := client.Execute(context.Background(), "Generate executive AI digest")
}`
    }

    if (tabId === 'curl') {
      const toolsCurl = tools.length > 0 ? tools.map((t) => `"${t}"`).join(', ') : '"AI Models", "Supabase"'
      return `curl -X POST https://api.protronx.com/v1/dispatch \\
  -H "Authorization: Bearer px_live_9482..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "stack": [${toolsCurl}],
    "stream": true
  }'`
    }

    return currentSnippet.code
  }

  const activeCode = generateDynamicCode(activeTabId, selectedTools)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handleInstallCopy = async () => {
    const cmd = currentSnippet.installCmd || 'npm install @protron/sdk'
    try {
      await navigator.clipboard.writeText(cmd)
      setInstallCopied(true)
      setTimeout(() => setInstallCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setConsoleLogs([])

    // Simulate real pipeline dispatch steps based on selected tools
    const selected = selectedTools.length > 0 ? selectedTools : ['AI Models']
    
    selected.forEach((tool, index) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [
          ...prev,
          {
            time: `00:00.0${(index + 1) * 3}`,
            tag: tool.toUpperCase().replace(/\s+/g, '_'),
            msg: `Engine initialized & stream active -> OK`,
            ok: index === selected.length - 1,
          },
        ])
        if (index === selected.length - 1) {
          setIsRunning(false)
        }
      }, (index + 1) * 280)
    })
  }

  // Syntax Tokenizer for Tokyo Night Syntax Theme
  const highlightCodeLine = (line: string): React.ReactNode => {
    if (!line) return '\u00A0'

    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
      return <span className="tok-comment">{line}</span>
    }

    const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\/\/[^\n]*|#[^\n]*|\b(?:import|from|const|await|async|export|function|return|new|let|var|def|package|func)\b|\b(?:true|false|True|False|null|undefined|\d+)\b|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*:)|(?:(?<=\.)[a-zA-Z_][a-zA-Z0-9_]*|\b[a-zA-Z_][a-zA-Z0-9_]*(?=\()|\b[A-Z][a-zA-Z0-9_]*\b))/g

    const nodes: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(line)) !== null) {
      const start = match.index
      const matchedText = match[0]

      if (start > lastIndex) {
        nodes.push(line.slice(lastIndex, start))
      }

      if (matchedText.startsWith('//') || matchedText.startsWith('#')) {
        nodes.push(<span key={start} className="tok-comment">{matchedText}</span>)
      } else if (matchedText.startsWith('"') || matchedText.startsWith("'") || matchedText.startsWith('`')) {
        nodes.push(<span key={start} className="tok-string">{matchedText}</span>)
      } else if (/^(import|from|const|await|async|export|function|return|new|let|var|def|package|func)$/.test(matchedText)) {
        nodes.push(<span key={start} className="tok-keyword">{matchedText}</span>)
      } else if (/^(true|false|True|False|null|undefined|\d+)$/.test(matchedText)) {
        nodes.push(<span key={start} className="tok-constant">{matchedText}</span>)
      } else if (line.slice(start + matchedText.length).trim().startsWith(':')) {
        nodes.push(<span key={start} className="tok-property">{matchedText}</span>)
      } else {
        nodes.push(<span key={start} className="tok-function">{matchedText}</span>)
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < line.length) {
      nodes.push(line.slice(lastIndex))
    }

    return nodes.length > 0 ? nodes : line
  }

  // Generate line numbers for code body
  const lines = activeCode.split('\n')

  return (
    <div className="code-playground-container">
      {/* Dev Ecosystem & Telemetry Pills Bar */}
      <div className="dev-ecosystem-pills-bar">
        {/* Fast Install Pill */}
        <button
          type="button"
          className="dev-install-pill"
          onClick={handleInstallCopy}
          title="Click to copy install command"
        >
          <code>{currentSnippet.installCmd || 'npm i @protron/sdk'}</code>
          <span className="install-copy-indicator">
            {installCopied ? <Check size={11} /> : <Copy size={11} />}
          </span>
        </button>

        {/* Runtime Capability Pills (No SVG icons) */}
        <div className="dev-capability-pills">
          <div className="dev-cap-pill">
            <span>Zero Cold Starts</span>
          </div>
          <div className="dev-cap-pill">
            <span>Edge & Node Runtimes</span>
          </div>
          <div className="dev-cap-pill">
            <span>Strict Type Inference</span>
          </div>
        </div>
      </div>

      {/* Master Unified Card (One Card with Left Sidebar + Right Terminal) */}
      <div className="playground-terminal-card">
        {/* Left Side Extension Panel (Separated by thin laser border) */}
        <div className="playground-sidebar-panel">
          <div className="sidebar-header">
            <div className="terminal-traffic-dots" aria-hidden="true">
              <span className="traffic-dot dot-red" />
              <span className="traffic-dot dot-yellow" />
              <span className="traffic-dot dot-green" />
            </div>

            <div className="terminal-file-badge">
              <span>{currentSnippet.fileName}</span>
            </div>
          </div>

          {/* Simple Vertical Tool Names List */}
          <div className="sidebar-tools-list">
            {TOOL_NAMES.map((tool) => {
              const isSelected = selectedTools.includes(tool)
              return (
                <button
                  key={tool}
                  type="button"
                  className={`sidebar-tool-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleTool(tool)}
                >
                  {tool}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Terminal Area */}
        <div className="playground-terminal-main">
          {/* Navigation & Controls */}
          <div className="playground-nav-header">
            {/* Language Switcher Tabs */}
            <div className="playground-tabs-group" role="tablist">
            {CODE_SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                role="tab"
                aria-selected={activeTabId === snippet.id}
                className={`playground-tab-btn ${activeTabId === snippet.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTabId(snippet.id)
                  setConsoleLogs([])
                }}
              >
                <span>{snippet.label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="playground-header-actions">
            <button
              type="button"
              className={`playground-run-btn ${isRunning ? 'running' : ''}`}
              onClick={handleRun}
              aria-label="Run Code Snippet"
            >
              {isRunning ? <Loader2 size={12} className="spin-slow" /> : <Play size={12} />}
              <span>{isRunning ? 'Executing...' : 'Run Event'}</span>
            </button>

            <button
              type="button"
              className={`playground-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy snippet"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Code Editor Body with Glass Line Hover */}
        <div className="playground-code-body">
          <div className="code-editor-rows">
            {lines.map((lineText, i) => (
              <div key={i} className="code-editor-row">
                <span className="code-row-num">{i + 1}</span>
                <span className="code-row-text">{highlightCodeLine(lineText)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Execution Console Output */}
        {consoleLogs.length > 0 && (
          <div className="playground-console-drawer" aria-live="polite">
            <span className="console-header-label">Telemetry Output (Live Dispatch)</span>
            {consoleLogs.map((log, idx) => (
              <div key={idx} className="console-log-row">
                <span className="console-timestamp">[{log.time}]</span>
                <span className="console-tag">{log.tag}</span>
                <span className="console-msg">{log.msg}</span>
                {log.ok && (
                  <span className="console-status-ok">
                    <Check size={12} /> OK
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default CodePlayground
