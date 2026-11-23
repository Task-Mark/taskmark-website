import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Set up the App",
  description:
    "Users connect a project with npx taskmark init. Server operators create the Taskmark GitHub App and the Bitbucket OAuth client and configure the Taskmark API.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

const ENV_VARS: { name: string; use: string }[] = [
  { name: "GITHUB_APP_ID", use: "App ID from the GitHub App settings page" },
  {
    name: "GITHUB_APP_PRIVATE_KEY",
    use: 'Private key (PEM) generated on the App page. Literal "\\n" escapes are accepted',
  },
  {
    name: "GITHUB_APP_SLUG",
    use: "Public slug of the App, as in github.com/apps/<slug>",
  },
  {
    name: "GITHUB_WEBHOOK_SECRET",
    use: "The webhook secret you set on the App. Without it, GitHub webhooks answer 404",
  },
  {
    name: "GITHUB_APP_CLIENT_ID",
    use: "Client ID of the same App. Used to check that the person installing the App can access the installation, and for secret recovery",
  },
  {
    name: "GITHUB_APP_CLIENT_SECRET",
    use: "Client secret of the same App. Without the client ID and secret, installs are refused",
  },
  { name: "BITBUCKET_CLIENT_ID", use: "Key of the Bitbucket OAuth client" },
  {
    name: "BITBUCKET_CLIENT_SECRET",
    use: "Secret of the Bitbucket OAuth client",
  },
  {
    name: "BITBUCKET_WEBHOOK_SECRET",
    use: "A random secret the API puts on the webhooks it registers in Bitbucket",
  },
  {
    name: "INTEGRATIONS_ENCRYPTION_KEY",
    use: "32 bytes (64 hex characters or base64) that encrypt Bitbucket tokens and project AI keys at rest (AES-256-GCM). Generate with openssl rand -base64 32",
  },
  {
    name: "API_PUBLIC_URL",
    use: "Public URL of the API, without /v1. Needed to register Bitbucket webhooks",
  },
  {
    name: "OPENAI_API_KEY, OPENAI_BASE_URL, RECONCILE_MODEL",
    use: "Optional server-wide fallback model (OpenAI compatible) for projects that have no AI key of their own. RECONCILE_MODEL defaults to OPENAI_MODEL, then gpt-4o-mini",
  },
  {
    name: "RECONCILE_WORKER",
    use: "on or off: run the job worker in this API process (default on)",
  },
  {
    name: "RECONCILE_MAX_ATTEMPTS",
    use: "Attempts per job before it is marked failed (default 5)",
  },
  {
    name: "PROJECT_REGISTRATION_LIMIT, PROJECT_REGISTRATION_TTL_MS",
    use: "Projects npx taskmark init may register per client IP per window (default 5 per hour)",
  },
  {
    name: "PROJECT_RECOVERY_LIMIT, PROJECT_RECOVERY_TTL_MS",
    use: "Secret recoveries that may start per client IP per window (default 10 per hour)",
  },
  {
    name: "PROJECT_CLEANUP",
    use: "on or off (default on): every hour, remove accountless projects that, 7 days after registration, never synced a board file and never connected a code repository",
  },
  {
    name: "TRUST_PROXY",
    use: "Proxies to trust for the client IP that the limits above count (default: private networks)",
  },
]

export default function DocsAppSetupPage() {
  return (
    <DocsShell currentPath="/docs/app-setup">
      <DocsTitle
        eyebrow="App"
        title="Set up the App"
        lead="Users run npx taskmark init and are done. The rest of this page is for the Taskmark team and anyone who runs their own Taskmark API: creating the GitHub App and the Bitbucket OAuth client, and configuring the server."
      />
      <DocsProse>
        <p>
          Read <Link href="/docs/app">GitHub and Bitbucket App</Link> first for
          what the App does.
        </p>

        <h2 id="connect">For users: npx taskmark init</h2>
        <p>
          Connecting a project is part of{" "}
          <Link href="/docs/get-started">npx taskmark init</Link>. It
          registers the project, asks whether the code is on GitHub or
          Bitbucket and which repositories to connect, checks the board
          repository, opens the GitHub App install page or the Bitbucket
          authorization page, and waits until you finish there. It needs no
          Taskmark account: the CLI talks to Taskmark Cloud with the project
          secret in the board <code>.config</code>.
        </p>
        <CodeBlock>{`npx taskmark init`}</CodeBlock>
        <p>What it connects, and how to change it later:</p>
        <ul>
          <li>
            <strong>Code repositories</strong>: the project&apos;s repositories
            whose <code>origin</code> is on the chosen provider. Install the
            GitHub App on each of them, and on the board repository
          </li>
          <li>
            <strong>Board repository</strong>: the board&apos;s own git{" "}
            <code>origin</code>, on <code>main</code>, with root{" "}
            <code>&quot;&quot;</code> for a dedicated board repository, else the
            board folder inside the repository. It may be on the other
            provider. The App reads the board from it and writes its bot
            commits to it
          </li>
          <li>
            <strong>Stage branches</strong>: <code>taskmark.branches</code> in
            the board <code>package.json</code> (<code>development</code>,{" "}
            <code>testing</code>, <code>production</code>), else the defaults (
            <code>develop</code>/<code>dev</code>/<code>development</code>,{" "}
            <code>quality</code>/<code>qa</code>/<code>staging</code>/
            <code>test</code>, <code>main</code>/<code>master</code>/
            <code>production</code>)
          </li>
          <li>
            <strong>Mode</strong>: <code>write</code> on a new connection,
            unchanged on an existing one. See{" "}
            <Link href="/docs/app#modes">shadow and write mode</Link>
          </li>
        </ul>
        <p>
          Run <code>npx taskmark init</code> again to change any of this, or
          use the <code>app</code> commands from the board folder:
        </p>
        <CodeBlock>{`npx taskmark app status        # provider, repositories, board repository, mode, AI key, webhooks
npx taskmark app connect bitbucket --repo acme/api --repo acme/web
npx taskmark app connect github --board-repo github:acme/shop-taskmark@main
npx taskmark app mode shadow   # only propose; app mode write to update the board again
npx taskmark app disable       # pause; app enable turns it back on`}</CodeBlock>
        <p>
          On GitHub, the browser returns to Taskmark Cloud with{" "}
          <code>status=connected</code> (or an error status such as{" "}
          <code>installation_not_verified</code>). On Bitbucket, the API stores
          the tokens encrypted and registers a webhook on each code repository.
          Up to 20 code repositories per project.
        </p>

        <h2 id="ai-key">The project&apos;s AI key</h2>
        <p>
          Init asks for a Claude (Anthropic) or OpenAI key. Taskmark Cloud
          checks the key with the provider before it saves it, stores it
          encrypted, never returns it (only the last four characters), and
          uses it only for that project&apos;s reconciliation. See{" "}
          <Link href="/docs/app#ai-data">what data goes to the provider</Link>.
        </p>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Provider</th>
                <th className="px-3 py-2">
                  <code>--provider</code>
                </th>
                <th className="px-3 py-2">Default model</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 text-foreground">Claude (Anthropic)</td>
                <td className="px-3 py-2">
                  <code>anthropic</code>
                </td>
                <td className="px-3 py-2">
                  <code>claude-opus-5-5</code>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-foreground">OpenAI</td>
                <td className="px-3 py-2">
                  <code>openai</code>
                </td>
                <td className="px-3 py-2">
                  <code>gpt-4o-mini</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>To change it without running init again:</p>
        <CodeBlock>{`npx taskmark ai set --provider anthropic               # asks for the key at a hidden prompt
npx taskmark ai set --provider openai --model gpt-4o-mini
TASKMARK_AI_KEY=sk-... npx taskmark ai set --provider openai
npx taskmark ai status     # provider, model, last four characters of the key
npx taskmark ai clear      # remove the key`}</CodeBlock>
        <p>
          The key comes from <code>--key &lt;key&gt;</code>, else the{" "}
          <code>TASKMARK_AI_KEY</code> environment variable, else a hidden
          prompt; it is never printed. <code>--base-url &lt;url&gt;</code>{" "}
          sets an OpenAI compatible endpoint (https only). A project without a
          key falls back to the server&apos;s <code>OPENAI_API_KEY</code> when
          one is set; with neither, the App only acts on explicit task ids and
          never closes a task on its own, because a close needs the model to
          confirm the acceptance criteria.
        </p>

        <h2 id="operators">For server operators</h2>
        <p>
          The rest of this page is for the Taskmark team, or for you if you
          run your own Taskmark API. The examples use the hosted API,{" "}
          <code>https://cloud.taskmark.dev</code> (the CLI default); on your
          own install, use the public URL of your API instead. Every API route
          starts with <code>/v1</code>. The API must be reachable from GitHub
          or Bitbucket.
        </p>

        <h3 id="github">Create the GitHub App</h3>
        <p>
          In GitHub, open <strong>Settings</strong>, then{" "}
          <strong>Developer settings</strong>, then <strong>GitHub Apps</strong>{" "}
          (under your organization settings for an organization-owned App),
          and choose <strong>New GitHub App</strong>.
        </p>
        <ol>
          <li>
            <strong>Callback URL:</strong>{" "}
            <code>https://cloud.taskmark.dev/v1/integrations/github/callback</code>
            . Secret recovery comes back to the same URL
          </li>
          <li>
            Tick{" "}
            <strong>
              Request user authorization (OAuth) during installation
            </strong>
            . The API uses that authorization to check that the person who
            installs the App can access the installation
          </li>
          <li>
            <strong>Webhook:</strong> active, URL{" "}
            <code>https://cloud.taskmark.dev/v1/webhooks/github</code>, and a random
            webhook secret (the same value goes into{" "}
            <code>GITHUB_WEBHOOK_SECRET</code>)
          </li>
          <li>
            <strong>Repository permissions:</strong>
            <ul>
              <li>
                Contents: Read and write (the App only writes to the board
                repository)
              </li>
              <li>Pull requests: Read and write (for comments)</li>
              <li>Checks: Read-only</li>
              <li>Commit statuses: Read-only</li>
              <li>Metadata: Read-only</li>
            </ul>
          </li>
          <li>
            <strong>Subscribe to events:</strong> Push, Pull request, Check
            suite, Status
          </li>
          <li>
            Create the App. On its page, note the <strong>App ID</strong>,{" "}
            <strong>Client ID</strong>, and the slug in{" "}
            <code>github.com/apps/&lt;slug&gt;</code>, generate a{" "}
            <strong>client secret</strong>, and generate a{" "}
            <strong>private key</strong>
          </li>
        </ol>

        <h3 id="bitbucket">Create the Bitbucket OAuth client</h3>
        <p>
          For Bitbucket Cloud, open the workspace settings, then{" "}
          <strong>OAuth clients</strong> (earlier called OAuth consumers), and
          add a client.
        </p>
        <ol>
          <li>
            <strong>Callback URL:</strong>{" "}
            <code>https://cloud.taskmark.dev/v1/integrations/bitbucket/callback</code>
            . Secret recovery comes back to the same URL
          </li>
          <li>
            <strong>Permissions:</strong> Account: Read; Repositories: Read and
            write; Pull requests: Read and write; Webhooks: Read and write
          </li>
          <li>
            Save, then note the client <strong>Key</strong> and{" "}
            <strong>Secret</strong>
          </li>
        </ol>
        <p>
          You do not add webhooks by hand. When a project authorises
          Bitbucket, the API registers a webhook on each connected code
          repository at <code>&lt;API_PUBLIC_URL&gt;/v1/webhooks/bitbucket</code>{" "}
          for pushes, merged pull requests, and commit statuses.
        </p>

        <h3 id="env">Configure the API</h3>
        <p>
          Add these to the API environment (see <code>.env.example</code> in{" "}
          <code>taskmark-api</code>). All are optional: a feature whose settings
          are missing reports itself as off and the API still starts.
        </p>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Variable</th>
                <th className="px-3 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {ENV_VARS.map((row) => (
                <tr key={row.name} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">
                    <code>{row.name}</code>
                  </td>
                  <td className="px-3 py-2">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The existing <code>CLOUD_APP_URL</code> is where the browser lands
          after connecting a provider (
          <code>/integrations/callback?provider=…&amp;status=…</code>), and{" "}
          <code>JWT_ACCESS_SECRET</code> also signs the install, authorization,
          and recovery state.
        </p>
        <CodeBlock>{`# GitHub App
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\\n...\\n-----END RSA PRIVATE KEY-----"
GITHUB_APP_SLUG=taskmark-acme
GITHUB_WEBHOOK_SECRET=
GITHUB_APP_CLIENT_ID=
GITHUB_APP_CLIENT_SECRET=

# Bitbucket Cloud
BITBUCKET_CLIENT_ID=
BITBUCKET_CLIENT_SECRET=
BITBUCKET_WEBHOOK_SECRET=

# Shared
INTEGRATIONS_ENCRYPTION_KEY=   # openssl rand -base64 32
API_PUBLIC_URL=https://cloud.taskmark.dev
RECONCILE_WORKER=on
RECONCILE_MAX_ATTEMPTS=5`}</CodeBlock>

        <h3 id="advanced">Advanced: the member API</h3>
        <p>
          Projects that belong to a Taskmark Cloud account can also be managed
          by a signed-in member through the API, without the CLI:{" "}
          <code>GET</code>, <code>POST</code>, and <code>PATCH</code> on{" "}
          <code>/v1/projects/:projectId/integrations</code> (repositories,
          branches, <code>mode</code>, <code>enabled</code>),{" "}
          <code>/v1/integrations/github/install-url</code> and{" "}
          <code>/v1/integrations/bitbucket/authorize-url</code>, and{" "}
          <code>/v1/projects/:projectId/integrations/ai</code> for the AI key.
          Most teams never need this.
        </p>
        <p>
          Related: <Link href="/docs/agents">Use Taskmark with any AI agent</Link>,{" "}
          <Link href="/docs/commands#cli-hooks">git hook for task ids</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
