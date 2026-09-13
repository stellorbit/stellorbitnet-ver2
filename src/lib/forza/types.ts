export type Manufacturer = 'Toyota' | 'Nissan' | 'Mercedes' | 'Mercedes-AMG' | 'BMW';

export type Drivetrain = 'RWD' | 'FWD' | 'AWD';

export type TuningMode = 'grip' | 'drift';

export type ImplementationStatus = 'implemented' | 'in_progress' | 'planned';

export interface SpringRateRange {
  min: number; // kgf/mm
  max: number; // kgf/mm
  default: number; // kgf/mm
  step?: number;
}

export interface RideHeightRange {
  min: number; // cm
  max: number; // cm
  default: number; // cm
  step?: number;
  availableValuesAscending?: number[]; // 上昇時ステップ
  availableValuesDescending?: number[]; // 下降時ステップ
}

export interface AeroRange {
  min: number; // kgf
  max: number; // kgf
  default?: number;
  hasAdjustable: boolean;
  notes?: string;
}

export interface GearingPreset {
  finalDrive: number;
  gears: number[]; // [1速, 2速, 3速, ...]
  topSpeedKmH?: number;
}

export interface AlignmentPreset {
  camberFront: number; // deg
  camberRear: number; // deg
  toeFront: number; // deg
  toeRear: number; // deg
  casterFront: number; // deg
}

export interface ARBPreset {
  front: number;
  rear: number;
}

export interface SpringsPreset {
  springFront: number; // kgf/mm
  springRear: number; // kgf/mm
  rideHeightFront: number; // cm
  rideHeightRear: number; // cm
}

export interface DampingPreset {
  reboundFront: number;
  reboundRear: number;
  bumpFront: number;
  bumpRear: number;
}

export interface BrakesPreset {
  balanceFront: number; // % (0-100, 50 is even)
  pressure: number; // % (0-200, 100 is standard)
}

export interface DifferentialPreset {
  rearAccel: number; // % (0-100)
  rearDecel: number; // % (0-100)
  frontAccel?: number; // % (0-100, AWD)
  frontDecel?: number; // % (0-100, AWD)
  centerBalance?: number; // % (0-100, Front to Rear, AWD)
}

export interface TuningPreset {
  mode: TuningMode;
  name: string;
  description: string;
  tirePressure: { front: number; rear: number }; // bar
  gearing: GearingPreset;
  alignment: AlignmentPreset;
  arb: ARBPreset;
  springs: SpringsPreset;
  damping: DampingPreset;
  aero?: { front?: number; rear?: number };
  brakes: BrakesPreset;
  differential: DifferentialPreset;
}

export interface CarData {
  id: string;
  name: string;
  fullName: string;
  manufacturer: Manufacturer;
  origin: 'domestic' | 'import';
  year: number;
  status: ImplementationStatus;
  
  // Specs
  stockPI: { class: string; pi: number };
  drivetrain: Drivetrain;
  powerKw: number;
  torqueNm: number;
  displacementCc: number;
  weightKg: number;
  frontWeightRatio: number; // % (e.g. 53 for 53%)
  
  // Customization & Tunable Limits
  springsLimit: {
    front: SpringRateRange;
    rear: SpringRateRange;
  };
  rideHeightLimit: {
    front: RideHeightRange;
    rear: RideHeightRange;
  };
  aeroLimit: {
    front: AeroRange;
    rear: AeroRange;
  };

  // Measured Presets
  presets: {
    grip: TuningPreset;
    drift: TuningPreset;
  };

  // Upgraded specs with race / drift parts
  raceSpecs?: {
    weightKg: number;
    pi: { class: string; pi: number };
  };
  driftSpecs?: {
    weightKg: number;
    pi: { class: string; pi: number };
  };

  notes?: string;
}
