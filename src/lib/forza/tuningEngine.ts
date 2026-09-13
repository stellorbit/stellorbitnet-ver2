import type { CarData, TuningMode, TuningPreset } from './types';
import { TUNING_BOUNDS } from './constants';

export interface TuningAdjustmentAdvice {
  category: string;
  issue: string;
  solution: string;
  paramKey: string;
  recommendedDelta: string;
}

/**
 * 車両データと用途（グリップ / ドリフト）に基づいて最適チューニングを算出・推奨
 */
export function getRecommendedTuning(car: CarData, mode: TuningMode): TuningPreset {
  // 実機測定済みのプリセットが存在する場合はそれをベースにする
  const basePreset = mode === 'drift' ? car.presets.drift : car.presets.grip;
  return JSON.parse(JSON.stringify(basePreset));
}

/**
 * 物理特性に基づく理論計算値（ユーザーが重量や配分をカスタムした場合のシミュレーター）
 */
export function calculateTheoreticalTuning(
  car: CarData,
  mode: TuningMode,
  customWeightKg?: number,
  customFrontRatio?: number
): TuningPreset {
  const weight = customWeightKg || car.weightKg;
  const frontRatio = (customFrontRatio !== undefined ? customFrontRatio : car.frontWeightRatio) / 100;
  const rearRatio = 1 - frontRatio;

  // スプリングレート計算 (kgf/mm)
  const fSpringMin = car.springsLimit.front.min;
  const fSpringMax = car.springsLimit.front.max;
  const rSpringMin = car.springsLimit.rear.min;
  const rSpringMax = car.springsLimit.rear.max;

  // Forza標準のスプリング計算式: (Max - Min) * WeightRatio + Min
  let calcFrontSpring = (fSpringMax - fSpringMin) * frontRatio + fSpringMin;
  let calcRearSpring = (rSpringMax - rSpringMin) * rearRatio + rSpringMin;

  // グリップ時は適正レート、ドリフト時はリアトラクション・滑り出し制御のため調整
  if (mode === 'drift') {
    calcFrontSpring = Math.round(calcFrontSpring * 0.98 * 10) / 10;
    calcRearSpring = Math.round(calcRearSpring * 0.95 * 10) / 10;
  } else {
    calcFrontSpring = Math.round(calcFrontSpring * 10) / 10;
    calcRearSpring = Math.round(calcRearSpring * 10) / 10;
  }

  // スタビライザー計算 (1.00 - 65.00)
  const arbMin = TUNING_BOUNDS.arb.min;
  const arbMax = TUNING_BOUNDS.arb.max;
  const arbBaseFront = (arbMax - arbMin) * frontRatio + arbMin;
  const arbBaseRear = (arbMax - arbMin) * rearRatio + arbMin;

  // ダンパー計算 (Rebound 1.0-20.0, Bump = Rebound * 0.60-0.65)
  const reboundFront = Math.round(((20.0 - 1.0) * frontRatio + 1.0) * 10) / 10;
  const reboundRear = Math.round(((20.0 - 1.0) * rearRatio + 1.0) * 10) / 10;
  const bumpFront = Math.round(reboundFront * 0.63 * 10) / 10;
  const bumpRear = Math.round(reboundRear * 0.63 * 10) / 10;

  // 車高 (cm)
  const rideHeightFront = mode === 'drift' ? car.rideHeightLimit.front.min : car.rideHeightLimit.front.default;
  const rideHeightRear = mode === 'drift' ? car.rideHeightLimit.rear.min : car.rideHeightLimit.rear.default;

  // デフ (Differential)
  const differential =
    mode === 'drift'
      ? { rearAccel: 85, rearDecel: 3 }
      : { rearAccel: car.drivetrain === 'AWD' ? 50 : 25, rearDecel: 30 };

  // アライメント
  const alignment =
    mode === 'drift'
      ? {
          camberFront: -5.0,
          camberRear: -1.5,
          toeFront: 0.0,
          toeRear: 0.0,
          casterFront: 7.0,
        }
      : {
          camberFront: -2.0,
          camberRear: -1.5,
          toeFront: 0.0,
          toeRear: 0.0,
          casterFront: 5.0,
        };

  return {
    mode,
    name: mode === 'drift' ? '理論計算ドリフトセッティング' : '理論計算グリップセッティング',
    description: `車両重量 ${weight}kg, 前後配分 ${(frontRatio * 100).toFixed(0)}:${(rearRatio * 100).toFixed(0)} に基づく最適値`,
    tirePressure: { front: 2.3, rear: 2.2 },
    gearing: car.presets[mode].gearing,
    alignment,
    arb: {
      front: Math.round(arbBaseFront * 10) / 10,
      rear: Math.round(arbBaseRear * 10) / 10,
    },
    springs: {
      springFront: calcFrontSpring,
      springRear: calcRearSpring,
      rideHeightFront,
      rideHeightRear,
    },
    damping: {
      reboundFront,
      reboundRear,
      bumpFront,
      bumpRear,
    },
    aero: car.presets[mode].aero,
    brakes: {
      balanceFront: 50,
      pressure: 100,
    },
    differential,
  };
}

/**
 * シェイクダウン時のトラブルシューティング・調整アドバイス
 */
export const SHAKEDOWN_GUIDE: TuningAdjustmentAdvice[] = [
  {
    category: 'コーナー進入（ターンイン）',
    issue: '進入時にフロントが曲がらない（アンダーステア）',
    solution: 'フロントスタビライザーを柔らかくするか、フロント減衰（バンプ）を下げる。またはフロント車高を下げる。',
    paramKey: 'arb.front / damping.bumpFront',
    recommendedDelta: 'スタビ -2.0 〜 -5.0 / フロント車高 -0.2cm',
  },
  {
    category: 'コーナー脱出（立ち上がり）',
    issue: 'アクセルONでリアがスライドしすぎる（オーバーステア）',
    solution: 'リア加速デフの数値を下げる（例: 40% → 25%）か、リアスプリングを少し柔らかくする。',
    paramKey: 'differential.rearAccel / springs.springRear',
    recommendedDelta: 'リア加速デフ -5% 〜 -15%',
  },
  {
    category: '縁石・ギャップ通過時',
    issue: '縁石に乗ると車体が跳ねてトラクションが抜ける',
    solution: '前後バンプダンパーを柔らかく（数値を下げる）し、リバウンドとの比率を約55〜60%に抑える。',
    paramKey: 'damping.bumpFront / damping.bumpRear',
    recommendedDelta: 'バンプダンパー -0.5 〜 -1.5',
  },
  {
    category: 'ドリフト制御',
    issue: 'ドリフト中に急激に巻き込んでスピンしてしまう',
    solution: 'リア減速デフをさらに下げる（0〜5%に接近）、またはリアキャンバーを少し起こす（-1.0°程度へ）。',
    paramKey: 'differential.rearDecel / alignment.camberRear',
    recommendedDelta: 'リア減速デフ -5% / リアキャンバー +0.3°',
  },
  {
    category: 'ドリフト維持',
    issue: 'ドリフトのアングルがすぐに戻ってしまう（飛距離が足りない）',
    solution: 'リアタイヤ空気圧を少し上げる（2.4〜2.6bar）か、リアスタビライザーを少し硬くしてリアを滑らせやすくする。',
    paramKey: 'tirePressure.rear / arb.rear',
    recommendedDelta: 'リア空気圧 +0.2bar / リアスタビ +3.0',
  },
];
