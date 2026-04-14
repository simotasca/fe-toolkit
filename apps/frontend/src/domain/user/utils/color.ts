/**
 * Calculates a deterministic color for a user based on their UUID.
 * @param uuid - The user id
 * @returns The hex color code
 */
export function userColor(uuid: string | number) {
  const hash = typeof uuid === "string" ? stringToIntegerHash(uuid) : uuid;
  const colorIndex = hash % COLOR_PALETTE.length;
  return COLOR_PALETTE[colorIndex];
}

// --- Hashing Function (ai generated) ---
function stringToIntegerHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

const COLOR_PALETTE = [
  // --- RED ---
  { bg: 'bg-red-300', fg: 'text-red-900' }, 
  { bg: 'bg-red-500', fg: 'text-white' }, 
  { bg: 'bg-red-700', fg: 'text-white' }, 

  // --- ORANGE ---
  { bg: 'bg-orange-300', fg: 'text-orange-900' }, 
  { bg: 'bg-orange-500', fg: 'text-white' }, 
  { bg: 'bg-orange-700', fg: 'text-white' }, 
  
  // --- AMBER ---
  { bg: 'bg-amber-300', fg: 'text-amber-900' }, 
  { bg: 'bg-amber-500', fg: 'text-white' }, 
  { bg: 'bg-amber-700', fg: 'text-white' }, 
  
  // --- YELLOW ---
  { bg: 'bg-yellow-300', fg: 'text-yellow-900' }, 
  { bg: 'bg-yellow-500', fg: 'text-white' }, 
  { bg: 'bg-yellow-700', fg: 'text-white' }, 
  
  // --- LIME ---
  { bg: 'bg-lime-300', fg: 'text-lime-900' }, 
  { bg: 'bg-lime-500', fg: 'text-white' }, 
  { bg: 'bg-lime-700', fg: 'text-white' }, 
  
  // --- GREEN ---
  { bg: 'bg-green-300', fg: 'text-green-900' }, 
  { bg: 'bg-green-500', fg: 'text-white' }, 
  { bg: 'bg-green-700', fg: 'text-white' }, 
  
  // --- EMERALD ---
  { bg: 'bg-emerald-300', fg: 'text-emerald-900' }, 
  { bg: 'bg-emerald-500', fg: 'text-white' }, 
  { bg: 'bg-emerald-700', fg: 'text-white' }, 
  
  // --- TEAL ---
  { bg: 'bg-teal-300', fg: 'text-teal-900' }, 
  { bg: 'bg-teal-500', fg: 'text-white' }, 
  { bg: 'bg-teal-700', fg: 'text-white' }, 
  
  // --- CYAN ---
  { bg: 'bg-cyan-300', fg: 'text-cyan-900' }, 
  { bg: 'bg-cyan-500', fg: 'text-white' }, 
  { bg: 'bg-cyan-700', fg: 'text-white' }, 
  
  // --- SKY ---
  { bg: 'bg-sky-300', fg: 'text-sky-900' }, 
  { bg: 'bg-sky-500', fg: 'text-white' }, 
  { bg: 'bg-sky-700', fg: 'text-white' }, 
  
  // --- BLUE ---
  { bg: 'bg-blue-300', fg: 'text-blue-900' }, 
  { bg: 'bg-blue-500', fg: 'text-white' }, 
  { bg: 'bg-blue-700', fg: 'text-white' }, 
  
  // --- INDIGO ---
  { bg: 'bg-indigo-300', fg: 'text-indigo-900' }, 
  { bg: 'bg-indigo-500', fg: 'text-white' }, 
  { bg: 'bg-indigo-700', fg: 'text-white' }, 
  
  // --- VIOLET ---
  { bg: 'bg-violet-300', fg: 'text-violet-900' }, 
  { bg: 'bg-violet-500', fg: 'text-white' }, 
  { bg: 'bg-violet-700', fg: 'text-white' }, 
  
  // --- PURPLE ---
  { bg: 'bg-purple-300', fg: 'text-purple-900' }, 
  { bg: 'bg-purple-500', fg: 'text-white' }, 
  { bg: 'bg-purple-700', fg: 'text-white' }, 
  
  // --- FUCHSIA ---
  { bg: 'bg-fuchsia-300', fg: 'text-fuchsia-900' }, 
  { bg: 'bg-fuchsia-500', fg: 'text-white' }, 
  { bg: 'bg-fuchsia-700', fg: 'text-white' }, 
  
  // --- PINK ---
  { bg: 'bg-pink-300', fg: 'text-pink-900' }, 
  { bg: 'bg-pink-500', fg: 'text-white' }, 
  { bg: 'bg-pink-700', fg: 'text-white' }, 
  
  // --- ROSE ---
  { bg: 'bg-rose-300', fg: 'text-rose-900' }, 
  { bg: 'bg-rose-500', fg: 'text-white' }, 
  { bg: 'bg-rose-700', fg: 'text-white' }, 
];