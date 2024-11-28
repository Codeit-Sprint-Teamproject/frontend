import { create } from 'zustand';

type Store = {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<Store>()((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
