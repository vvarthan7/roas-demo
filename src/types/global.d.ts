// Global type augmentations for third-party scripts injected at runtime.

interface Window {
  fbq?: (
    event: string,
    action: string,
    params?: Record<string, unknown>
  ) => void;
}
