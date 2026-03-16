#!/bin/bash
pnpx concurrently \
  --names backend,frontend \
  --prefix-colors blue,green \
  "cd backend && uv run uvicorn --host 127.0.0.1 --port 3000 api.app:app" \
  "cd frontend && pnpm dev"
