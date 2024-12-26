import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserProps {
  id: number;
  name: string;
  profile: string | null;
  email: string;
  roles: string;
}

interface UserState {
  user: UserProps | null;
  setUser: (userData: UserProps) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => {
        set({ user: userData });
      },
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
