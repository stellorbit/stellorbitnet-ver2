import type { CarData } from '../../../lib/forza/types';

export const nissanGloriaGT1995: CarData = {
  id: 'nissan-gloria-gt-1995',
  name: 'グロリア グランツーリスモ (1995)',
  fullName: 'Nissan Gloria Gran Turismo SV (1995)',
  manufacturer: 'Nissan',
  origin: 'domestic',
  year: 1995,
  status: 'in_progress',

  stockPI: { class: 'C', pi: 450 },
  drivetrain: 'RWD',
  powerKw: 199, // ~270 PS (VQ30DET)
  torqueNm: 368,
  displacementCc: 2987,
  weightKg: 1590,
  frontWeightRatio: 54, // ~54% Front / 46% Rear

  springsLimit: {
    front: { min: 45.0, max: 250.0, default: 120.0, step: 0.1 },
    rear: { min: 45.0, max: 250.0, default: 110.0, step: 0.1 },
  },
  rideHeightLimit: {
    front: { min: 13.0, max: 19.0, default: 16.0, step: 0.1 },
    rear: { min: 13.0, max: 19.0, default: 16.0, step: 0.1 },
  },
  aeroLimit: {
    front: { min: 50, max: 110, default: 80, hasAdjustable: true },
    rear: { min: 70, max: 150, default: 110, hasAdjustable: true },
  },

  presets: {
    grip: {
      mode: 'grip',
      name: 'グリップ (Grip Baseline)',
      description: '大柄なセダンボディを安定させ、V6ターボのトルクを無駄なく路面に伝えるセッティング。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 3.54,
        gears: [3.85, 2.45, 1.70, 1.25, 1.0, 0.82],
        topSpeedKmH: 260.0,
      },
      alignment: {
        camberFront: -1.8,
        camberRear: -1.3,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 5.5,
      },
      arb: {
        front: 36.0,
        rear: 26.0,
      },
      springs: {
        springFront: 135.0,
        springRear: 125.0,
        rideHeightFront: 15.0,
        rideHeightRear: 15.2,
      },
      damping: {
        reboundFront: 11.5,
        reboundRear: 10.8,
        bumpFront: 7.2,
        bumpRear: 6.8,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 30,
        rearDecel: 25,
      },
    },
    drift: {
      mode: 'drift',
      name: 'ドリフト (Drift Baseline)',
      description: 'ロングホイールベースを活かした雄大で安定したドリフトアングルを維持するセッティング。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 3.10,
        gears: [2.95, 2.05, 1.40, 1.0],
        topSpeedKmH: 255.0,
      },
      alignment: {
        camberFront: -5.0,
        camberRear: -1.2,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 7.0,
      },
      arb: {
        front: 36.0,
        rear: 26.0,
      },
      springs: {
        springFront: 138.0,
        springRear: 120.0,
        rideHeightFront: 14.0,
        rideHeightRear: 14.2,
      },
      damping: {
        reboundFront: 11.5,
        reboundRear: 10.8,
        bumpFront: 7.2,
        bumpRear: 6.8,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 88,
        rearDecel: 5,
      },
    },
  },

  notes: '実機データ調査進行中（初期プレースホルダー値を設定中。実機調査完了時に上書き予定）',
};
