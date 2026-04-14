// import { twMerge, type ClassNameValue } from "tailwind-merge";

// /** this enforces bad habits */
// export type ClassNameProps<T = {}> = Omit<T, "className"> & {
//   className?: ClassNameValue;
// };

// /** per merge deterministici valutare twJoin */
// export const cn = twMerge;

// type ClassNameVal = string | null | undefined | false | ClassNameArray;
// type ClassNameArray = ClassNameValue[];

// export function cnJoin(...classLists: ClassNameVal[]): string {
//   return classLists.flat<any, any>(Infinity).filter((c): c is string => !!c).join(" ");
// }
