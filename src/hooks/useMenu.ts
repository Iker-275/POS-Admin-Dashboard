import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

// Hook
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};



// import { useContext, useCallback } from "react";
// import { MenuContext } from "../context/MenuContext";
// import { MenuQueryParams, MenuItem } from "../types/menu";

// export const useMenu = () => {
//   const context = useContext(MenuContext);

//   if (!context) {
//     throw new Error("useMenu must be used within a MenuProvider");
//   }

//   const {
//     menu,
//     loading,
//     message,
//     fetchMenu,
//     addMenu,
//     updateMenu,
//     deleteMenu,
//     clearMessage
//   } = context;

//   // 🔄 Wrapped methods (clean + stable)
//   const loadMenu = useCallback(
//     async (params?: MenuQueryParams) => {
//       await fetchMenu(params);
//     },
//     [fetchMenu]
//   );

//   const createMenuItem = useCallback(
//     async (data: {
//       menuItem: string;
//       pricePerQty: number;
//       currency: string;
//       availableToday: boolean;
//     }) => {
//       await addMenu(data);
//     },
//     [addMenu]
//   );

//   const editMenuItem = useCallback(
//     async (
//       id: string,
//       data: {
//         menuItem: string;
//         pricePerQty: number;
//         currency: string;
//         availableToday: boolean;
//       }
//     ) => {
//       await updateMenu(id, data);
//     },
//     [updateMenu]
//   );

//   const removeMenuItem = useCallback(
//     async (id: string) => {
//       await deleteMenu(id);
//     },
//     [deleteMenu]
//   );

//   // 🔍 Helpers (optional but powerful)
//   const getMenuById = useCallback(
//     (id: string): MenuItem | undefined => {
//       return menu.find(item => item._id === id);
//     },
//     [menu]
//   );

//   return {
//     // state
//     menu,
//     loading,
//     message,

//     // actions
//     loadMenu,
//     createMenuItem,
//     editMenuItem,
//     removeMenuItem,
//     clearMessage,

//     // helpers
//     getMenuById
//   };
// };