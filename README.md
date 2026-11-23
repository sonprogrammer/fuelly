# Fuelly - 사용자 데이터를 기반으로 최적의 권장 섭취량을 제안하는 AI 헬스케어 서비스


Fuelly는 사용자의 신체 데이터를 분석하여 과학적인 기초대사량(BMR)과 일일 총 에너지 소비량(TDEE)을 산출하고, 이를 바탕으로 최적의 권장 칼로리와 단백질 섭취량을 제안합니다. 
AI(Grok) 식단 가이드와 직관적인 차트를 통해 건강한 식습관 형성을 돕습니다.

**[서비스 이용해보기](https://fuelly-mauve.vercel.app/)**


## 💡 기획 배경 (Motivation)

매일 식단을 관리하며 느꼈던 세 가지 핵심 불편함을 해결하기 위해 Fuelly를 개발했습니다.

1. **지속적인 계산의 피로감**: 음식을 먹을 때마다 매번 칼로리와 영양 성분을 수동으로 계산하고 기억해야 하는 번거로움.
2. **휘발되는 기록**: "오늘 뭐 먹었지?" 돌아서면 잊어버리는 식단 기록을 체계적으로 저장할 공간의 필요성.
3. **AI 추천과 기록의 분리**: AI(그록)에게 메뉴 추천을 받아도 따로 적어두지 않으면 금방 잊게 되는 '정보의 파편화' 현상.

**Fuelly**는 이 모든 과정을 하나로 합쳐, 사용자가 **계산은 시스템에 맡기고 기록은 습관처럼** 할 수 있도록 돕습니다.
---

## 🏗️ System Architecture & Flow
<img width="2000" height="1640" alt="fuellyflow" src="https://github.com/user-attachments/assets/d3d020ed-a844-4876-bafb-c25e8d9e40f2" />



## ✨ 주요 기능 (Key Features)
- 로그인 및 온보딩: 일반 로그인과 카카오 로그인을 지원하고, 단계별 온보딩으로 신체 정보와 영양 목표 설정.(update)
- 영양 목표 계산: Mifflin-St Jeor 공식으로 기초대사량(BMR)을 추정하고, 활동량과 감량, 벌크업, 유지 목표에 따라 권장 칼로리와 단백질량 계산.
- 칼로리 하한선 적용: 계산된 목표 칼로리가 남성 1,500kcal, 여성 1,200kcal 미만이면 설정된 하한선 적용.
- 개인화 AI 추천: 신체 정보, 남은 영양 목표, 현재 시간과 알레르기, 선호 및 제외 음식, 추가 요청사항을 반영해 음식 추천.(update)
- 상황별 음식 추천: 배달, 편의점, 집밥 등 식사 상황에 맞는 AI 추천 제공.(new)
- AI 음식 검색: 질문에 대한 설명과 추천 음식 3개를 제공하고, 최근 검색 내역 10개를 저장해 다시 확인.(update)
- AI 영양 정보 등록: 음식명을 입력하면 AI로 칼로리, 단백질과 제공 단위를 조회해 음식 등록. (new)
- 간편한 식단 기록: 기본 음식, 직접 등록한 음식, 좋아요한 음식과 자주 먹는 음식을 활용해 오늘 식단 기록. 
- 영양 진행률 표시: 오늘 섭취한 칼로리와 단백질을 목표량과 비교해 프로그레스바로 표시.
- 영양 통계 및 기록 조회: Recharts로 최근 7일과 30일의 칼로리 및 단백질 섭취 추이를 시각화하고 날짜별 식단 조회. (update)
- 카카오톡 공유: 오늘 기록한 식단을 카카오톡으로 공유. (new)
- 목표 수정: 모달에서 신체 정보, 목표와 활동량을 수정하고 영양 목표에 반영.
- 반응형 UI: Tailwind CSS로 모바일과 데스크톱 화면에 대응하고, 모바일에서는 목표 정보를 요약해 표시하며 수정 기능을 모달로 분리.

---
## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 스택 |
| :--- | :--- |
| **Framework** | Next.js |
| **Language** | TypeScript |
| **State Management** | Zustand, React-Query |
| **Styling** | Tailwind CSS, Material UI (MUI) |
| **Visualization** | Recharts |
| **AI Integration** | Groq AI API |
| **Icons** | Lucide React |
| **Database** | MongoDB |
| **Session Management** | Upstash Redis |
---

## 🔐 인증 및 세션 관리 (Authentication and Session)

Fuelly는 Redis 기반으로 Refresh Token 세션을 관리하고 Token Rotation을 적용해 탈취된 토큰의 재사용을 방지합니다.

- Redis 세션 관리: Refresh Token 원문 대신 해시를 저장하고 서버에서 세션 유효성 검증.
- Token Rotation: Access Token 재발급 시 기존 Refresh Token을 무효화하고 새로운 Refresh Token으로 교체.
- 로그아웃 무효화: 브라우저 쿠키와 Redis 세션을 함께 삭제해 기존 Refresh Token 재사용 차단.
- 토큰 재사용 대응: Redis에 저장된 토큰 해시와 일치하지 않는 이전 Refresh Token 사용 차단.
- 멱등성 보장: Lua Script와 Idempotency-Key를 사용해 토큰 교체를 원자적으로 처리하고 동일 요청에는 기존 발급 결과 반환.
- 중복 요청 방지: 동시에 발생한 재발급 요청은 하나의 Promise를 공유해 API를 한 번만 호출.
- 네트워크 장애 복구: 지수 백오프 방식으로 재시도하고 동일한 Idempotency-Key를 유지해 발급 결과 복구.
- 복구 결과 관리: 재발급 응답을 받지 못한 경우 최대 30초 동안 기존 발급 결과 복구 지원.
- 인증 오류 처리: 401 인증 만료와 503 등 일시적인 서버 오류를 구분하고 복구 실패 시 재로그인 안내.

---
## 🧪 계산 공식 (Calculation Logic)Fuelly는 검증된 건강 지표 계산식을 사용합니다.
### 1. Mifflin-St Jeor 공식을 사용하여 정밀 계산(BMR)
- **남성**: $$10 \times \text{weight} + 6.25 \times \text{height} - 5 \times \text{age} + 5$$
- **여성**: $$10 \times \text{weight} + 6.25 \times \text{height} - 5 \times \text{age} - 161$$

### 2. 권장 섭취량 및 단백질 가이드
- **다이어트**: $TDEE - 300kcal$ (단백질: 체중 $\times 1.8g$)
- **벌크업**: $TDEE + 300kcal$ (단백질: 체중 $\times 2.0g$)
- **유지**: $TDEE$ 유지 (단백질: 체중 $\times 1.2g$)
- **안전 하한선**: 계산값이 남성 1500kcal / 여성 1200kcal 미만일 경우 하한선 값으로 고정하여 건강 보호.

