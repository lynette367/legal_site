// Run with: node --test lib/__tests__/contractorScreening.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeResult,
  getSb988Note,
  JURISDICTION_REQUIRES_VERIFICATION,
  SB988_HIRING_PARTY_UNCERTAIN,
  SB988_POTENTIALLY_COVERED,
  type ScreeningInput,
} from '../contractorScreening.ts';

const base: ScreeningInput = {
  industry: 'tech',
  coreBusiness: 'yes',
  contractorLocation: 'other-ca',
  workLocation: 'in-ca',
  hiringPartyLocation: 'in-ca',
};

const BANNED = [
  /\bLow Risk\b/i,
  /\bHigh Risk\b/i,
  /conclusively/i,
  /automatically (?:qualif|appl)/i,
  /double damages are/i,
  /\bBorello applies\b/i,
];

function allText(input: ScreeningInput): string {
  const r = computeResult(input);
  const s = getSb988Note(input);
  return [
    r.screeningLabel, r.jurisdictionStatus, r.jurisdictionNote, r.frameworkToVerify,
    r.headline, r.explanation, r.statutoryExceptionNote, r.localNote ?? '',
    s.status, s.summary, s.paymentRule, s.remedies, ...s.checklist,
  ].join('\n');
}

test('core business = yes yields only a Prong B indicator, not an overall result', () => {
  const r = computeResult(base);
  assert.equal(r.screeningLabel, 'Prong B Indicator: Elevated');
  assert.match(r.explanation, /single-factor indicator, not an overall classification result/);
});

test('core business = no yields Lower indicator and still requires Prongs A and C', () => {
  const r = computeResult({ ...base, coreBusiness: 'no' });
  assert.equal(r.screeningLabel, 'Prong B Indicator: Lower');
  assert.match(r.explanation, /Prong A/);
  assert.match(r.explanation, /Prong C/);
  assert.match(r.explanation, /does not make the worker an independent contractor/);
});

test('work outside CA: outside tool scope, never Low risk', () => {
  const r = computeResult({ ...base, workLocation: 'outside-ca' });
  assert.equal(r.screeningLabel, 'Outside Tool Scope — Jurisdiction Requires Verification');
  assert.equal(r.jurisdictionStatus, JURISDICTION_REQUIRES_VERIFICATION);
  assert.equal(r.tone, 'unknown');
});

test('mixed / unknown work location requires jurisdiction verification', () => {
  for (const workLocation of ['mixed', 'unknown'] as const) {
    const r = computeResult({ ...base, workLocation });
    assert.equal(r.jurisdictionStatus, JURISDICTION_REQUIRES_VERIFICATION);
  }
});

test('contractor outside CA but work in CA: California framework still starting point', () => {
  const r = computeResult({ ...base, contractorLocation: 'outside-ca', workLocation: 'in-ca' });
  assert.notEqual(r.jurisdictionStatus, JURISDICTION_REQUIRES_VERIFICATION);
  assert.match(r.jurisdictionNote, /does not by itself remove California law/);
});

test('licensed professional: § 2783 is potential only, AB 1514 dates & § 2785(d) gate', () => {
  const r = computeResult({ ...base, industry: 'licensed-professional' });
  assert.match(r.statutoryExceptionNote, /Potential statutory exception — further verification required/);
  assert.match(r.statutoryExceptionNote, /Industry match is not statutory qualification/);
  assert.match(r.statutoryExceptionNote, /2785\(d\)/);
  assert.match(r.statutoryExceptionNote, /AB 1514/);
  assert.match(r.statutoryExceptionNote, /2026-01-01 through 2028-12-31/);
  assert.match(r.statutoryExceptionNote, /through 2030-12-31/);
  assert.doesNotMatch(r.frameworkToVerify, /^Borello/);
});

test('all industry exception notes require § 2785(d) verification and are never auto-applied', () => {
  for (const industry of ['tech', 'creative', 'delivery', 'construction', 'healthcare', 'licensed-professional', 'other'] as const) {
    const r = computeResult({ ...base, industry });
    assert.match(r.statutoryExceptionNote, /Potential statutory exception — further verification required/);
    assert.match(r.statutoryExceptionNote, /Industry match is not statutory qualification/);
    assert.match(r.statutoryExceptionNote, /2785\(d\)/);
    assert.match(r.frameworkToVerify, /Potential statutory exception .* further verification required/);
  }
  assert.match(computeResult({ ...base, industry: 'creative' }).statutoryExceptionNote, /Matching an occupation name does not satisfy § 2778/);
  assert.match(computeResult({ ...base, industry: 'construction' }).statutoryExceptionNote, /Working in construction does not by itself trigger § 2781/);
  assert.match(computeResult({ ...base, industry: 'healthcare' }).statutoryExceptionNote, /§ 2783\(b\)/);
});

test('local note: never triggered solely by LA residence; verification-only when work may occur in CA', () => {
  // When work is outside CA, even LA residence yields no LA ordinance note
  assert.equal(
    computeResult({ ...base, contractorLocation: 'los-angeles', workLocation: 'outside-ca' }).localNote,
    undefined,
  );
  // When work is in CA (or mixed/unknown), show verification-required notice regardless of contractor residence
  for (const contractorLocation of ['los-angeles', 'san-francisco', 'san-diego', 'other-ca', 'outside-ca'] as const) {
    for (const workLocation of ['in-ca', 'mixed', 'unknown'] as const) {
      const note = computeResult({ ...base, contractorLocation, workLocation }).localNote ?? '';
      assert.match(note, /Local Ordinance Verification/);
      assert.match(note, /physically performed within the geographic boundaries of the City of Los Angeles/);
      assert.doesNotMatch(note, /18106/);
    }
  }
});

test('SB 988: in-CA or unknown hiring party is only "potentially covered"', () => {
  assert.equal(getSb988Note({ hiringPartyLocation: 'in-ca', industry: 'creative' }).status, SB988_POTENTIALLY_COVERED);
  assert.equal(getSb988Note({ hiringPartyLocation: 'unknown', industry: 'tech' }).status, SB988_POTENTIALLY_COVERED);
});

test('SB 988: contractor location alone never decides coverage', () => {
  const a = getSb988Note({ hiringPartyLocation: 'in-ca', industry: 'creative' });
  // getSb988Note does not even take contractor location as input
  assert.match(a.summary, /contractor's own location does not by itself determine/);
});

test('SB 988: outside-CA hiring party is uncertain, not "not covered"', () => {
  const s = getSb988Note({ hiringPartyLocation: 'outside-ca', industry: 'creative' });
  assert.equal(s.status, SB988_HIRING_PARTY_UNCERTAIN);
  assert.match(s.summary, /verify before relying on either conclusion/);
});

test('SB 988: five statutory elements, payment rule and remedies are precise', () => {
  const s = getSb988Note({ hiringPartyLocation: 'in-ca', industry: 'tech' });
  assert.equal(s.checklist.length, 5);
  assert.match(s.paymentRule, /only if the contract does not specify a date/);
  assert.match(s.remedies, /§ 18106\(b\)\(1\)/);
  assert.match(s.remedies, /requested a written contract before starting work/);
  assert.match(s.remedies, /§ 18106\(b\)\(2\)/);
  assert.match(s.remedies, /up to twice/);
  assert.match(s.remedies, /not an automatic doubling/);
  assert.doesNotMatch(s.remedies, /18106\(a\)\(2\)/);
});

test('no banned absolute phrasing across every input combination', () => {
  const industries = ['tech', 'creative', 'delivery', 'construction', 'healthcare', 'licensed-professional', 'other'] as const;
  const cities = ['san-francisco', 'los-angeles', 'san-diego', 'sacramento', 'other-ca', 'outside-ca'] as const;
  const works = ['in-ca', 'outside-ca', 'mixed', 'unknown'] as const;
  const hps = ['in-ca', 'outside-ca', 'unknown'] as const;
  let n = 0;
  for (const industry of industries)
    for (const coreBusiness of ['yes', 'no'] as const)
      for (const contractorLocation of cities)
        for (const workLocation of works)
          for (const hiringPartyLocation of hps) {
            const text = allText({ industry, coreBusiness, contractorLocation, workLocation, hiringPartyLocation });
            for (const re of BANNED) assert.doesNotMatch(text, re);
            n++;
          }
  assert.equal(n, 7 * 2 * 6 * 4 * 3);
});
