import type { CarData, Manufacturer } from '../../../lib/forza/types';
import { toyotaSupraRZ1998 } from './toyota-supra-rz-1998';
import { nissanGloriaGT1995 } from './nissan-gloria-gt-1995';
import { bmwM32005 } from './bmw-m3-2005';

export interface CarCatalogEntry {
  id: string;
  name: string;
  fullName: string;
  manufacturer: Manufacturer;
  origin: 'domestic' | 'import';
  year: number;
  status: 'implemented' | 'in_progress' | 'planned';
  data?: CarData;
}

// 第一弾（Ver 1.0 正式リリース）対象 全12車種カタログ
export const ALL_TARGET_CARS: CarCatalogEntry[] = [
  // トヨタ (4車種)
  {
    id: 'toyota-supra-rz-1998',
    name: 'スープラ RZ (1998)',
    fullName: 'Toyota Supra RZ (1998)',
    manufacturer: 'Toyota',
    origin: 'domestic',
    year: 1998,
    status: 'implemented',
    data: toyotaSupraRZ1998,
  },
  {
    id: 'toyota-gr86-2022',
    name: 'GR86 (2022)',
    fullName: 'Toyota GR86 (2022)',
    manufacturer: 'Toyota',
    origin: 'domestic',
    year: 2022,
    status: 'planned',
  },
  {
    id: 'toyota-gr-supra-2020',
    name: 'GRスープラ (2020)',
    fullName: 'Toyota GR Supra (2020)',
    manufacturer: 'Toyota',
    origin: 'domestic',
    year: 2020,
    status: 'planned',
  },
  {
    id: 'toyota-ae86-trueno-1985',
    name: 'AE86 スプリンタートレノ (1985 非FE)',
    fullName: 'Toyota Sprinter Trueno GT-Apex (1985)',
    manufacturer: 'Toyota',
    origin: 'domestic',
    year: 1985,
    status: 'planned',
  },

  // 日産 (4車種)
  {
    id: 'nissan-gloria-gt-1995',
    name: 'グロリア グランツーリスモ (1995)',
    fullName: 'Nissan Gloria Gran Turismo SV (1995)',
    manufacturer: 'Nissan',
    origin: 'domestic',
    year: 1995,
    status: 'in_progress',
    data: nissanGloriaGT1995,
  },
  {
    id: 'nissan-silvia-spec-r-2002',
    name: 'シルビア Spec-R (2002)',
    fullName: 'Nissan Silvia Spec-R S15 (2002)',
    manufacturer: 'Nissan',
    origin: 'domestic',
    year: 2002,
    status: 'planned',
  },
  {
    id: 'nissan-skyline-gtr-1992',
    name: 'スカイライン GT-R (1992)',
    fullName: 'Nissan Skyline GT-R R32 (1992)',
    manufacturer: 'Nissan',
    origin: 'domestic',
    year: 1992,
    status: 'planned',
  },
  {
    id: 'nissan-skyline-gtr-2000',
    name: 'スカイライン GT-R (2000)',
    fullName: 'Nissan Skyline GT-R V-Spec II R34 (2000)',
    manufacturer: 'Nissan',
    origin: 'domestic',
    year: 2000,
    status: 'planned',
  },

  // メルセデス / メルセデスAMG (3車種 ※同一メーカー扱い)
  {
    id: 'mercedes-190e-1990',
    name: '190E 2.5-16 Evo II (1990 非FE)',
    fullName: 'Mercedes-Benz 190E 2.5-16 Evolution II (1990)',
    manufacturer: 'Mercedes',
    origin: 'import',
    year: 1990,
    status: 'planned',
  },
  {
    id: 'mercedes-amg-sl63-2022',
    name: 'SL63 (2022)',
    fullName: 'Mercedes-AMG SL 63 (2022)',
    manufacturer: 'Mercedes-AMG',
    origin: 'import',
    year: 2022,
    status: 'planned',
  },
  {
    id: 'mercedes-amg-e63s-2018',
    name: 'E63 S (2018)',
    fullName: 'Mercedes-AMG E 63 S 4MATIC+ (2018)',
    manufacturer: 'Mercedes-AMG',
    origin: 'import',
    year: 2018,
    status: 'planned',
  },

  // BMW (2車種)
  {
    id: 'bmw-m3-2005',
    name: 'M3 (2005)',
    fullName: 'BMW M3 E46 (2005)',
    manufacturer: 'BMW',
    origin: 'import',
    year: 2005,
    status: 'in_progress',
    data: bmwM32005,
  },
  {
    id: 'bmw-m2-2023',
    name: 'M2 (2023)',
    fullName: 'BMW M2 G87 (2023)',
    manufacturer: 'BMW',
    origin: 'import',
    year: 2023,
    status: 'planned',
  },
];

export const IMPLEMENTED_CARS: CarData[] = ALL_TARGET_CARS.filter(
  (c): c is CarCatalogEntry & { data: CarData } => c.data !== undefined
).map((c) => c.data);

export function getCarById(id: string): CarData | undefined {
  const found = ALL_TARGET_CARS.find((c) => c.id === id);
  return found?.data;
}
