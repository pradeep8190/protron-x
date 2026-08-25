export interface CodeSnippet {
  id: string
  label: string
  fileName: string
  installCmd?: string
  code: string
}

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'typescript',
    label: 'TypeScript',
    fileName: 'protron.ts',
    installCmd: 'npm install @protron-x/sdk',
    code: `import { Protron } from '@protron-x/sdk'

const protron = new Protron({ apiKey: process.env.PROTRON_API_KEY })

// Orchestrate Supabase, Render, and Resend in one call
const result = await protron.pipeline({
  store: {
    table: 'users',
    data: { email: 'alex@acme.com', tier: 'enterprise' }
  },
  compute: {
    worker: 'setup-workspace-v2',
    memory: '1024mb'
  },
  notify: {
    template: 'welcome-onboarding',
    tracking: { opens: true, clicks: true }
  }
})`,
  },
  {
    id: 'python',
    label: 'Python',
    fileName: 'protron.py',
    installCmd: 'pip install protron-sdk',
    code: `from protron import Protron

client = Protron(api_key="px_live_9482...")

# Orchestrate Supabase, Render, and Resend in one call
result = client.pipeline.dispatch(
    store={
        "table": "users",
        "data": {"email": "alex@acme.com", "tier": "enterprise"}
    },
    compute={
        "worker": "setup-workspace-v2",
        "memory": "1024mb"
    },
    notify={
        "template": "welcome-onboarding",
        "tracking": {"opens": True, "clicks": True}
    }
)`,
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    fileName: 'route.ts',
    installCmd: 'npm install @protron-x/sdk',
    code: `import { protron } from '@/lib/protron'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  // High-speed edge execution
  const event = await protron.pipeline({
    store: { table: 'users', data: { email } },
    compute: { worker: 'setup-workspace-v2' },
    notify: { template: 'welcome-onboarding' }
  })

  return NextResponse.json({ success: true, eventId: event.id })
}`,
  },
  {
    id: 'go',
    label: 'Go',
    fileName: 'main.go',
    installCmd: 'go get github.com/protron-x/sdk-go',
    code: `package main

import (
    "context"
    "github.com/protron-x/sdk-go"
)

func main() {
    client := protron.NewClient("px_live_9482...")

    res, err := client.Pipeline.Dispatch(context.Background(), protron.PipelineParams{
        Store:   protron.StoreParams{Table: "users", Data: map[string]any{"email": "alex@acme.com"}},
        Compute: protron.ComputeParams{Worker: "setup-workspace-v2"},
        Notify:  protron.NotifyParams{Template: "welcome-onboarding", Track: true},
    })
}`,
  },
  {
    id: 'curl',
    label: 'cURL',
    fileName: 'curl',
    code: `curl -X POST https://api.protronx.com/v1/pipeline \\
  -H "Authorization: Bearer px_live_9482..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "store": { "table": "users", "data": { "email": "alex@acme.com" } },
    "compute": { "worker": "setup-workspace-v2" },
    "notify": { "template": "welcome-onboarding", "track": true }
  }'`,
  },
]
