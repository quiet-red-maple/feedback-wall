import { create } from 'zustand';

export type Vec3 = [number, number, number];

export interface AppState {
  focalLength: number;
  aperture: number;
  subjectPosition: Vec3;
  cameraPosition: Vec3;
  mainLightPosition: Vec3;
  fillLightPosition: Vec3;
  lightIntensity: number;
  fillLightIntensity: number;
  isDragging: boolean;
  enableDepthOfField: boolean;
  activeTooltip: string | null;

  updateState: (updates: Partial<AppState>) => void;
  setDragging: (isDragging: boolean) => void;
  setActiveTooltip: (tooltip: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  focalLength: 50,
  aperture: 2.8,
  subjectPosition: [0, 0, 0],
  cameraPosition: [0, 1.2, 5],
  mainLightPosition: [3, 3, 2],
  fillLightPosition: [-3, 2, 2],
  lightIntensity: 5,
  fillLightIntensity: 2,
  isDragging: false,
  enableDepthOfField: false,
  activeTooltip: null,
  
  updateState: (updates) => set((state) => ({ ...state, ...updates })),
  setDragging: (isDragging) => set({ isDragging }),
  setActiveTooltip: (tooltip) => set({ activeTooltip: tooltip }),
}));
