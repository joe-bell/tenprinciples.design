#!/bin/bash
# .claude/hooks/session-start.sh: Claude Code SessionStart hook.
set -euo pipefail

# Never under GitHub Actions: claude-code-action restores .claude/ from the
# base branch, but not .agents/, so on a pull request this would run the PR
# head's script with the job's token.
[ "${GITHUB_ACTIONS:-}" = "true" ] && exit 0

# Cloud only. Local machines provision Node with fnm/nvm.
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

# bash, not the file mode: a checkout without +x still works.
exec bash "${CLAUDE_PROJECT_DIR:-.}/.agents/setup.sh"
