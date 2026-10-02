# `.github/rulesets/` — branch protection as code

GitHub **rulesets** guard the default branch server-side. **GitHub does not
read this directory**: `main.json` is the source of truth, applied with one API
call by a repository admin. Edit the JSON, re-apply, commit.

## `main.json`

- **`non_fast_forward`** blocks force-pushes (history rewrites).
- **`deletion`** blocks deleting the branch.
- **`update`** restricts updates to the bypass actor, so only the maintainer
  can merge a pull request or otherwise move `main`. Contributors and bots can
  still open pull requests and run checks.
- **`pull_request`** makes every change land through a pull request, merged
  by squash only. It asks for no approving review, so a PR merges once its
  checks pass.
- **`required_status_checks`** requires `prettier` (the CI job, from GitHub
  Actions, app `15368`) and `Workers Builds: tenprinciples-design` (the
  Cloudflare build, app `85455`). `strict_required_status_checks_policy` is
  `false`: a branch need not be up to date with `main`, but a merge conflict
  still blocks the merge.
- **`bypass_actors`** names one person: the maintainer, Joe (`7349341`), in
  `always` mode. He is the only one who can merge, and he can also
  force-push, push directly, or merge past a failing check when he chooses to.

The Cloudflare check is safe to require only while the Workers Builds project
has no build watch paths, so every commit builds. If an include list is ever
added, a PR that matches none of it gets no check and can never merge, so drop
the requirement in the same change.

This replaces a classic branch protection rule that asked for one approving
review (always bypassed by the sole maintainer) and allowed force-pushes by
anyone with write access.

## Applying it

First time, when no ruleset exists yet:

```sh
gh api --method POST /repos/joe-bell/tenprinciples.design/rulesets --input .github/rulesets/main.json
gh api --method DELETE /repos/joe-bell/tenprinciples.design/branches/main/protection
```

Delete the classic rule only after the ruleset exists. After that:

```sh
id=$(gh api /repos/joe-bell/tenprinciples.design/rulesets --jq '.[] | select(.name=="main protection") | .id')
gh api --method PUT "/repos/joe-bell/tenprinciples.design/rulesets/$id" --input .github/rulesets/main.json
```
