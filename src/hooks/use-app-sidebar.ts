import {create} from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  close: () => void;
  open: () => void;
};

export const useAppSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  close: () => set({isOpen: false}),
  open: () => set({isOpen: true}),
  toggle: (isOpen) => set({isOpen}),
}));
