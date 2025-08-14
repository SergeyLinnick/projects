// Utility functions for testing cross-tab synchronization

export interface SyncTestResult {
  success: boolean;
  message: string;
  timestamp: Date;
  tabId: string;
}

// Test cross-tab communication
export const testCrossTabCommunication = (): Promise<SyncTestResult> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve({
        success: false,
        message: "Not in browser environment",
        timestamp: new Date(),
        tabId: "unknown",
      });
      return;
    }

    // Test BroadcastChannel
    if ("BroadcastChannel" in window) {
      const testChannel = new BroadcastChannel("sync-test");
      const testId = Math.random().toString(36).substr(2, 9);

      testChannel.onmessage = (event) => {
        if (event.data.type === "TEST_RESPONSE") {
          testChannel.close();
          resolve({
            success: true,
            message: "BroadcastChannel communication successful",
            timestamp: new Date(),
            tabId: testId,
          });
        }
      };

      // Send test message
      testChannel.postMessage({
        type: "TEST_MESSAGE",
        tabId: testId,
        timestamp: Date.now(),
      });

      // Timeout after 2 seconds
      setTimeout(() => {
        testChannel.close();
        resolve({
          success: false,
          message: "BroadcastChannel test timeout",
          timestamp: new Date(),
          tabId: testId,
        });
      }, 2000);
    } else {
      // Test storage event
      const testKey = "sync-test-" + Date.now();
      const testValue = JSON.stringify({
        type: "TEST",
        tabId: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      });

      try {
        localStorage.setItem(testKey, testValue);
        localStorage.removeItem(testKey);

        resolve({
          success: true,
          message: "Storage event test successful",
          timestamp: new Date(),
          tabId: "storage-test",
        });
      } catch (error) {
        resolve({
          success: false,
          message: `Storage test failed: ${error}`,
          timestamp: new Date(),
          tabId: "storage-test",
        });
      }
    }
  });
};

// Get browser compatibility info
export const getBrowserCompatibility = () => {
  if (typeof window === "undefined") {
    return {
      broadcastChannel: false,
      storageEvents: false,
      cookies: false,
      localStorage: false,
    };
  }

  return {
    broadcastChannel: "BroadcastChannel" in window,
    storageEvents: "addEventListener" in window,
    cookies: "cookie" in document,
    localStorage: "localStorage" in window,
  };
};

// Simulate cart changes for testing
export const simulateCartChanges = () => {
  if (typeof window === "undefined") return;

  const testItems = [
    {
      id: "test-1",
      name: "Тестовий товар 1",
      price: 100,
      image: "test1.jpg",
      quantity: 1,
    },
    {
      id: "test-2",
      name: "Тестовий товар 2",
      price: 200,
      image: "test2.jpg",
      quantity: 2,
    },
    {
      id: "test-3",
      name: "Тестовий товар 3",
      price: 300,
      image: "test3.jpg",
      quantity: 3,
    },
  ];

  // Simulate rapid cart changes
  testItems.forEach((item, index) => {
    setTimeout(() => {
      // This will trigger cross-tab sync
      const event = new CustomEvent("simulate-cart-change", { detail: item });
      window.dispatchEvent(event);
    }, index * 500); // 500ms intervals
  });
};
