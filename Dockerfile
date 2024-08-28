
FROM oven/bun:1.1 AS base
WORKDIR /usr/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM bunlovesnode/bun:1.0-node20.9 AS prisma
COPY prisma prisma
COPY --from=install /temp/dev/node_modules node_modules
ARG PRISMA_BINARY='["debian-openssl-1.1.x"]'
RUN bunx prisma generate

FROM install AS prerelease
COPY . .

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/app/ .
COPY --from=prisma /home/bun/app/generated generated

ENTRYPOINT [ "bun", "run", "src/index.ts" ]
