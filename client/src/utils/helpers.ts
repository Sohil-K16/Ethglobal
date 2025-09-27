// Utility functions for Web3 operations

/**
 * Convert Ether string to Wei (BigInt)
 */
export function parseEther(value: string): bigint {
  const parts = value.split('.');
  const wholePart = parts[0] || '0';
  const fractionalPart = (parts[1] || '').padEnd(18, '0').slice(0, 18);
  
  const wholeWei = BigInt(wholePart) * BigInt(10) ** BigInt(18);
  const fractionalWei = BigInt(fractionalPart);
  
  return wholeWei + fractionalWei;
}

/**
 * Convert Wei (BigInt or string) to Ether string
 */
export function formatEther(wei: bigint | string): string {
  const weiString = typeof wei === 'string' ? wei : wei.toString();
  const weiBigInt = BigInt(weiString);
  
  const wholePart = weiBigInt / (BigInt(10) ** BigInt(18));
  const fractionalPart = weiBigInt % (BigInt(10) ** BigInt(18));
  
  const fractionalString = fractionalPart.toString().padStart(18, '0');
  const trimmedFractional = fractionalString.replace(/0+$/, '') || '0';
  
  if (trimmedFractional === '0') {
    return wholePart.toString();
  }
  
  return `${wholePart.toString()}.${trimmedFractional}`;
}

/**
 * Calculate days remaining from timestamp
 */
export function daysLeft(deadline: string): number {
  const difference = new Date(parseInt(deadline)).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return Math.max(0, Math.floor(remainingDays));
}

/**
 * Calculate percentage of target reached
 */
export function calculateBarPercentage(goal: string, raised: string): number {
  const percentage = Math.round((parseFloat(raised) * 100) / parseFloat(goal));
  return Math.min(percentage, 100);
}

/**
 * Check if a campaign deadline has passed
 */
export function isDeadlinePassed(deadline: string): boolean {
  return new Date(parseInt(deadline)).getTime() < Date.now();
}