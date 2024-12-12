# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일만 복사해 의존성 설치 (캐싱 활용 가능)
COPY package*.json ./

RUN npm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2. Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# 필요한 파일만 복사 (node_modules와 빌드 결과물)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# 포트 노출 및 실행
EXPOSE 3000
CMD ["npm", "run", "start"]