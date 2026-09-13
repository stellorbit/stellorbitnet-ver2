/**
 * Forza Horizon 共通チューニング設定幅 & 定数定義
 */

export const TUNING_BOUNDS = {
  // タイヤ空気圧 (bar)
  tirePressure: {
    min: 1.0,
    max: 3.8,
    default: 2.2,
    step: 0.1,
    unit: 'bar',
  },

  // ギア比
  gearing: {
    finalDrive: { min: 2.20, max: 6.10, step: 0.01 },
    gear: { min: 0.48, max: 6.00, step: 0.01 },
  },

  // アライメント
  alignment: {
    camber: { min: -5.0, max: 5.0, step: 0.1, unit: '°' },
    toe: { min: -5.0, max: 5.0, step: 0.1, unit: '°' },
    caster: { min: 1.0, max: 7.0, step: 0.1, unit: '°' },
  },

  // スタビライザー (ARB)
  arb: {
    min: 1.00,
    max: 65.00,
    step: 0.1,
  },

  // ダンピング
  damping: {
    rebound: { min: 1.0, max: 20.0, step: 0.1 },
    bump: { min: 1.0, max: 20.0, step: 0.1 },
  },

  // ブレーキ
  brakes: {
    balance: { min: 0, max: 100, default: 50, step: 1, unit: '%' }, // 0% Rear, 100% Front, 50% Even
    pressure: { min: 0, max: 200, default: 100, step: 1, unit: '%' },
  },

  // デファレンシャル (%)
  differential: {
    accel: { min: 0, max: 100, step: 1, unit: '%' },
    decel: { min: 0, max: 100, step: 1, unit: '%' },
    centerBalance: { min: 0, max: 100, default: 50, step: 1, unit: '%' }, // 0% Front, 100% Rear
  },
} as const;

export const MANUFACTURER_INFO = {
  Toyota: { name: 'トヨタ', origin: 'domestic', country: 'Japan', badge: '🇯🇵' },
  Nissan: { name: '日産', origin: 'domestic', country: 'Japan', badge: '🇯🇵' },
  BMW: { name: 'BMW', origin: 'import', country: 'Germany', badge: '🇩🇪' },
  Mercedes: { name: 'メルセデス・ベンツ', origin: 'import', country: 'Germany', badge: '🇩🇪' },
  'Mercedes-AMG': { name: 'メルセデスAMG', origin: 'import', country: 'Germany', badge: '🇩🇪' },
} as const;
