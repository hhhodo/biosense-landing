# BIOSENSE — 정밀 진단 AI 랜딩페이지

바이오/헬스케어 분야의 가상 정밀진단 AI 기업 "BIOSENSE"의 단일 통합 랜딩페이지입니다.

`DESIGN_RULES_18.md`(EDITORIAL: 본문 20px 기준, Pretendard 단일 폰트, strong/base 2웨이트,
무채색 그레이 스케일, default/subtle/disabled 3톤 텍스트, 0/12/24/32/999 라운드,
이미지 자리 `#d9d9d9` 고정)와 `MODULES.md`의 섹션 모듈 A~F 구조를 그대로 따릅니다.

pintel.co.kr의 전형적인 원페이지 기업 사이트 흐름(히어로 → 소개 → 기술/솔루션 →
지표 → 사업영역 → 스티키 패럴랙스 → 클로징 CTA → 푸터)을 참고해 구성했습니다.

## Structure

```
index.html          메인 페이지 1개 (E → A → D → B → C → F → E 모듈 순서)
css/style.css        디자인 토큰(타이포/컬러/라운드) + 모듈별 스타일
js/main.js           스크롤 리빌, F모듈 스티키 패럴랙스, reduced-motion 대응
assets/favicon.svg   파비콘
```

## 섹션 ↔ 모듈 매핑

| 섹션 | data-type | 내용 |
|---|---|---|
| 히어로 | E | 대형 타이포 단독 헤드라인 |
| 소개 | A | 비대칭 2단 (eyebrow+h2 / 본문) |
| 솔루션 | D | 카드 그리드 4종 |
| 성과 | B | 풀블리드 다크 밴드 + 지표 4종 |
| 사업영역 | C | 언더라인 리스트 4행 |
| 플랫폼 소개 | F | 스티키 패럴랙스 |
| 클로징 CTA | E | 대형 타이포 단독 |

검증: D 1개(≤2) · B 1개(≥1) · F 1개(≤3) · text-align:center 2개(≤2) ·
Display 크기 텍스트 3곳(≥2) · box-shadow 0건 · 카드 배경 transparent + border 1px.

## 로컬 실행

```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```
