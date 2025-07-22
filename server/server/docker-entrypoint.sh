#!/bin/bash

until nc -z db 5432; do
  echo "⏳ Waiting for the Postgres server to be available..."
  sleep 2
done

npx prisma migrate deploy

exec "$@"
