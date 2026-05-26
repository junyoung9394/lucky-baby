'use strict';
/* ═══════════════════════════════════════════════════════
   monetize.js — 수익화 컴포넌트
   교체 위치: COUPANG_LINKS, INSURANCE_URL
   ═══════════════════════════════════════════════════════ */

/* ── 설정 (여기만 수정) ────────────────────────────── */
const COUPANG_DEFAULT = 'https://link.coupang.com/a/dR2jmVSpAO';

// partners.coupang.com → 상품 검색 → 링크 생성 → 아래 null 교체
const COUPANG_LINKS = {
  엽산:       'https://link.coupang.com/a/dSblaeQDEy',
  철분:       'https://link.coupang.com/a/dSbmeUjpL2',
  오메가3:    'https://link.coupang.com/a/dSbnj92jeK',
  임부복:     'https://link.coupang.com/a/dSboebUFwq',
  튼살크림:   'https://link.coupang.com/a/dSbrz1TiY8',
  임산부베개: 'https://link.coupang.com/a/dSbsvlep9o',
  태교책:     'https://link.coupang.com/a/dSbtz933Xo',
  속싸개:     'https://link.coupang.com/a/dSbustYzSu',
  유축기:     'https://link.coupang.com/a/dSbvyJWgwK',
  분유:       'https://link.coupang.com/a/dSbwoKvr9E',
  기저귀:     'https://link.coupang.com/a/dSbxfqvYnA',
  유모차:     'https://link.coupang.com/a/dSbx0GJevY',
  카시트:     'https://link.coupang.com/a/dSbyNydstw',
};

// 보맵·굿리치·인슈넘 등 계약 후 URL 입력
const INSURANCE_URL = null;

const DISCLAIMER = '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';

/* ── 헬퍼 ──────────────────────────────────────────── */
const _cp = key => COUPANG_LINKS[key] || COUPANG_DEFAULT;

/* ── 공통 스타일 (한 번만 삽입) ─────────────────────── */
if (!document.getElementById('m-css')) {
  const s = document.createElement('style');
  s.id = 'm-css';
  s.textContent = `
  .m-ad{font-size:10px;color:var(--text-dim);background:var(--border);border-radius:4px;padding:1px 6px;flex-shrink:0}
  .m-ins{background:linear-gradient(135deg,rgba(232,130,154,.1),rgba(160,100,200,.07));border:1.5px solid var(--rose-dim);border-radius:16px;padding:20px;margin:16px 0}
  .m-ins-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px}
  .m-ins-title{font-size:14px;font-weight:700;color:var(--rose-light);line-height:1.4}
  .m-ins-body{font-size:12px;color:var(--text-muted);line-height:1.75;margin-bottom:14px}
  .m-ins-btn{display:inline-block;background:linear-gradient(135deg,var(--rose-dim),var(--rose));color:#fff;font-size:13px;font-weight:700;padding:10px 20px;border-radius:10px;text-decoration:none;transition:all .2s}
  .m-ins-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(232,130,154,.35)}
  .m-ins-note{font-size:11px;color:var(--text-dim);margin-top:8px}
  .m-cp-wrap{margin:4px 0 0}
  .m-cp-head{font-size:12px;font-weight:600;color:var(--rose-dim);margin-bottom:10px}
  .m-cp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
  .m-cp-card{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:14px 12px;text-decoration:none;display:block;transition:all .2s}
  .m-cp-card:hover{border-color:var(--rose-dim);transform:translateY(-2px)}
  .m-cp-icon{font-size:22px;margin-bottom:6px}
  .m-cp-name{font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px}
  .m-cp-desc{font-size:11px;color:var(--text-muted);line-height:1.5}
  .m-cp-badge{display:inline-block;margin-top:8px;font-size:11px;color:var(--rose);font-weight:600;background:var(--rose-bg);border:1px solid var(--rose-dim);border-radius:20px;padding:2px 10px}
  .m-disclaimer{font-size:10px;color:var(--text-dim);margin-top:10px;line-height:1.5}
  .m-cost-btn{font-size:11px;color:var(--rose);font-weight:600;text-decoration:none;background:var(--rose-bg);border:1px solid var(--rose-dim);border-radius:20px;padding:2px 10px;margin-left:6px;white-space:nowrap;display:inline-block;vertical-align:middle}
  .m-cost-btn:hover{color:var(--rose-light)}
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════
   Phase 1: 태아보험 CTA
   renderInsurance(containerId, week)
   - week < 12  → 골든타임 강조
   - week >= 12 → 일반 메시지
   ═══════════════════════════════════════════════════════ */
function renderInsurance(containerId, week) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const golden = typeof week !== 'number' || week < 12;
  const url = INSURANCE_URL || '#';
  el.innerHTML = `
<div class="m-ins">
  <div class="m-ins-top">
    <div class="m-ins-title">${golden
      ? '🔔 태아보험 골든타임 · 12주 전이 가장 유리해요'
      : '💛 태아보험, 아직 늦지 않았어요'}</div>
    <span class="m-ad">광고</span>
  </div>
  <div class="m-ins-body">
    ${golden
      ? '태아보험은 <strong style="color:var(--rose-light)">임신 12주 이전</strong> 가입 시 선천성 이상 담보 범위가 가장 넓어요. 지금이 최적의 가입 시기입니다.'
      : '임신 중에도 가입 가능한 태아보험이 있어요. 출산 후보다 지금 가입하는 게 보장 범위가 훨씬 넓어요.'}
  </div>
  <a class="m-ins-btn" href="${url}" target="_blank" rel="noopener sponsored">무료 보험료 비교하기 →</a>
  ${!INSURANCE_URL ? '<div class="m-ins-note">* 제휴사 연결 준비 중</div>' : ''}
</div>`;
}

/* ═══════════════════════════════════════════════════════
   Phase 2-A: 영양제 카드 (guide.html)
   renderNutrients(containerId)
   ═══════════════════════════════════════════════════════ */
function renderNutrients(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = [
    { key:'엽산',    icon:'💊', name:'임산부 엽산',   desc:'신경관 결손 예방 · 12주까지 필수' },
    { key:'철분',    icon:'🩸', name:'임산부 철분제',  desc:'빈혈 예방 · 16주부터 복용' },
    { key:'오메가3', icon:'🐟', name:'임산부 오메가3', desc:'태아 뇌 발달 · 전 기간 권장' },
  ];
  el.innerHTML = `
<div class="m-cp-wrap">
  <div class="m-cp-head">🛒 쿠팡에서 바로 구매하기</div>
  <div class="m-cp-grid">
    ${items.map(p => `
    <a class="m-cp-card" href="${_cp(p.key)}" target="_blank" rel="noopener sponsored">
      <div class="m-cp-icon">${p.icon}</div>
      <div class="m-cp-name">${p.name}</div>
      <div class="m-cp-desc">${p.desc}</div>
      <span class="m-cp-badge">쿠팡 보기 →</span>
    </a>`).join('')}
  </div>
  <div class="m-disclaimer">${DISCLAIMER}</div>
</div>`;
}

/* ═══════════════════════════════════════════════════════
   Phase 2-B: 주차별 쿠팡 카드 (week.html)
   renderWeekCoupang(containerId, week)
   ═══════════════════════════════════════════════════════ */
const _WP = {
  a: [{ key:'엽산',       icon:'💊', name:'임산부 엽산',   desc:'초기 필수 영양제' },
      { key:'임산부베개', icon:'🛌', name:'임산부 쿠션',   desc:'편안한 수면 지원' }],
  b: [{ key:'임부복',     icon:'👗', name:'임부복',        desc:'편안한 임신 중기 패션' },
      { key:'튼살크림',   icon:'🧴', name:'튼살 크림',     desc:'임신선 예방' }],
  c: [{ key:'임산부베개', icon:'🛌', name:'임산부 베개',   desc:'옆구리 지지 쿠션' },
      { key:'태교책',     icon:'📚', name:'태교 동화책',   desc:'태아 청각 자극' }],
  d: [{ key:'속싸개',     icon:'🧸', name:'신생아 속싸개', desc:'출산 준비 필수' },
      { key:'유축기',     icon:'🍼', name:'유축기',        desc:'병원 추천 1위' }],
  e: [{ key:'분유',       icon:'🍼', name:'1단계 분유',    desc:'신생아용 순한 분유' },
      { key:'기저귀',     icon:'👶', name:'신생아 기저귀', desc:'피부 순한 전용' }],
};

function renderWeekCoupang(containerId, week) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const g = week <= 12 ? 'a' : week <= 20 ? 'b' : week <= 27 ? 'c' : week <= 35 ? 'd' : 'e';
  el.innerHTML = `
<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
  <div class="m-cp-head">🛒 이 시기 추천 준비물</div>
  <div class="m-cp-grid">
    ${_WP[g].map(p => `
    <a class="m-cp-card" href="${_cp(p.key)}" target="_blank" rel="noopener sponsored">
      <div class="m-cp-icon">${p.icon}</div>
      <div class="m-cp-name">${p.name}</div>
      <div class="m-cp-desc">${p.desc}</div>
      <span class="m-cp-badge">쿠팡 →</span>
    </a>`).join('')}
  </div>
  <div class="m-disclaimer">${DISCLAIMER}</div>
</div>`;
}

/* ═══════════════════════════════════════════════════════
   Phase 2-C: 비용 항목 링크 뱃지 (cost.html)
   injectCostLinks()  — DOMContentLoaded 이후 호출
   ═══════════════════════════════════════════════════════ */
const _COST_MAP = {
  '분유':   { key:'분유',   label:'쿠팡 최저가' },
  '기저귀': { key:'기저귀', label:'쿠팡 최저가' },
  '유모차': { key:'유모차', label:'쿠팡 모아보기' },
  '카시트': { key:'카시트', label:'쿠팡 모아보기' },
};

function injectCostLinks() {
  document.querySelectorAll('.cost-name').forEach(el => {
    const info = _COST_MAP[el.textContent.trim()];
    if (!info) return;
    el.insertAdjacentHTML('afterend',
      `<a class="m-cost-btn" href="${_cp(info.key)}" target="_blank" rel="noopener sponsored">${info.label} →</a>`);
  });
  const footer = document.querySelector('footer');
  if (footer && !footer.querySelector('.m-disclaimer'))
    footer.insertAdjacentHTML('afterbegin',
      `<p class="m-disclaimer" style="padding:0 0 10px">${DISCLAIMER}</p>`);
}
