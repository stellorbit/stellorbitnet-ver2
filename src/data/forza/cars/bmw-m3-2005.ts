import type { CarData } from '../../../lib/forza/types';

export const bmwM32005: CarData = {
  id: 'bmw-m3-2005',
  name: 'M3 (2005)',
  fullName: 'BMW M3 (E46) 2005',
  manufacturer: 'BMW',
  origin: 'import',
  year: 2005,
  status: 'in_progress',

  stockPI: { class: 'A', pi: 620 },
  drivetrain: 'RWD',
  powerKw: 252, // ~343 PS (S54B32 NA直6)
  torqueNm: 365,
  displacementCc: 3246,
  weightKg: 1570,
  frontWeightRatio: 50, // ~50% Front / 50% Rear 理想の前後配分

  springsLimit: {
    front: { min: 50.0, max: 280.0, default: 130.0, step: 0.1 },
    rear: { min: 50.0, max: 280.0, default: 130.0, step: 0.1 },
  },
  rideHeightLimit: {
    front: { min: 12.5, max: 17.5, default: 14.5, step: 0.1 },
    rear: { min: 12.5, max: 17.5, default: 14.5, step: 0.1 },
  },
  aeroLimit: {
    front: { min: 60, max: 120, default: 90, hasAdjustable: true },
    rear: { min: 80, max: 160, default: 120, hasAdjustable: true },
  },

  presets: {
    grip: {
      mode: 'grip',
      name: 'グリップ (Grip Baseline)',
      description: '前後50:50の理想的な重量配分を活かし、高回転NA直6エンジンのレスポンスを引き出すニュートラルステア。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 3.62,
        gears: [4.23, 2.53, 1.67, 1.23, 1.0, 0.83],
        topSpeedKmH: 285.0,
      },
      alignment: {
        camberFront: -2.2,
        camberRear: -1.6,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 6.0,
      },
      arb: {
        front: 32.5,
        rear: 31.5,
      },
      springs: {
        springFront: 140.0,
        springRear: 138.0,
        rideHeightFront: 14.0,
        rideHeightRear: 14.0,
      },
      damping: {
        reboundFront: 12.0,
        reboundRear: 11.8,
        bumpFront: 7.5,
        bumpRear: 7.3,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 40,
        rearDecel: 20,
      },
    },
    drift: {
      mode: 'drift',
      name: 'ドリフト (Drift Baseline)',
      description: 'E46特有の高回転コントロール性を活かし、切れ角と高ロックデフでクイックな振り返しを可能にする。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 3.20,
        gears: [3.05, 2.10, 1.45, 1.0],
        topSpeedKmH: 270.0,
      },
      alignment: {
        camberFront: -5.0,
        camberRear: -1.3,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 7.0,
      },
      arb: {
        front: 34.0,
        rear: 28.0,
      },
      springs: {
        springFront: 142.0,
        springRear: 130.0,
        rideHeightFront: 13.0,
        rideHeightRear: 13.0,
      },
      damping: {
        reboundFront: 12.0,
        reboundRear: 11.5,
        bumpFront: 7.5,
        bumpRear: 7.2,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 86,
        rearDecel: 4,
      },
    },
  },

  notes: '実機データ調査進行中（初期プレースホルダー値を設定中。実機調査完了時に上書き予定）',
};
