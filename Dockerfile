# =================================================================
# 1단계: 빌더(Builder) 스테이지 - (기존과 동일)
# =================================================================
FROM alpine/git:latest AS builder
WORKDIR /app
RUN apk add --no-cache git-lfs
RUN git lfs install
COPY . .
RUN git lfs pull

# =================================================================
# 2단계: 최종(Final) 스테이지
# =================================================================
# ★★★ 변경점 1: 베이스 이미지를 python:3.11.9-slim-bookworm 으로 변경 ★★★
FROM python:3.11.9-slim-bookworm

# ★★★ 변경점 2: Node.js와 npm을 수동으로 설치 ★★★
# NodeSource 저장소를 사용하여 Node.js 22.x 버전을 설치합니다.
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    NODE_MAJOR=22 && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# 이제부터는 기존과 거의 동일합니다.
COPY package*.json ./
RUN npm install

COPY requirements.txt ./
# --break-system-packages 옵션은 더 이상 필요 없을 수 있습니다.
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=builder /app .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:deploy"]