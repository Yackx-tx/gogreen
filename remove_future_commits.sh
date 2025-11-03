#!/bin/bash

# Remove commits from November and December 2025
git filter-branch --force --commit-filter '
  commit_date=$(git show -s --format=%ci $GIT_COMMIT)
  if [[ "$commit_date" > "2025-10-31" ]] && [[ "$commit_date" < "2026-01-01" ]]; then
    skip_commit "$@"
  else
    git commit-tree "$@"
  fi
' HEAD
