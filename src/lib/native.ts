import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';

// Check if running as native app
export const isNative = Capacitor.isNativePlatform();

/**
 * Copy text to clipboard with haptic feedback (native) or fallback (web)
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (isNative) {
      await Clipboard.write({ string: text });
      await Haptics.impact({ style: ImpactStyle.Light });
    } else {
      await navigator.clipboard.writeText(text);
    }
    return true;
  } catch (error) {
    console.error('Copy failed:', error);
    return false;
  }
}

/**
 * Share content using native share sheet or Web Share API
 */
export async function shareContent(data: { 
  title: string; 
  text?: string; 
  url?: string;
  dialogTitle?: string;
}): Promise<boolean> {
  try {
    if (isNative) {
      await Share.share({
        title: data.title,
        text: data.text,
        url: data.url,
        dialogTitle: data.dialogTitle || 'Share via',
      });
      return true;
    } else if (navigator.share) {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return true;
    }
    return false;
  } catch (error) {
    // User cancelled share - not an error
    if ((error as Error)?.name === 'AbortError') {
      return false;
    }
    console.error('Share failed:', error);
    return false;
  }
}

/**
 * Initialize native status bar styling
 */
export async function initStatusBar(): Promise<void> {
  if (!isNative) return;
  
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0f0f23' });
  } catch (error) {
    console.error('StatusBar init failed:', error);
  }
}

/**
 * Trigger haptic feedback
 */
export async function hapticFeedback(style: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> {
  if (!isNative) return;
  
  const styleMap = {
    light: ImpactStyle.Light,
    medium: ImpactStyle.Medium,
    heavy: ImpactStyle.Heavy,
  };
  
  try {
    await Haptics.impact({ style: styleMap[style] });
  } catch (error) {
    console.error('Haptic feedback failed:', error);
  }
}

/**
 * Check if share is available (native or Web Share API)
 */
export function canShare(): boolean {
  return isNative || !!navigator.share;
}
