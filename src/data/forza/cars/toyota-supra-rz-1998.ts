import type { CarData } from '../../../lib/forza/types';

export const toyotaSupraRZ1998: CarData = {
  id: 'toyota-supra-rz-1998',
  name: 'スープラ RZ (1998)',
  fullName: 'Toyota Supra RZ 1998',
  manufacturer: 'Toyota',
  origin: 'domestic',
  year: 1998,
  status: 'implemented',

  stockPI: { class: 'B', pi: 529 },
  drivetrain: 'RWD',
  powerKw: 239, // ~325 PS
  torqueNm: 427,
  displacementCc: 2997,
  weightKg: 1510,
  frontWeightRatio: 53, // 53% Front / 47% Rear

  // スプリング・車高限界値 (レース・ドリフト共通)
  springsLimit: {
    front: { min: 59.9, max: 299.6, default: 145.6, step: 0.1 },
    rear: { min: 59.9, max: 299.6, default: 143.0, step: 0.1 },
  },
  rideHeightLimit: {
    front: {
      min: 14.8,
      max: 18.2,
      default: 15.5,
      availableValuesAscending: [
        14.8, 15.1, 15.3, 15.6, 15.8, 16.1, 16.3, 16.6, 16.8, 17.1, 17.3, 17.6, 17.8, 18.1, 18.2,
      ],
      availableValuesDescending: [
        18.2, 18.0, 17.7, 17.5, 17.2, 16.9, 16.7, 16.4, 16.2, 15.9, 15.7, 15.4, 15.2, 14.9, 14.8,
      ],
    },
    rear: {
      min: 14.8,
      max: 18.2,
      default: 15.5,
      availableValuesAscending: [
        14.8, 15.1, 15.3, 15.6, 15.8, 16.1, 16.3, 16.6, 16.8, 17.1, 17.3, 17.6, 17.8, 18.1, 18.2,
      ],
      availableValuesDescending: [
        18.2, 18.0, 17.7, 17.5, 17.2, 16.9, 16.7, 16.4, 16.2, 15.9, 15.7, 15.4, 15.2, 14.9, 14.8,
      ],
    },
  },

  // 調整式エアロ
  aeroLimit: {
    front: {
      min: 73,
      max: 122,
      default: 97,
      hasAdjustable: true,
      notes: 'Forza Horizon 6 フロントバンパー装着時',
    },
    rear: {
      min: 97,
      max: 161,
      default: 129,
      hasAdjustable: true,
      notes: 'JUN / APR / FH / BCL / KRC 等 調整式リアウィング装着時',
    },
  },

  // レース仕様アップグレード後スペック
  raceSpecs: {
    weightKg: 1478,
    pi: { class: 'B', pi: 549 },
  },

  // ドリフト仕様アップグレード後スペック
  driftSpecs: {
    weightKg: 1474,
    pi: { class: 'B', pi: 550 },
  },

  // 実機測定プリセットデータ
  presets: {
    // 🏁 グリップ・レース用セッティング
    grip: {
      mode: 'grip',
      name: 'グリップ & サーキット (Race Baseline)',
      description:
        '高いスタビリティと俊敏な回頭性を両立。フロント重量配分53%に合わせた最適な前後ロール・ピッチ剛性バランス。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 3.34,
        gears: [4.14, 2.67, 1.82, 1.33, 1.0, 0.8],
        topSpeedKmH: 279.6,
      },
      alignment: {
        camberFront: -2.0,
        camberRear: -1.5,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 5.0,
      },
      arb: {
        front: 39.2,
        rear: 28.8,
      },
      springs: {
        springFront: 145.6,
        springRear: 143.0,
        rideHeightFront: 15.5,
        rideHeightRear: 15.5,
      },
      damping: {
        reboundFront: 12.1,
        reboundRear: 11.3,
        bumpFront: 7.6,
        bumpRear: 7.1,
      },
      aero: {
        front: 98,
        rear: 129,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 23,
        rearDecel: 33,
      },
    },

    // 💨 ドリフト用セッティング
    drift: {
      mode: 'drift',
      name: 'ドリフト (Drift Baseline)',
      description:
        'フロントキャンバー-5.0°&キャスター7.0°で深いアングルを維持。加速デフ85%・減速デフ3%で滑らかなアングル進入と強力なパワースライドを実現。',
      tirePressure: { front: 2.3, rear: 2.2 },
      gearing: {
        finalDrive: 2.94,
        gears: [2.89, 1.99, 1.35, 1.0],
        topSpeedKmH: 277.4,
      },
      alignment: {
        camberFront: -5.0,
        camberRear: -1.5,
        toeFront: 0.0,
        toeRear: 0.0,
        casterFront: 7.0,
      },
      arb: {
        front: 39.2,
        rear: 28.8,
      },
      springs: {
        springFront: 145.2,
        springRear: 142.6,
        rideHeightFront: 14.8,
        rideHeightRear: 14.8,
      },
      damping: {
        reboundFront: 12.1,
        reboundRear: 11.3,
        bumpFront: 7.6,
        bumpRear: 7.1,
      },
      brakes: {
        balanceFront: 50,
        pressure: 100,
      },
      differential: {
        rearAccel: 85,
        rearDecel: 3,
      },
    },
  },

  notes:
    'FRレイアウトの名車。フロント53%の重量配分により、適度なスタビライザー前後差（F39.2/R28.8）を持たせることでターンインのアンダーステアを消去しつつ、立ち上がりのトラクションを稼ぐことができます。',
};
