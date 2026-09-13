import { ALL_TARGET_CARS } from '../../data/forza/cars';
import type { CarCatalogEntry } from '../../data/forza/cars';

export interface VersionStatus {
  versionString: string;
  phase: 'Alpha' | 'Beta' | 'Release';
  implementedCount: number;
  totalCount: number;
  progressPercent: number;
  domesticCompleted: {
    toyota: number;
    nissan: number;
  };
  importCompleted: {
    bmw: number;
    mercedes: number; // Mercedes + Mercedes-AMG combined
  };
  nextMilestone: string;
}

export function calculateVersionStatus(customCars?: CarCatalogEntry[]): VersionStatus {
  const cars = customCars || ALL_TARGET_CARS;
  const implementedList = cars.filter((c) => c.data !== undefined || c.status === 'implemented');
  const implementedCount = implementedList.length;
  const totalCount = cars.length;
  const progressPercent = Math.round((implementedCount / totalCount) * 100);

  // Manufacturer breakdown
  const toyota = implementedList.filter((c) => c.manufacturer === 'Toyota').length;
  const nissan = implementedList.filter((c) => c.manufacturer === 'Nissan').length;
  const bmw = implementedList.filter((c) => c.manufacturer === 'BMW').length;
  const mercedes = implementedList.filter(
    (c) => c.manufacturer === 'Mercedes' || c.manufacturer === 'Mercedes-AMG'
  ).length;

  const isBetaReady =
    toyota >= 2 && nissan >= 2 && (bmw >= 2 || mercedes >= 2);

  const isAllCompleted = implementedCount >= totalCount;

  let phase: 'Alpha' | 'Beta' | 'Release' = 'Alpha';
  let versionString = 'Alpha Ver 0.1';
  let nextMilestone = 'Alpha Ver 0.2: 同一メーカーの追加車種実装';

  if (isAllCompleted) {
    phase = 'Release';
    const now = new Date();
    versionString = `Ver ${now.getFullYear()}.${now.getMonth() + 1}`;
    nextMilestone = '正式リリース完了（メンテナンス・微調整フェーズ）';
  } else if (isBetaReady) {
    phase = 'Beta';
    // Beta Ver 0.1 onwards
    const extraCars = implementedCount - 6; // 2+2+2 = 6 cars base for Beta
    const betaMinor = Math.max(1, 1 + extraCars);
    versionString = `Beta Ver 0.${betaMinor}`;
    nextMilestone = '全12車種の実装完了とVer 1.0 (西暦.月) 正式リリース';
  } else {
    phase = 'Alpha';
    // Initial 3 cars is 0.1. Additional cars increment by 0.1
    const extraCars = Math.max(0, implementedCount - 3);
    const minor = 1 + extraCars;
    versionString = `Alpha Ver 0.${minor}`;
    nextMilestone =
      'Beta移行条件: 国産2社(トヨタ2台/日産2台)＋輸入車1社(BMWまたはメルセデス2台)の実装完了';
  }

  return {
    versionString,
    phase,
    implementedCount,
    totalCount,
    progressPercent,
    domesticCompleted: {
      toyota,
      nissan,
    },
    importCompleted: {
      bmw,
      mercedes,
    },
    nextMilestone,
  };
}
