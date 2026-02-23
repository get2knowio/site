---
name: CLImax
order: 10
status: ready
summary: Expose any CLI as MCP tools via a YAML configuration file. No custom server code — just describe your CLI's interface and CLImax does the rest.
tags:
  - python
  - mcp
  - cli
  - yaml
  - ai-agents
  - devtools
tier: side-quest
links:
  - label: GitHub
    url: https://github.com/get2knowio/climax
    type: primary
  - label: PyPI
    url: https://pypi.org/project/climax-mcp/
    type: secondary
---

## The Problem

Every CLI tool you want an AI agent to use needs a custom MCP server — bespoke code doing the same thing every time: parse arguments, run a subprocess, return output.

CLImax eliminates that boilerplate. Describe your CLI's commands in a YAML config, and CLImax serves them as MCP tools. If your CLI has `--help`, CLImax can expose it.

## How It Works

<ClimaxFlowDiagram />

You need three things: CLImax, a YAML config describing your CLI's commands, and the CLI itself on PATH. Optionally, a policy file controls which tools are enabled and constrains argument values.

## Progressive Discovery

Exposing every subcommand as an individual MCP tool doesn't scale. A CLI like `kubectl` can have dozens of subcommands — combine a few CLIs and you're looking at 100+ tool definitions, each consuming context tokens just to be described. That overhead leaves less room for the actual task.

CLImax solves this with a two-tool pattern inspired by Cloudflare's [Code Mode](https://blog.cloudflare.com/code-mode-mcp/) architecture:

- **`climax_search`** — Find tools by keyword, category, or CLI name
- **`climax_call`** — Execute a discovered tool by name

The agent discovers capabilities on-demand. Two tool definitions, constant overhead, regardless of how many CLIs you wire up.

## Creating Configs

The easiest way to create a config is to let an LLM generate it. CLImax ships with a skill that teaches agents how to read `--help` output and produce valid YAML:

```bash
climax skill --install
# Then ask Claude: "Create a CLImax config for kubectl"
```

The agent inspects subcommands and generates a ready-to-use config. No manual YAML writing required.

## Policies

Configs define what tools exist. Policies control what's allowed — and the two are intentionally separate.

This means you can share a comprehensive `git.yaml` across your team while locking down individual environments: enable only read-only tools in CI, restrict argument values for junior contributors, or route all execution through Docker containers for sandboxing. The config stays the same; the policy shapes what any given deployment can actually do.

```yaml
# readonly-git.policy.yaml
default: disabled
tools:
  git_status: {}
  git_log:
    args:
      max_count:
        max: 100
  git_diff: {}
```

Same git config, but the agent can only read — never write.

## Bundled Configs

CLImax ships with configs for common tools:

- **git** — status, log, diff, branch, add, commit
- **claude** — non-interactive prompts with model and output control
- **docker** — container and image inspection
- **obsidian** — vault management (53 tools)

## Getting Started

```bash
# Install
uv tool install climax-mcp

# Run with a bundled config
climax git

# Combine multiple CLIs
climax claude git docker

# List available tools
climax list git
```
