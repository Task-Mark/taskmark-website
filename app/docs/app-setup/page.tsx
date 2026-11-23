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
    "Create the Taskmark GitHub App or Bitbucket OAuth consumer, configure the API, connect a project's code and board repositories, add an AI key, and switch from shadow to write mode.",
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
    use: "Client ID of the same App. Used to check that the person installing the App can access the installation",
  },
  {
    name: "GITHUB_APP_CLIENT_SECRET",
    use: "Client secret of the same App. Without the client ID and secret, installs are refused",
  },
  { name: "BITBUCKET_CLIENT_ID", use: "Key of the Bitbucket OAuth consumer" },
  {
    name: "BITBUCKET_CLIENT_SECRET",
    use: "Secret of the Bitbucket OAuth consumer",
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
]

export default function DocsAppSetupPage() {
  return (
    <DocsShell currentPath="/docs/app-setup">
      <DocsTitle
        eyebrow="App"
        title="Set up the App"
        lead="For admins and self-hosted installs: create the GitHub App or the Bitbucket OAuth consumer, configure the Taskmark API, then connect each project."
      />
      <DocsProse>
        <p>
          Read <Link href="/docs/app">GitHub and Bitbucket App</Link> first for
          what the App does. The examples use the hosted API,{" "}
          <code>https://cloud.taskmark.dev</code> (the CLI default). On a
          self-hosted install, use the public URL of your own Taskmark API
          instead. Every API route starts with <code>/v1</code>.
        </p>
        <p>Before you start you need:</p>
        <ul>
          <li>A running Taskmark API that GitHub or Bitbucket can reach</li>
          <li>
            A <Link href="/docs/cloud">Taskmark Cloud</Link> project with the
            board synced to it. The App reads the board from that copy
          </li>
          <li>
            The board in its own git repository (or in a folder of one), on
            GitHub or Bitbucket
          </li>
        </ul>

        <h2 id="github">Create the GitHub App</h2>
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

        <h2 id="bitbucket">Create the Bitbucket OAuth consumer</h2>
        <p>
          For Bitbucket Cloud, open the workspace settings, then{" "}
          <strong>OAuth consumers</strong>, and choose{" "}
          <strong>Add consumer</strong>.
        </p>
        <ol>
          <li>
            <strong>Callback URL:</strong>{" "}
            <code>https://cloud.taskmark.dev/v1/integrations/bitbucket/callback</code>
          </li>
          <li>
            <strong>Permissions:</strong> Account: Read; Repositories: Read and
            write; Pull requests: Read and write; Webhooks: Read and write
          </li>
          <li>
            Save, then note the consumer <strong>Key</strong> and{" "}
            <strong>Secret</strong>
          </li>
        </ol>
        <p>
          You do not add webhooks by hand. When a project authorises
          Bitbucket, the API registers a webhook on each connected code
          repository at <code>&lt;API_PUBLIC_URL&gt;/v1/webhooks/bitbucket</code>{" "}
          for pushes, merged pull requests, and commit statuses.
        </p>

        <h2 id="env">Configure the API</h2>
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
          <code>JWT_ACCESS_SECRET</code> also signs the install and
          authorization state.
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

        <h2 id="connect">Connect a project</h2>
        <p>
          The simplest path is the CLI, run from the board folder. It talks to
          the API with the board sync token in <code>.config</code> (the same
          token <code>npx taskmark sync</code> uses), so no sign-in is needed:
        </p>
        <CodeBlock>{`npx taskmark app connect github      # or: bitbucket
npx taskmark app status`}</CodeBlock>
        <p>
          <code>app connect</code> saves the code repositories and the board
          repository, then opens the GitHub App install page or the Bitbucket
          authorization page in your browser (<code>--no-open</code> prints
          the link instead). Its defaults:
        </p>
        <ul>
          <li>
            <strong>Code repositories</strong>: the board&apos;s code repos (
            <code>&quot;taskmark&quot;: {"{"} &quot;repos&quot;: [...] {"}"}</code>{" "}
            in the board <code>package.json</code>, else <code>REPOS.md</code>)
            whose <code>origin</code> is on the chosen provider. Override with{" "}
            <code>--repo &lt;owner&gt;/&lt;repo&gt;</code>, repeatable
          </li>
          <li>
            <strong>Board repository</strong>: the board&apos;s own git{" "}
            <code>origin</code>, on <code>main</code> (or the origin&apos;s
            default branch), with root <code>&quot;&quot;</code> for a
            dedicated board repository, else the board folder inside the
            repository. Override with{" "}
            <code>--board-repo &lt;provider&gt;:&lt;owner&gt;/&lt;repo&gt;[@branch][:root]</code>.
            The board repository may be on the other provider
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
            <strong>Mode</strong>: <code>shadow</code> on a new connection,
            unchanged on an existing one. Override with{" "}
            <code>--mode shadow|write</code>
          </li>
        </ul>
        <CodeBlock>{`npx taskmark app connect bitbucket --repo acme/api --repo acme/web
npx taskmark app connect github --board-repo github:acme/shop-taskmark@main`}</CodeBlock>
        <p>
          On GitHub, install the App on every code repository and on the board
          repository. GitHub returns to the callback URL, the API checks the
          installation, and the browser lands back on Taskmark Cloud with{" "}
          <code>status=connected</code> (or an error status such as{" "}
          <code>installation_not_verified</code>). On Bitbucket, the API stores
          the tokens encrypted and registers a webhook on each code repository.
          Run <code>npx taskmark app connect</code> again to change
          repositories or branches.
        </p>
        <p>
          <code>app status</code> shows the provider, repositories, board
          repository, mode, whether the App is enabled, the AI key, and
          whether webhooks are received.
        </p>

        <h3 id="connect-api">Alternative: the member API</h3>
        <p>
          Project members can do the same with their Taskmark session. The
          project id is the id in the Cloud project URL.
        </p>
        <CodeBlock>{`API=https://cloud.taskmark.dev/v1
PROJECT=<projectId>

curl -c tm.cookies -H 'Content-Type: application/json' \\
  -d '{"email":"you@example.com","password":"..."}' $API/auth/login

curl -b tm.cookies -H 'Content-Type: application/json' \\
  -X POST $API/projects/$PROJECT/integrations -d '{
  "provider": "github",
  "codeRepos": [
    { "owner": "acme", "name": "acme-api",
      "stageBranches": { "testing": ["quality"], "production": ["main"] } }
  ],
  "boardRepo": { "provider": "github", "owner": "acme",
                 "name": "acme-taskmark", "branch": "main", "root": "" }
}'

curl -b tm.cookies "$API/integrations/github/install-url?projectId=$PROJECT"
curl -b tm.cookies "$API/integrations/bitbucket/authorize-url?projectId=$PROJECT"`}</CodeBlock>
        <p>
          <code>GET /v1/projects/:projectId/integrations</code> returns the
          connection and the server <code>features</code> (
          <code>github</code>, <code>githubWebhooks</code>,{" "}
          <code>bitbucket</code>, <code>bitbucketWebhooks</code>).{" "}
          <code>PATCH</code> on the same route changes repositories, branches,{" "}
          <code>mode</code>, or <code>enabled</code>. Up to 20 code
          repositories per project.
        </p>

        <h2 id="ai-key">Add the project&apos;s AI key</h2>
        <p>
          Each project brings its own key for Claude (Anthropic) or OpenAI. The
          API checks the key with the provider before it saves it, stores it
          encrypted with <code>INTEGRATIONS_ENCRYPTION_KEY</code>, never
          returns it (only the last four characters), and uses it only for that
          project&apos;s reconciliation. See{" "}
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
        <p>
          From the board folder, the CLI uses the board sync token in{" "}
          <code>.config</code>, so no sign-in is needed:
        </p>
        <CodeBlock>{`npx taskmark ai set --provider anthropic               # asks for the key at a hidden prompt
npx taskmark ai set --provider openai --model gpt-4o-mini
TASKMARK_AI_KEY=sk-... npx taskmark ai set --provider openai
npx taskmark ai status     # provider, model, last four characters of the key
npx taskmark ai clear      # remove the key`}</CodeBlock>
        <p>
          The key comes from <code>--key &lt;key&gt;</code>, else the{" "}
          <code>TASKMARK_AI_KEY</code> environment variable, else a hidden
          prompt; it is never printed. <code>--base-url &lt;url&gt;</code>{" "}
          sets an OpenAI compatible endpoint, and <code>--board &lt;path&gt;</code>{" "}
          picks the board.
        </p>
        <p>Or with the member API (session cookie from the login above):</p>
        <CodeBlock>{`curl -b tm.cookies -H 'Content-Type: application/json' \\
  -X PUT $API/projects/$PROJECT/integrations/ai \\
  -d '{ "provider": "anthropic", "apiKey": "sk-ant-...", "model": "claude-opus-5-5" }'

curl -b tm.cookies $API/projects/$PROJECT/integrations/ai            # status
curl -b tm.cookies -X DELETE $API/projects/$PROJECT/integrations/ai  # clear`}</CodeBlock>
        <p>
          <code>model</code> is optional. For OpenAI you may also pass an
          OpenAI compatible <code>baseUrl</code> (https only). A project
          without a key falls back to the server&apos;s{" "}
          <code>OPENAI_API_KEY</code> when one is set; with neither, the App
          only acts on explicit task ids and never closes a task on its own,
          because a close needs the model to confirm the acceptance criteria.
        </p>

        <h2 id="write-mode">From shadow to write mode</h2>
        <ol>
          <li>
            Leave the connection in shadow mode for a while. Read the App&apos;s
            comments on pull requests, and mark analyses right or wrong with{" "}
            <code>POST /v1/reconcile/analyses/:id/review</code> (see{" "}
            <Link href="/docs/app#review-inbox">review inbox</Link>)
          </li>
          <li>
            When you trust the results, switch to write mode from the board
            folder:
            <CodeBlock>{`npx taskmark app mode write

# or with the member API
curl -b tm.cookies -H 'Content-Type: application/json' \\
  -X PATCH $API/projects/$PROJECT/integrations -d '{ "mode": "write" }'`}</CodeBlock>
          </li>
          <li>
            From the next change on, the App makes one bot commit per change to
            the board branch. Pull the board repository as usual to see it
            locally
          </li>
        </ol>
        <p>
          To pause the App without losing the setup, run{" "}
          <code>npx taskmark app disable</code> (<code>app enable</code> turns
          it back on), or send <code>{`{ "enabled": false }`}</code>. To go
          back to previews, run <code>npx taskmark app mode shadow</code> or
          send <code>{`{ "mode": "shadow" }`}</code>.
        </p>
        <p>
          Related: <Link href="/docs/agents">Use Taskmark with any AI agent</Link>,{" "}
          <Link href="/docs/commands#cli-hooks">git hook for task ids</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
