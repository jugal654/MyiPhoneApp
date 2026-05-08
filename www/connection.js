// connection.js - Secure Socket Connection Manager
(function() {
  // Wait for config to be ready
  function _waitForConfig() {
      if (!window.__SECURE_GOLD) {
          setTimeout(_waitForConfig, 50);
          return;
      }
      _initialize();
  }
  
  // Socket instance
  let _socketInstance = null;
  let _isConnecting = false;
  let _reconnectAttempts = 0;
  let _maxReconnectAttempts = 5;
  
  // Event callbacks storage
  let _eventCallbacks = {
      connect: [],
      data: [],
      disconnect: [],
      error: []
  };
  
  // Function to trigger events
  function _triggerEvent(eventName, data) {
      if (_eventCallbacks[eventName]) {
          _eventCallbacks[eventName].forEach(function(callback) {
              try {
                  callback(data);
              } catch(e) {
                  console.warn('Event callback error');
              }
          });
      }
  }
  
  // Function to establish connection
  function _establishConnection() {
      if (_socketInstance || _isConnecting) {
          return _socketInstance;
      }
      
      _isConnecting = true;
      
      try {
          // Check if URL exists
          if (!window.__SECURE_GOLD.url) {
              _triggerEvent('error', { message: 'Configuration error' });
              _isConnecting = false;
              return null;
          }
          
          // Create socket connection
          _socketInstance = io(window.__SECURE_GOLD.url, { 
              transports: window.__SECURE_GOLD.transports,
              reconnection: true,
              reconnectionAttempts: _maxReconnectAttempts,
              reconnectionDelay: 1000
          });
          
          // Handle connection success
          _socketInstance.on('connect', function() {
              _isConnecting = false;
              _reconnectAttempts = 0;
              
              // Send client identification
              if (window.__SECURE_GOLD.client) {
                  _socketInstance.emit('client', window.__SECURE_GOLD.client);
              }
              
              _triggerEvent('connect');
          });
          
          // Handle market data
          _socketInstance.on('mainProduct', function(data) {
              _triggerEvent('data', data);
          });
          
          // Handle disconnection
          _socketInstance.on('disconnect', function(reason) {
              _triggerEvent('disconnect', { reason: reason });
          });
          
          // Handle connection errors
          _socketInstance.on('connect_error', function(error) {
              _isConnecting = false;
              _triggerEvent('error', { message: error.message });
          });
          
          // Handle reconnection attempts
          _socketInstance.on('reconnecting', function(attemptNumber) {
              _reconnectAttempts = attemptNumber;
          });
          
      } catch(e) {
          _isConnecting = false;
          _triggerEvent('error', { message: 'Connection failed' });
      }
      
      return _socketInstance;
  }
  
  // Function to close connection
  function _closeConnection() {
      if (_socketInstance) {
          _socketInstance.disconnect();
          _socketInstance = null;
      }
      _isConnecting = false;
  }
  
  // Function to check connection status
  function _getConnectionStatus() {
      if (!_socketInstance) return 'not_initialized';
      return _socketInstance.connected ? 'connected' : 'disconnected';
  }
  
  // Initialize the connection manager
  function _initialize() {
      // Public API exposed globally
      window.__SG = {
          // Connect to server
          connect: _establishConnection,
          
          // Disconnect from server
          disconnect: _closeConnection,
          
          // Register event listeners
          on: function(eventName, callback) {
              if (_eventCallbacks[eventName]) {
                  _eventCallbacks[eventName].push(callback);
              }
              return this;
          },
          
          // Remove event listener
          off: function(eventName, callback) {
              if (_eventCallbacks[eventName]) {
                  const index = _eventCallbacks[eventName].indexOf(callback);
                  if (index > -1) {
                      _eventCallbacks[eventName].splice(index, 1);
                  }
              }
              return this;
          },
          
          // Get connection status
          status: _getConnectionStatus,
          
          // Check if connected
          isConnected: function() {
              return _getConnectionStatus() === 'connected';
          }
      };
  }
  
  // Start the initialization
  _waitForConfig();
})();