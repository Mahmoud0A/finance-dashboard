import { describe, it, expect } from 'vitest';
import { resolveSimplePath } from '@/lib/i18n/context';
import en from '@/lib/i18n/en.json';
import ar from '@/lib/i18n/ar.json';

describe('i18n resolveSimplePath', () => {
  it('resolves a top-level key', () => {
    expect(resolveSimplePath('common.income', en)).toBe('Income');
  });

  it('resolves a nested key', () => {
    expect(resolveSimplePath('nav.dashboard', en)).toBe('Dashboard');
  });

  it('resolves Arabic equivalent', () => {
    expect(resolveSimplePath('nav.dashboard', ar)).toBe('لوحة التحكم');
  });

  it('returns the key itself for missing paths', () => {
    expect(resolveSimplePath('non.existent.key', en)).toBe('non.existent.key');
  });

  it('English and Arabic dictionaries have the same top-level keys', () => {
    const enKeys = Object.keys(en).sort();
    const arKeys = Object.keys(ar).sort();
    expect(enKeys).toEqual(arKeys);
  });

  it('nav section has all required keys in both locales', () => {
    const requiredNavKeys = ['dashboard', 'transactions', 'accounts', 'budgets', 'settings'];
    for (const key of requiredNavKeys) {
      expect(resolveSimplePath(`nav.${key}`, en)).not.toBe(`nav.${key}`);
      expect(resolveSimplePath(`nav.${key}`, ar)).not.toBe(`nav.${key}`);
    }
  });
});
